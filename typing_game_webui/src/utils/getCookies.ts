import { LOCAL_STORAGE_KEY } from "../constants";

export const getCookies=()=>{
    const AccessTokenCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("access_token="));
      // setLocalStorageToken(token);
      let access_token;
      if (AccessTokenCookie) {
          access_token = AccessTokenCookie.split("=")[1];
          localStorage.setItem(LOCAL_STORAGE_KEY,access_token);
    //   setCookieAccessToken(access_token);
    //   getUserInfo(AccessTokenCookie.split("=")[1]);
    }
    return {access_token}
}