import { Errors } from "../lib/types";

export const BackendErrors = {
  NOT_IMPLEMENTED: Response.json(
    { code: "NOT_IMPLEMENTED", message: "Not implemented" },
    { status: 501 },
  ),
  MISSING_ARGUMENTS: Response.json(
    { code: "MISSING_ARGUMENTS", message: "Missing arguments" },
    { status: 422 },
  ),
  ENTITY_NOT_FOUND: Response.json(
    { code: "ENTITY_NOT_FOUND", message: "Entity not found" },
    { status: 404 },
  ),
  UNAUTHORIZED: Response.json({ code: "UNAUTHORIZED", message: "Unauthorized" }, { status: 401 }),
  ENTITY_EXISTS: Response.json(
    { code: "ENTITY_EXISTS", message: "Entity already exists" },
    { status: 409 },
  ),
  IM_A_TEAPOT: Response.json(
    { code: "IM_A_TEAPOT", message: "Cannot brew coffee with a teapot" },
    { status: 418 },
  ),
  SERVER_ERROR: Response.json({ code: "SERVER_ERROR", message: "Server error" }, { status: 500 }),
} as const satisfies Errors;
