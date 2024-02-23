import CitiesPreviewCard from "./CitiesPreviewCard";
import type { GenerateState } from "@/lib/actions";

type Props = GenerateState;

export default function CitiesPreviewGrid(props: Props) {
  return (
    <div>
      <h2 className="text-3xl">Discover your Next Destination</h2>
      <div>
        {props.cities.map((city) => (
          <CitiesPreviewCard key={city.name} {...city} />
        ))}
      </div>
    </div>
  )

}