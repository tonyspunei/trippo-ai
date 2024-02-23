"use server";

import OpenAI from "openai";
import { getGenerateUserMessage } from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type City = {
  name: string;
  country: string;
  description: string;
  reasons: string[];
};

export type GenerateState = {
  cities: City[];
  days: number;
  budget: number;
  from: string;
  details: string;
}

export const generateDestinations = async (_: GenerateState | null, formData: FormData) => {
  const days = Number(formData.get("days"));
  const budget = Number(formData.get("budget"));
  const from = formData.get("from") as string;
  const details = formData.get("details") as string;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "You are a travel assistant."
      },
      {
        "role": "user",
        "content": getGenerateUserMessage(days, budget, from, details)
      }
    ],
    response_format: { type: "json_object" }
  });

  if(!response?.choices?.[0]?.message?.content) {
    return null;
  }
  const result = JSON.parse(response.choices[0].message.content) as {cities: City[]};

  return {
    cities: result.cities,
    days,
    budget,
    from,
    details
  };
};