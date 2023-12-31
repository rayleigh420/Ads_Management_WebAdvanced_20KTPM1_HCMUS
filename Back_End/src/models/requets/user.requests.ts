export interface RegisterReqBody {
  email: string
}

export interface LoginReqBody{
  email: string
  password: string
}

export interface FindUserOptions {
  email?: string;
  username?: string;
  userId?: number;
  password?: string;
}