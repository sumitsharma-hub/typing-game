import { IUser } from '../interfaces/user';
import { generateKey } from './token';

export interface ISignToken{
  accessToken?:string,
  refreshToken?:string
  customGet:Function;
}

export default async function signToken():Promise<ISignToken> {
  // Create access token with user ID as the payload
  const accessToken = generateKey();

  // Create refresh token with user ID as the payload
  const refreshToken = generateKey();

  const customGet = (obj: any, path: string) => {
    const defaultValue="";
    const keys = path.split(".");
    let value: any = obj;
  
    for (const key of keys) {
      if (!value || typeof value !== "object") {
        return defaultValue;
      }
      value = value[key];
    }
  
    return value !== undefined ? value : defaultValue;
  }

  // Return the tokens
  return {accessToken,refreshToken,customGet };
}
