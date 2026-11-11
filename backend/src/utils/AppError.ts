/**
 * Centralized application error class.
 * All known errors should use this class for consistent error handling.
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly fields?: Record<string, string>;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    fields?: Record<string, string>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.fields = fields;
    this.isOperational = true;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string, fields?: Record<string, string>): AppError {
    return new AppError(message, 400, "BAD_REQUEST", fields);
  }

  static notFound(message: string): AppError {
    return new AppError(message, 404, "NOT_FOUND");
  }

  static conflict(message: string, fields?: Record<string, string>): AppError {
    return new AppError(message, 409, "CONFLICT", fields);
  }

  static validation(message: string, fields?: Record<string, string>): AppError {
    return new AppError(message, 422, "VALIDATION_ERROR", fields);
  }

  static unauthorized(message = "Authentication required"): AppError {
    return new AppError(message, 401, "UNAUTHORIZED");
  }

  static forbidden(message = "Permission denied"): AppError {
    return new AppError(message, 403, "FORBIDDEN");
  }

  static internal(message = "Internal server error"): AppError {
    return new AppError(message, 500, "INTERNAL_ERROR");
  }
}
