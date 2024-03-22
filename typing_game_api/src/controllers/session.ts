import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SessionService, GoogleLoginService } from "../services";
import { signToken } from "../utils";
import { ISignToken } from "../utils/sign-token";
// import { signJwt } from "../utils/jwt.utils";

const sessionService = new SessionService();
const googleLoginService = new GoogleLoginService();

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  domain: "localhost",
  path: "/",
  sameSite: "lax",
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};
const idTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
};

export default class SessionController {
  constructor() {}

  async createUserSessionHandler(req: Request, res: Response) {
    // Validate the user's password
    const user = await req.body.email;

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // create a session
    const session = await sessionService.createSession(user._id, req.get("user-agent") || "");

    // create an access token

    // const accessToken = signJwt(
    //   { ...user, session: session._id },
    //   { expiresIn: process.env.ACCESS_TOKEN } // 15 minutes
    // );

    // // create a refresh token
    // const refreshToken = signJwt(
    //   { ...user, session: session._id },
    //   { expiresIn: process.env.REFRESH_TOKEN} // 15 minutes
    // );

    // return access & refresh

    const { accessToken, refreshToken }: ISignToken = await signToken();

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.send({ accessToken, refreshToken });
  }

  async getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;

    const sessions = await sessionService.findSessions({ user: userId, valid: true });

    return res.send(sessions);
  }

  async deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await sessionService.updateSession({ _id: sessionId }, { valid: false });

    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  }

  async googleOauthHandler(request: Request, response: Response) {
    console.log('this is googleOauthHander,,=============>');
    try {
      const code = request.query.code as string;
      const { id_token, access_token } = await googleLoginService.getGoogleOAuthtokens(code);
      console.log(id_token, access_token);

      // Use the token to get the User
      const { name, verified_email, email, picture } = await googleLoginService.getGoogleUser({
        id_token,
        access_token,
      });

      if (!verified_email) {
        return response.status(403).send("Google account is not verfied");
      }

      // Update user if user already exists or create a new user
      const user = await googleLoginService.findAndUpdateUser(
        { email },
        {
          firstName: name,
          email: email,
          profilePhoto: picture,
          provider: "Google",
          token: { key: access_token },
        },
        { upsert: true, runValidators: true, new: true, lean: true }
      );

    console.log('this is googleOauthHander,,=============>');

      // Create access and refresh token

      response.cookie("access_token", access_token, accessTokenCookieOptions);
      response.cookie("id_token", id_token, idTokenCookieOptions);

      // localStorage.setItem('X-TYPING-GAME-TOKEN',access_token);

      // const { access_token: accessToken, refresh_token } = await signToken();
      return response.status(200).redirect(`http://localhost:3000`);
    } catch (err: any) {
      console.error("Failed to handle Google OAuth callback", err);
      return response.status(404).redirect(`http://localhost:3000`);
    }
  }
}
