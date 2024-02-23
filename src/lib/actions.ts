"use server";

export const generateDestinations = async (_: string[] | null, formData: FormData) => {
  const days = formData.get("days");
  const budget = formData.get("budget");
  const from = formData.get("from");
  const details = formData.get("details");

  console.log("Server action was run!")
  console.log("Days: ", days);
  console.log("Budget: ", budget);
  console.log("From: ", from);
  console.log("Details: ", details);

  return ["Vancouver, Canada", "Paris, France", "Tokyo, Japan", "Sydney, Australia", "Cape Town, South Africa", "Rio de Janeiro, Brazil", "Reykjavik, Iceland", "Budapest, Hungary", "Marrakech, Morocco", "Mumbai, India", "Bangkok, Thailand", "Dubai, UAE", "New York City, USA", "Los Angeles, USA", "San Francisco, USA", "London, UK", "Barcelona, Spain", "Rome, Italy", "Athens, Greece", "Cairo, Egypt", "Cape Town, South Africa", "Nairobi, Kenya"];
};