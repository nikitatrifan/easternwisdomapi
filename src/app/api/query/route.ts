import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { getGuidedQuery } from "@/app/api/query/guide";

const llm = new OpenAI({
  modelName: "gpt-4",
  temperature: 0,
  maxTokens: -1,
  openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

function removeReferences(input: string) {
  return input.split("----")?.[0].trim() || input.trim();
}

function removeLabels(input: string) {
  return input.replace(/\[[^\]]+\]:/gi, "").trim();
}

function formatLLMResponse(response: string) {
  return removeLabels(removeReferences(response));
}

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const guidedQuery = getGuidedQuery({
      query,
    });

    console.log(guidedQuery);

    const prediction = await llm.predict(guidedQuery);
    const result = formatLLMResponse(prediction);

    console.log({ prediction })

    return NextResponse.json({ result });
  } catch (e: any) {
    console.log("Error", e?.response?.data ?? e.message);

    let quotaErrorKind = false;

    if (e?.response?.data?.error?.code === "rate_limit_exceeded") {
      quotaErrorKind = true;
    } else if ((e?.name || e?.message)?.toLowerCase()?.includes("quota")) {
      quotaErrorKind = true;
    }

    return NextResponse.json({
      error: true,
      type: quotaErrorKind ? "rate_limit" : "unknown",
    });
  }
}
