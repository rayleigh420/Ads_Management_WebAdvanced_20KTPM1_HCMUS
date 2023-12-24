import {User} from './orm/entities/User'
declare module 'express' {
  interface Request {
    user?: User
  }
}
