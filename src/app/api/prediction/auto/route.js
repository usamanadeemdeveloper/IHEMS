// app/api/prediction/auto/route.ts

import { connectDB } from "@/app/lib/db";
import Bill from "@/models/billModel";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const url = new URL(req.url);
    const months = parseInt(url.searchParams.get("months") || "1");

    const bills = await Bill.find({
      userId,
      units: { $gt: 0 },
      cost: { $gt: 0 },
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();


    if (bills.length < 6) {
      return NextResponse.json({ success: false, message: "Need at least 6 bills" }, { status: 400 });
    }

    // Calculate average monthly growth
    const unitGrowth = averageGrowth(bills.map((b) => b.units));
    const validBills = bills.filter((b) => b.units && b.units > 0);
    const costPerUnit =
      validBills.reduce((sum, b) => sum + b.cost / b.units, 0) / validBills.length;

    if (!isFinite(costPerUnit)) {
      return NextResponse.json({
        success: false,
        message: "Invalid data: unable to calculate cost per unit",
      }, { status: 400 });
    }

    // Predict over N months
    let lastUnits = bills[0].units;
    let predictedUnits = 0;

    for (let i = 0; i < months; i++) {
      lastUnits += unitGrowth;
      lastUnits = Math.max(0, lastUnits);
      predictedUnits += lastUnits;
    }

    const predictedCost = predictedUnits * costPerUnit;

    return NextResponse.json({
      success: true,
      prediction: {
        nextMonthUnits: predictedUnits,
        predictedCost,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

function averageGrowth(values) {
  const diffs = [];
  for (let i = 1; i < values.length; i++) {
    diffs.push(values[i] - values[i - 1]);
  }
  return diffs.reduce((a, b) => a + b, 0) / diffs.length;
}
