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
  login: (loginPayload: {}) => Promise<void>;
  register: (registerPayload: {}) => Promise<void>;
  logout: () => Promise<void>;
  user: IUser | undefined;
}
