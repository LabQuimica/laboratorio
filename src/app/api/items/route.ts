import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching data from backend...");
    const res = await fetch("http://localhost:4321/items");
    
    if (!res.ok) {
      throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en Next.js API:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
