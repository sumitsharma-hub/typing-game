import { IRegister, type ILogin } from "../interfaces/login";
import { type ITokenDetail, type IUser, type IUserDetail } from "../interfaces/user";
import { User } from "../models";
import { generateKey } from "../utils/token";

export default class AccountService {
  async performLogin(payload: ILogin): Promise<ITokenDetail | null> {
    const user: IUser | null = await User.findOne({ email: payload.email, isActive: true });
    if (user == null) return null;
    const match: boolean = await user.validatePassword(payload.password);
    if (!match) return null;
    if (user.token == null) {
      user.token = { key: generateKey() };
      user.lastLogin = new Date();
      await user.save();
    }

    return { token: user.token.key };
  }

  async retrieveDetails(user: IUser): Promise<IUserDetail> {
    const detail = {
      id:user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePhoto:user.profilePhoto, 
      provider:user.provider,     
      dateJoined: user.dateJoined,
      isAdmin: user.isAdmin,
    };

    return detail;
  }
  // user.set("token",1 )
  // await user.updateOne({ $unset: { token: 1 } });
  // user.set("token", { key: 0 });
  
  async performLogout(user: IUser): Promise<Record<string, unknown>> {  
    // user.set("token", undefined, { strict: false });
    user.token=undefined;
    await user.save();
    return {};
  }

  async performRegisteration(payload: IRegister) {
    const user: IRegister | null = await User.findOne({ email: payload.email });
    if (user) return null;
    const newUser = new User(payload);
    console.log(newUser);
    if (newUser.token == null) {
      newUser.token = { key: generateKey() };
      newUser.lastLogin = new Date();
      await newUser.save();
    }
    await newUser.save();
    return newUser;
  }
}
