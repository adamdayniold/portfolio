import { NextResponse } from "next/server";
import { getFiles } from "@/lib/getFiles";

export async function GET() {
  try {
    const files = getFiles(); // server-only
    return NextResponse.json(files); // ✅ return JSON
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}
