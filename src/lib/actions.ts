"use server";

import OpenAI from "openai";
import { getGenerateUserMessage, getSaveDestinationUserMessage } from "./prompts";
import { db } from "./db";
import { trips } from "./schema";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    model: "gpt-3.5-turbo-1106",
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

// #1 Parse & Type our OpenAI Response
// #2 Update our Database schema
// #3 Push our (local) schema changes to our remote Neon DB
// #4 Update our server action's db.insert() call
// #5 Show something on the /trips/[id] page

type OpenAiResponse = {
  trip_description: string,
  flight_price_min: number,
  flight_price_max: number,
  flight_time: string,
  hotel_price: {
    3: number,
    4: number,
    5: number
  },
  tip: string,
  itinerary: {
    day: number,
    title: string,
    description: string,
    activities: string[]
  }[]
}

export const saveDestination = async ({
  city, 
  country, 
  descriptionShort, 
  imageURL,
  budget,
  from,
  days
}: {
  city: string;
  country: string;
  descriptionShort: string;
  imageURL: string;
  budget: number;
  from: string;
  days: number;
}) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      { "role": "system", "content": "You are a travel assistant." },
      {
        "role": "user",
        "content": getSaveDestinationUserMessage({
          city, 
          country, 
          details: descriptionShort, 
          budget, 
          from, 
          days
        })
      }
    ],
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content;

  if(!content) {
    return null;
  }

  const tripDetails = JSON.parse(content) as OpenAiResponse;

  const id = nanoid(14);
  await db.insert(trips).values({
    id,
    city,
    country,
    descriptionShort,
    imageURL,
    descriptionLong: tripDetails.trip_description,
    flightMin: tripDetails.flight_price_min,
    flightMax: tripDetails.flight_price_max,
    flightTime: tripDetails.flight_time,
    hotel3: tripDetails.hotel_price["3"],
    hotel4: tripDetails.hotel_price["4"],
    hotel5: tripDetails.hotel_price["5"],
    tip: tripDetails.tip,
    itinerary: tripDetails.itinerary
  });

  revalidatePath("/dashboard");
  redirect(`/trips/${id}`)
}