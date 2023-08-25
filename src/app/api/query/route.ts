import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { getGuidedQuery } from "@/app/api/query/guide";
import { knowledgeBase } from "@/app/api/query/knowledgebase";

const llm = new OpenAI({
  modelName: "gpt-4",
  temperature: 0,
  maxTokens: -1,
  openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const guidedQuery = getGuidedQuery({
      knowledgeBase,
      query,
    });

    const result = await llm.predict(guidedQuery);

    return NextResponse.json({ result });
  } catch (e: any) {
    console.log("Errror", e?.response?.data ?? e.message);

    return NextResponse.json({
      error: true,
      type:
        e?.response?.data?.error?.code === "rate_limit_exceeded"
          ? "rate_limit"
          : "unknown",
    });
  }
}
