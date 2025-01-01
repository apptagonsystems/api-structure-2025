// message , status code, error code, error name, stack

export class HttpError extends Error {
  status: number;
  message: string;
  errorCode: ErrorCodes;
  errorName: string;
  stack: any | undefined;

  constructor(
    status: number,
    message: string,
    errorCode: ErrorCodes,
    errorName: string,
    stack?: any
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
    this.errorName = errorName;
    this.stack = stack;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 101,
  USER_ALREADY_EXISTS = 102,
  INVALID_CREDENTIALS = 103,
  INVALID_TOKEN = 104,
  INVALID_INPUT = 105,
  UNPROCESSABLE_ENTITY = 106,
  INTERNAL_EXCEPTION = 107,
  USER_DOES_NOT_EXIST = 108,
  UNAUTHORIZED = 109,
  FORBIDDEN = 110,
  NOT_FOUND = 11,
  METHOD_NOT_ALLOWED = 111,
  CONFLICT = 112,
  INTERNAL_SERVER_ERROR = 113,
  NOT_IMPLEMENTED = 114,
  BAD_GATEWAY = 115,
  SERVICE_UNAVAILABLE = 116,
  GATEWAY_TIMEOUT = 117,
}
