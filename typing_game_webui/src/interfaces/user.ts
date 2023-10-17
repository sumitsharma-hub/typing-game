export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  provider?: string;
  isAdmin: boolean;
  isActive: boolean;
  email: string;
  profilePhoto?: string;
  dataJoined: string;
}

export interface IUseAuth {
  isLoggedIn:boolean;
  login: (loginPayload: ILogin) => Promise<void>;
  register: (registerPayload: {}) => Promise<void>;
  logout: () => Promise<void>;
  user: IUser | undefined;
}

export interface ILogin{
  email:string,
  password:string,
  profilePhoto:string
}