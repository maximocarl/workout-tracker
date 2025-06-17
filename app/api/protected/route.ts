import { getServerSession } from "next-auth";

export async function GET(_request: Request) {
  const session = await getServerSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  return new Response("Protected route", { status: 200 });
}