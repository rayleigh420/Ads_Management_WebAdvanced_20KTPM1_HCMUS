import HTTP_STATUS from '../constants/httpStatus';
import { USER_MESSAGES } from '../constants/message';

type errorType = Record<
  string,
  {
    msg: string;
    [key: string]: any;
  }
>;

export class ErrorWithStatus {
  message: string;
  status: number;
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message;
    this.status = status;
  }
}

export class EntityError extends ErrorWithStatus {
  errors: errorType;
  constructor({ message = USER_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: errorType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY });
    this.errors = errors;
  }
}
