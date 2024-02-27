import Container from "@/components/Container";
import Image from "next/image";
import { db } from "@/lib/db";
import { trips } from "@/lib/schema";

type Props = {
  id: string;
  city: string;
  country: string;
  description: string;
  imageUrl: string;
}

function TripCard(props: Props) {
  return (
    <div key={props.id} className="max-w-sm border border-gray-300 rounded-lg shadow-sm flex flex-col hover:scale-[102%] transition-transform">
      {props.imageUrl ? (
        <div className="aspect-video relative overflow-hidden">
          <Image className="w-full h-full object-cover rounded-t-lg" src={props.imageUrl} alt={`An image of ${props.city}`} fill />
        </div>
      ) : null}
      <div className="flex flex-col flex-grow p-6 pt-2">
        <div className="flex justify-between items-center py-3">
          <p className="text-xl font-bold">{props.city}</p>
          <p className="text-gray-600">{props.country}</p>
        </div>
        <p>{props.description}</p>
        <button className="mt-8 bg-blue-950 text-white rounded-lg p-2 w-full text-center font-medium">View your trip</button>
      </div>
    </div>
  );
}
// React server server component
export default async function Dashboard() {
  const allTrips = await db.select().from(trips);

  return (
    <div>
      <Container>
        <h1 className="text-4xl my-8">Dashboard Page</h1>
        <div className="grid grid-cols-3 gap-12 pb-16">
          {allTrips.map((trip) => (
            <TripCard 
              key={trip.id} 
              id={trip.id}
              city={trip.city} 
              imageUrl={trip.imageURL} 
              country={trip.country} 
              description={trip.descriptionShort} 
            />
          ))}
        </div>

      </Container>
    </div>
  );
}