import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://192.168.22.40:4321/users"); // ✅ Llama al backend Express
    const data = await res.json();  
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
