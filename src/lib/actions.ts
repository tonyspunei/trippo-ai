"use server";

import OpenAI from "openai";
import { getGenerateUserMessage } from "./prompts";
import { db } from "./db";
import { trips } from "./schema";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type City = {
  name: string;
  country: string;
  description: string;
  reasons: string[];
  image?: string;
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

  for (const city of result.cities) {
    const imageUrl = await fetchCityImage(city.name);
    city.image = imageUrl;
  }

  return {
    cities: result.cities,
    days,
    budget,
    from,
    details
  };
};

const PEXELS_URL = "https://api.pexels.com/v1/search";

async function fetchCityImage(query: string) {
  const url = `${PEXELS_URL}?query=${query}&per_page=1`;

  const result = await fetch(url, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY!!
    }
  });
  const json = await result.json();
  return json.photos[0].src.large as string;
};

export const saveDestination = async (city: string, country: string, descriptionShort: string, imageURL: string) => {
  await db.insert(trips).values({
    id: nanoid(14),
    city,
    country,
    descriptionShort,
    imageURL
  });

  revalidatePath("/dashboard");
}