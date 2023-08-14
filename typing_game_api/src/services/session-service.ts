// import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session-model";
// import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { User } from "../models";
import { signToken } from "../utils";
// import { findUser } from "./user.service";

export default class SessionService {
  async createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
  }

  async findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
  }
  async updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update);
  }

//   async reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
//     const {customGet}=await signToken();


//     const { decoded } = verifyJwt(refreshToken);

//     if (!decoded || !customGet(decoded, "session")) return false;

//     const session = await SessionModel.findById(customGet(decoded, "session"));

//     if (!session || !session.valid) return false;

//     const user = await User.findOne({ _id: session.user });

//     if (!user) return false;

//     const accessToken = signJwt(
//       { ...user, session: session._id },
//       { expiresIn: process.env.accessToken } // 15 minutes
//     );

//     return accessToken;
//   }
}
