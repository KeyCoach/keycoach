import { Errors } from "../lib/types";

export const BackendErrors = {
  MISSING_ARGUMENTS: { code: "MISSING_ARGUMENTS", message: "Missing arguments", status: 422 },
  ENTITY_NOT_FOUND: { code: "ENTITY_NOT_FOUND", message: "Entity not found", status: 404 },
  INVALID_CREDENTIALS: { code: "INVALID_CREDENTIALS", message: "Invalid credentials", status: 401 },
  ENTITY_EXISTS: { code: "ENTITY_EXISTS", message: "Entity already exists", status: 401 },
  IM_A_TEAPOT: { code: "IM_A_TEAPOT", message: "Cannot brew coffee with a teapot", status: 418 },
} as const satisfies Errors;
