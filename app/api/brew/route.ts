import { BackendErrors } from "../errors";

export async function GET() {
  return BackendErrors.IM_A_TEAPOT;
}
export async function POST() {
  return BackendErrors.IM_A_TEAPOT;
}
