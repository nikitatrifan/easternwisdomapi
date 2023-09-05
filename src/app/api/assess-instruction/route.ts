import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { getGuidedQuery, getQueryDoubleChecked } from "@/app/api/query/guide";

const llm = new OpenAI({
  modelName: "gpt-4",
  temperature: 0,
  maxTokens: -1,
  openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

export async function POST(request: Request) {
  try {
    const result = await llm.predict(
      `[REQUEST]: You are a language model that's told to follow this instruction. On the scale from 1 to 10, where 10 is perfect, assess how seamless it is to follow it. If it isn't 10 list out all the issues and complications you found that if addressed will make this instruction a solid 10:
INSTRUCTION STARTS HERE.
------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------
${getGuidedQuery({ query: "[STUDENT]: I do not know how to fogrive myself." })}
------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------
INSTRUCTION ENDS HERE.

[YOUR RESPONSE]:`
    );

    return NextResponse.json({ result });
  } catch (e: any) {
    console.log("Errror", e?.response.data ?? e?.message);
    // console.error(e);
  }

  return NextResponse.json({ error: true });
}
