import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
  return Response.json({ message: "Success" }, { status: 200 });
}

export async function POST(_: NextRequest) {
  return Response.json({ message: "Success" }, { status: 200 });
}
