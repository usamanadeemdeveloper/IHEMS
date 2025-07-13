import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Bill from "@/models/billModel";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, bills } = await req.json();

    const created = await Bill.insertMany(
      bills.map((b) => ({ ...b, userId }))
    );
    console.log("📦 Created Bills:", created);
    return NextResponse.json({ success: true, created });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
