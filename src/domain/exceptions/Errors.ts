export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errorName: string;

  constructor(message: string, statusCode: number, errorName: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorName = errorName;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400, 'BadRequestError');
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409, 'ConflictError');
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401, 'UnauthorizedError');
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404, 'NotFoundError');
  }
}
