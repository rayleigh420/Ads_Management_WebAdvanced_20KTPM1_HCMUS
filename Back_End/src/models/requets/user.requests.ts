import { JwtPayload } from "jsonwebtoken";
import { TokenType } from "../../constants/enum";

export interface RegisterReqBody {
  email: string;
  password: string;
}

export interface LoginReqBody {
  email: string;
  password: string;
}

export interface FindUserOptions {
  email?: string;
  username?: string;
  userId?: number;
  password?: string;
}

export enum UserType {
  DEPARTMENT_OFFICER = 0,
  DISTRICT_OFFICER = 1,
  WARD_OFFICER = 2
}

export interface CreateUserBody {
  userType: number;
  email: string;
  password: string;
  wardId?: number;
  districtId?: number;
}

export interface TokenPayload extends JwtPayload {
  userId: string;
  userType: UserType;
  tokenType: TokenType;
  exp: number;
  iat: number;
}