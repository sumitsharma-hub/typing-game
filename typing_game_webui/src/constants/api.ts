const API = {
  V1: {
    ACCOUNT_LOGIN: "/v1/accounts/login",
    ACCOUNT_RESITER: "/v1/accounts/register",
    ACCOUNT_LOGOUT: "/v1/accounts/logout",
    ACCOUNT_DETAILS: "/v1/accounts/detail",
    GENERATE_TEXT: "/v1/generate/text",
    RECORD_SUBMIT: "/v1/record/submit",
    USER_INFO: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token",
    REVOKE_TOKEN: "https://accounts.google.com/o/oauth2/revoke?token",
  },
};
export default API;
