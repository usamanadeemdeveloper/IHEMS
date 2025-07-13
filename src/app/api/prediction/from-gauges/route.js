import Bill from "@/models/billModel";
import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { v19: currentKwh, v18: acPower } = body;

    if (typeof currentKwh !== "number" || isNaN(currentKwh)) {
      return NextResponse.json({ success: false, message: "Missing or invalid kWh reading" }, { status: 400 });
    }

    await connectDB();

    const now = new Date();
    const estimatedCostPerKwh = 50;

    // 1. Get last real-time kWh reading from DB
    const lastReading = await Bill.findOne({ userId, isLive: true })
      .sort({ createdAt: -1 })
      .lean();

    let estimatedKwh = 0;
    let source = "acPower";

    if (lastReading && lastReading.units != null && lastReading.createdAt) {
      const deltaKwh = currentKwh - lastReading.units;
      const deltaHours = (now.getTime() - new Date(lastReading.createdAt).getTime()) / (1000 * 60 * 60);

      if (deltaHours > 0 && deltaKwh >= 0) {
        const ratePerHour = deltaKwh / deltaHours;
        estimatedKwh = ratePerHour * 24 * 30;
        source = "kWh (delta)";
      }
    }

    // 2. Fallback if no historical reading
    if (!estimatedKwh && typeof acPower === "number" && acPower > 0) {
      estimatedKwh = (acPower * 24 * 30) / 1000;
      source = "acPower";
    }

    if (!estimatedKwh) {
      return NextResponse.json({ success: false, message: "Insufficient data for prediction" }, { status: 400 });
    }

    const predictedCost = estimatedKwh * estimatedCostPerKwh;

    // 3. Save current reading as the new live entry
    await Bill.create({
      userId,
      units: currentKwh,
      cost: currentKwh * estimatedCostPerKwh,
      month: now.toISOString().slice(0, 7),
      isLive: true,
      createdAt: now,
    });

    return NextResponse.json({
      success: true,
      prediction: {
        estimatedUnits: estimatedKwh.toFixed(2),
        predictedCost: predictedCost.toFixed(2),
        source,
      },
    });
  } catch (err) {
    console.error("Prediction error", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
