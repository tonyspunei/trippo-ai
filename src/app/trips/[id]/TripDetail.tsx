import type { Trip } from "@/lib/schema";
import Image from "next/image";
import { Plane, Hotel, Lightbulb } from "lucide-react";

type Props = Trip;

export default function TripDetail(props: Props) {
  return (
    <>
      <div className="text-center space-y-6">
        <div className="relative aspect-video">
          <Image 
            src={props.imageURL}
            alt={`A picture of ${props.city}`}
            fill
            className="object-cover rounded-3xl"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold pt-4">{props.city}</h1>
          <p className="pt-1 text-sm uppercase tracking-wide">{props.country}</p>
        </div>
        <p className="text-xl leading-7">{props.descriptionLong}</p>
        <div className="flex items-center justify-center space-x-3">
          <Plane />
          <p>{props.flightTime}</p>
          <p>•</p>
          <p>
            {props.flightMin} – {props.flightMax}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Hotel />
          <p>3 ★ {props.hotel3}</p>
          <p>4 ★ {props.hotel4}</p>
          <p>5 ★ {props.hotel5}</p>
        </div>
      </div>

      <div className="mt-16 p-8 border rounded-xl shadow space-y-3 flex flex-col items-center">
        <Lightbulb />
        <p className="upercase text-sm font-bold">Travel&apos;s Tip:</p>
        <p className="text-center">{props.tip}</p>
      </div>
    </>
  );
}