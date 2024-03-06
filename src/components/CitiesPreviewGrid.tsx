import CitiesPreviewCard from "./CitiesPreviewCard";
import type { GenerateState } from "@/lib/actions";
import { useTransition } from "react";
import { saveDestination } from "@/lib/actions";

type Props = GenerateState;

export default function CitiesPreviewGrid(props: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <h2 className="text-3xl text-center font-bold mb-16">Discover your Next Destination</h2>
      <div className="grid grid-cols-3 gap-16">
        {props.cities.map((city) => (
          <CitiesPreviewCard 
            key={city.name} 
            {...city} 
            pending={pending} 
            onClick={() => {
              startTransition(() => {
                saveDestination({
                  city: city.name, 
                  country: city.country, 
                  descriptionShort: city.description, 
                  imageURL: city.image || "",
                  budget: props.budget,
                  from: props.from,
                  days: props.days,
                })
              })
            }}
          />
        ))}
      </div>
    </div>
  )

}