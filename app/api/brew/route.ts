import { BackendErrors } from "../errors";

export async function GET() {
  return Response.json(BackendErrors.IM_A_TEAPOT, { status: 418 });
}
export async function POST() {
  return Response.json(BackendErrors.IM_A_TEAPOT, { status: 418 });
}
