import { NextResponse } from "next/server";

// POST /api/newsletter — store a subscriber.
// Wire this to Prisma (see prisma/schema.prisma) once DATABASE_URL is configured:
//   await prisma.subscriber.upsert({ where: { email }, update: {}, create: { email } });
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: "" }));
  if (typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  console.log("newsletter subscribe:", email);
  return NextResponse.json({ ok: true });
}
