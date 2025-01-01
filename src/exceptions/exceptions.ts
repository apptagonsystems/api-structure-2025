import { ErrorCodes, HttpError } from "./httpError";

export class BadRequestException extends HttpError {
  constructor(message: string) {
    super(400, message, ErrorCodes.INVALID_INPUT, "BadRequest");
  }
}

export class UnauthorizedException extends HttpError {
  constructor(message: string) {
    super(401, message, ErrorCodes.UNAUTHORIZED, "Unauthorized");
  }
}
export class ForbiddenException extends HttpError {
  constructor(message: string) {
    super(402, message, ErrorCodes.FORBIDDEN, "Forbidden");
  }
}
export class NotFoundException extends HttpError {
  constructor(message: string) {
    super(404, message, ErrorCodes.NOT_FOUND, "NotFound");
  }
}
export class MethodNotAllowedException extends HttpError {
  constructor(message: string) {
    super(405, message, ErrorCodes.METHOD_NOT_ALLOWED, "MethodNotAllowed");
  }
}
export class ConflictException extends HttpError {
  constructor(message: string) {
    super(409, message, ErrorCodes.CONFLICT, "Conflict");
  }
}
export class InternalServerErrorException extends HttpError {
  constructor(message: string) {
    super(
      500,
      message,
      ErrorCodes.INTERNAL_SERVER_ERROR,
      "InternalServerError"
    );
  }
}
export class NotImplementedException extends HttpError {
  constructor(message: string) {
    super(501, message, ErrorCodes.NOT_IMPLEMENTED, "NotImplemented");
  }
}
export class BadGatewayException extends HttpError {
  constructor(message: string) {
    super(502, message, ErrorCodes.BAD_GATEWAY, "BadGateway");
  }
}

export class ServiceUnavailableException extends HttpError {
  constructor(message: string) {
    super(503, message, ErrorCodes.SERVICE_UNAVAILABLE, "ServiceUnavailable");
  }
}

export class GatewayTimeoutException extends HttpError {
  constructor(message: string) {
    super(504, message, ErrorCodes.GATEWAY_TIMEOUT, "GatewayTimeout");
  }
}
export class UnprocessableEntityException extends HttpError {
  constructor(message: string) {
    super(
      504,
      message,
      ErrorCodes.GATEWAY_TIMEOUT,
      "UnprocessableEntityException"
    );
  }
}

export class InvalidInputException extends HttpError {
  constructor(message: string, stack?: any) {
    super(
      504,
      message,
      ErrorCodes.INVALID_INPUT,
      "InvalidInputException",
      stack
    );
  }
}
