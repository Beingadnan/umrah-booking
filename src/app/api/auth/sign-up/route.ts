import { NextResponse } from "next/server";
import { registerCustomer } from "@/services/users";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { RegisterSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = RegisterSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { email, password, name, phone } = parseResult.data;
    const user = await registerCustomer({ email, password, name, phone });

    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err: unknown) {
    console.error("[Sign Up Error]", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to create account" },
      { status: 400 }
    );
  }
}
