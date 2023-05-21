import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { query } = await request.json();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${query}`;
  const response = await axios.get(apiUrl);
  return NextResponse.json({ result: response.data.response });
}
