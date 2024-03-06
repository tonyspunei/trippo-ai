import { db } from "@/lib/db";
import { trips } from "@/lib/schema";
import { eq } from "drizzle-orm";
import TripDetail from "./TripDetail";
import ItineraryList from "./ItineraryList";
import type { Itinerary } from "./ItineraryList";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string }
}

export default async function TripDetailPage(props: Props) {
  const trip = await db.select().from(trips).where(eq(trips.id, props.params.id));

  if(!trip[0]) return notFound();

  return (
    <div className="flex px-3 my-16 max-h-[150vh]">
      <aside className="w-1/2 border-r-2 px-8 pb-24 overflow-y-auto">
        <TripDetail {...trip[0]} />
      </aside>
      <main>
        <ItineraryList itinerary={trip[0].itinerary as Itinerary[]} />
      </main>
    </div>
  )
}