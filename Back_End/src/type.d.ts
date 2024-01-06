import { TokenPayload } from './models/requets/user.requests';
import { User } from './orm/entities/User';
declare module 'express' {
  interface Request {
    user?: User;
    decodedAuthorization?: TokenPayload;
    decodedRefreshToken?: TokenPayload;
 //   decoded_email_verify_token?: TokenPayload;
  //  decoded_forgot_password_token?: TokenPayload;
  }
}
