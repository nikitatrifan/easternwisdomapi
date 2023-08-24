import axios from "axios";
import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
import { getGuidedQuery, getQueryDoubleChecked } from "@/app/api/query/guide";
import { knowledgeBase } from "@/app/api/query/knowledgebase";
import { mastersPrinciples } from "@/app/api/query/principles";

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
      `[REQUEST]: I have a set of principles that an AI model will use to teach its students. I want you to take a look at them; see if you find anything conflicting. I just need your analysis as to whether this is something you'd be able to easily follow as a set of guidelines, principles;:
[PRINCIPLES]: 
--------------------
--------------------
--------------------
${mastersPrinciples}
--------------------
--------------------
--------------------
[YOUR RESPONSE]:
`
    );

    // console.log({ result, result2 });

    const result2 = "";

    return NextResponse.json({ result, result2 });
  } catch (e: any) {
    console.log("Errror", e?.response.data ?? e?.message);
    // console.error(e);
  }

  return NextResponse.json({ error: true });
}
