import { db } from "@/lib/db";
import { trips } from "@/lib/schema";
import { eq } from "drizzle-orm";

type Props = {
  params: { id: string }
}

export default async function TripDetails(props: Props) {
  const trip = await db.select().from(trips).where(eq(trips.id, props.params.id));

  if(!trip[0]) return "No trip found";

  return (
    <div>
      <h1>You're going to {trip[0].city}</h1>
    </div>
  )
}