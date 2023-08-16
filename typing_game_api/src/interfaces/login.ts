export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword?: string;
}

export interface GoogleTokenResult{
  access_token:string;
  expires_in:Number;
  refresh_token:string;
  scope:string;
  id_token:string;
}

export interface GoogleUserResult{
  id:string;
  email:string;
  verified_email:boolean;
  name:string;
  given_name:string;
  family_name:string;
  picture:string;
  locale:string;
}
