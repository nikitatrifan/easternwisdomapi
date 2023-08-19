import axios from "axios";
import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { getGuidedQuery, getQueryDoubleChecked } from "@/app/api/query/guide";
import { knowledgeBase } from "@/app/api/query/knowledgebase";

const llm = new OpenAI({
  modelName: "gpt-3.5-turbo-16k",
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

    const result2 = await llm.predict(
      getQueryDoubleChecked({
        query: guidedQuery,
        response: result,
      })
    );

    console.log({ result, result2 });

    return NextResponse.json({ result, result2 });
  } catch (e) {
    console.log("Errror", e.response.data ?? e.message);
    // console.error(e);
  }

  return NextResponse.json({ error: true });
}
