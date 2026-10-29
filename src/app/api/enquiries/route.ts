import { NextResponse } from "next/server";
import { EnquirySchema } from "@/lib/validations";
import { createEnquiry } from "@/services/enquiries";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = EnquirySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid enquiry submission" },
        { status: 400 }
      );
    }

    const enquiry = await createEnquiry(parseResult.data);
    return NextResponse.json({ success: true, enquiry });
  } catch (err: unknown) {
    console.error("[Enquiry API Error]", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
