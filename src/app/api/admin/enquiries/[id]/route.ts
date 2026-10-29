import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateEnquiryStatus } from "@/services/enquiries";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    if (!body.status) {
      return NextResponse.json({ error: "Missing status parameter" }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, body.status);
    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: unknown) {
    console.error("[Update Enquiry Error]", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
