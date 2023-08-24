import axios from "axios";
import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { getGuidedQuery, getQueryDoubleChecked } from "@/app/api/query/guide";
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
    const result = await llm.predict(
      `[REQUEST]: Please refine the provided content on the illusion of the self, ensuring it is tailored for comprehension by an AI language model. Ensure that all primary arguments, essential meanings, insights, and thought experiments are captured. Aim for brevity and eliminate redundant or superfluous content, but avoid omitting critical details or arguments:
[ORIGINAL CONTENT]: 
--------------------
--------------------
--------------------
${query}
--------------------
--------------------
--------------------
[CONTENT REFINED]:
`
    );

    // console.log({ result, result2 });

    const result2 = "";

    return NextResponse.json({ result, result2 });
  } catch (e: any) {
    console.log("Errror", e.response?.data ?? e?.message);
    // console.error(e);
  }

  return NextResponse.json({ error: true });
}
