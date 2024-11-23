import { Logger } from "@aws-lambda-powertools/logger";

const { LOG_LEVEL } = process.env;
const internalLogger = new Logger({
  serviceName: "ErrorHandling",
  logLevel: LOG_LEVEL ?? "DEBUG",
});

export interface ErrorResponse {
  statusCode: number;
  body: string;
}

export class GeneralError extends Error {
  public static GENERAL_ERROR: string = "General Error";
  public static UNKNOWN_ERROR: string = "Unknown Error";

  public static UNKNOWN_CODE: number = 500;

  public errorType: string;
  public httpCode: number | undefined;
  public friendlyMessage: string | undefined;

  //Keep in mind that the message property will be sent to the client, so don't include sensative information
  //Don't even mention dynamodb as it would reveal our database to potentially malicious actors
  constructor(
    message: string,
    cause: any,
    errorType: string,
    httpCode: number | undefined,
    friendlyMessage?: string,
  ) {
    super(message, { cause });

    this.errorType = errorType;
    this.httpCode = httpCode;
    this.friendlyMessage = friendlyMessage;
  }

  public extractInfo() {
    //I no longer trust AWS logger to retrieve all of these properties
    return {
      message: this.message,
      friendlyMessage: this.friendlyMessage,
      errorType: this.errorType,
      httpCode: this.httpCode,
      stack: this.stack,
      cause: this.cause,
    };
  }
}

export class InternalError extends GeneralError {
  public static INTERNAL_ERROR: string = "Internal Error";
  public static INTERNAL_CODE: number = 500;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(
      message,
      cause,
      InternalError.INTERNAL_ERROR,
      InternalError.INTERNAL_CODE,
      friendlyMessage,
    );
  }
}

//TODO really consider if this should extend sensative error instead
export class DatabaseError extends GeneralError {
  public static DATABASE_ERROR: string = "Database Error";
  public static DATABASE_CODE: number = 500;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(
      message,
      cause,
      DatabaseError.DATABASE_ERROR,
      DatabaseError.DATABASE_CODE,
      friendlyMessage,
    );
  }
}

export class InputError extends GeneralError {
  public static INPUT_ERROR: string = "Input Error";
  public static INPUT_CODE: number = 400;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(message, cause, InputError.INPUT_ERROR, InputError.INPUT_CODE, friendlyMessage);
  }
}

export class UnauthorizedError extends GeneralError {
  public static UNAUTHORIZED_ERROR: string = "Unauthorized Error";
  public static UNAUTHORIZED_CODE: number = 401;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(
      message,
      cause,
      UnauthorizedError.UNAUTHORIZED_ERROR,
      UnauthorizedError.UNAUTHORIZED_CODE,
      friendlyMessage,
    );
  }
}

export class ForbiddenError extends GeneralError {
  public static FORBIDDEN_ERROR: string = "Forbidden Error";
  public static FORBIDDEN_CODE: number = 403;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(
      message,
      cause,
      ForbiddenError.FORBIDDEN_ERROR,
      ForbiddenError.FORBIDDEN_CODE,
      friendlyMessage,
    );
  }
}

export class NotFoundError extends GeneralError {
  public static NOT_FOUND_ERROR: string = "Not Found Error";
  public static NOT_FOUND_CODE: number = 404;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(
      message,
      cause,
      NotFoundError.NOT_FOUND_ERROR,
      NotFoundError.NOT_FOUND_CODE,
      friendlyMessage,
    );
  }
}

export class DataSyncError extends GeneralError {
  public static SYNC_ERROR: string = "Data Sync Error";
  public static SYNC_CODE: number = 503;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(message, cause, DataSyncError.SYNC_ERROR, DataSyncError.SYNC_CODE, friendlyMessage);
  }
}

export class RetryError extends GeneralError {
  public static RETRY_ERROR: string = "Retry Error";
  public static RETRY_CODE: number = 503;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(message, cause, RetryError.RETRY_ERROR, RetryError.RETRY_CODE, friendlyMessage);
  }
}

export class SocketError extends GeneralError {
  public static SOCKET_ERROR: string = "Socket Error";
  public static SOCKET_CODE: number = 500;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(message, cause, SocketError.SOCKET_ERROR, SocketError.SOCKET_CODE, friendlyMessage);
  }
}

/**
 * When the error is an instance of SensativeError, neither the message nor the
 * friendlyMessage will be given to the client.
 *
 * The default error code for SensativeError is 500 but other codes are
 * acceptable via calling setHttpCode()
 */
export class SensativeError extends GeneralError {
  public static SENSATIVE_ERROR: string = "Sensative Error";
  public static SENSATIVE_CODE: number = 500;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(
      message,
      cause,
      SensativeError.SENSATIVE_ERROR,
      SensativeError.SENSATIVE_CODE,
      friendlyMessage,
    );
  }

  public getHttpCode(): number {
    return this.httpCode ?? SensativeError.SENSATIVE_CODE;
  }

  public setHttpCode(httpCode: number) {
    this.httpCode = httpCode;
  }
}

export class UnavailableError extends GeneralError {
  public static UNAVAILABLE_ERROR: string = "Unavailable Error";
  public static UNAVILABLE_CODE: number = 503;

  constructor(message: string, cause: any, friendlyMessage?: string) {
    super(
      message,
      cause,
      UnavailableError.UNKNOWN_ERROR,
      UnavailableError.UNAVILABLE_CODE,
      friendlyMessage,
    );
  }
}

export class MultiError extends GeneralError {
  public static MULTI_ERROR: string = "Multi Error";
  public static MULTI_CODE: 500;

  constructor(error1: GeneralError, error2: GeneralError) {
    super(
      "First Error Message: " + error1?.message + " Second Error Message: " + error2?.message,
      "First Error Cause: " +
        JSON.stringify(error1?.cause) +
        " Second Error Cause: " +
        JSON.stringify(error2?.cause),
      MultiError.MULTI_ERROR,
      MultiError.MULTI_CODE,
      "First Friendly Message: " +
        error1?.friendlyMessage +
        " Second Friendly Message: " +
        error2?.friendlyMessage,
    );
  }
}

export function logError(error: any, logger?: Logger) {
  let myLogger = logger;
  if (!myLogger) {
    myLogger = internalLogger;
  }

  if (error instanceof GeneralError) {
    myLogger.error(error.message, { errData: error.extractInfo() });
  } else if (error instanceof Error) {
    myLogger.error(error.message, { errData: { ...error } }, { raw: error });
  } else {
    myLogger.error("Unknown thrown error", { errData: error });
  }
}

export function makeErrorResponse(error: any, logger?: Logger): ErrorResponse {
  let myLogger = logger;
  if (!myLogger) {
    myLogger = internalLogger;
  }

  let response: ErrorResponse;

  if (error instanceof SensativeError) {
    //We don't want to give the real messages to the client
    response = {
      statusCode: error.httpCode ?? GeneralError.UNKNOWN_CODE,
      body: JSON.stringify({
        message: "A server error occurred",
        friendlyMessage: "A server error occurred, you may need to try again later",
      }),
    };
  } else if (error instanceof GeneralError) {
    //For security purposes we only expose error messages and no other information
    response = {
      statusCode: error.httpCode ?? GeneralError.UNKNOWN_CODE,
      body: JSON.stringify({
        message: error.message,
        friendlyMessage: error.friendlyMessage ?? "",
      }),
    };
  } else if (error instanceof Error) {
    //For security purposes we do not expose thrown errors that are not our custom error objects.
    response = {
      statusCode: GeneralError.UNKNOWN_CODE,
      body: JSON.stringify({
        message: "An unknown server error occurred",
        friendlyMessage: "An unknown server error occurred",
      }),
    };
  } else {
    response = {
      statusCode: GeneralError.UNKNOWN_CODE,
      body: JSON.stringify({
        message: "An unknown server error occurred",
        friendlyMessage: "An unknown server error occurred",
      }),
    };
  }

  myLogger.info("Created error response", { errResp: response });
  return response;
}

function prependCode(message: string, code: number): string {
  return "[" + code + "] " + message;
}

//Designed for non-proxy lambda integrations that need regex recognition ie ^[400].*
export function makeExceptionResponse(error: any, logger?: Logger): string {
  let myLogger = logger;
  if (!myLogger) {
    myLogger = internalLogger;
  }

  let response: string;

  //Return strings so that ApiGateway can easily use regex on it
  if (error instanceof SensativeError) {
    //We don't want to give the real messages to the client
    response = prependCode("A server error occurred", GeneralError.UNKNOWN_CODE);
  } else if (error instanceof GeneralError) {
    //For security purposes we only expose error messages and no other information
    response = prependCode(error.message, error.httpCode ?? GeneralError.UNKNOWN_CODE);
  } else if (error instanceof Error) {
    //For security purposes we do not expose thrown errors that are not our custom error objects.
    response = prependCode("An unknown server error occurred", GeneralError.UNKNOWN_CODE);
  } else {
    response = prependCode("An unknown server error occurred", GeneralError.UNKNOWN_CODE);
  }

  myLogger.info("Created error response", { errResp: response });
  return response;
}
