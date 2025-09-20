import { auth } from "@/lib/auth";

export async function getServerSession(headers: Headers) {
  return await auth.api.getSession({ headers });
}
