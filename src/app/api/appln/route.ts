import { NextResponse } from "next/server";
import { colors } from "../../appln/data-files/colors";
import { quals } from "../../appln/data-files/quals";
import { applns } from "../../appln/data-files/applnImgs";
import { selectData } from "../../appln/data";

// Simple 3-second delay utility
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  try {
    // Simple 3-second delay for testing loading states
    await wait(3000);

    // Return all data in a single response
    return NextResponse.json(
      {
        colors,
        qualities: quals,
        images: applns,
        selectData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
