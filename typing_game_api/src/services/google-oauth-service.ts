import axios from "axios";
import QueryString from "qs";

import { GoogleTokenResult, GoogleUserResult, ILogin } from "../interfaces/login";
import { User } from "../models";
import { ITokenDetail, IUser } from "../interfaces/user";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export default class GoogleLoginService {
  
  async getGoogleOAuthtokens(code: any): Promise<GoogleTokenResult> {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
      grant_type: "authorization_code",
    };
    try {
      const res = await axios.post<GoogleTokenResult>(url, QueryString.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res.data;
    } catch (error: any) {
      console.log(error.response.data.error);
      console.error(error, "failed to fetch Google Oauth Tokens");
      return error;
    }
  }

  async getGoogleUser({
    id_token,
    access_token,
  }: {
    id_token: string;
    access_token: string;
  }): Promise<GoogleUserResult> {
    try {
      const { data } = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      console.error(error);
      throw Error(error);
    }
  }

  async findAndUpdateUser(query: FilterQuery<IUser>, update: UpdateQuery<IUser>, options: QueryOptions) {
    console.log(query,update, options,'this is being called')
    return await User.findOneAndUpdate(query, update, options);
  }
}
