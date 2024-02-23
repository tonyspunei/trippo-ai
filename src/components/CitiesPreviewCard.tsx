import type { City } from "@/lib/actions";
import Image from "next/image";

type Props = City;

export default function CitiesPreviewCard(props: Props) {
  return (
    <div className="max-w-sm h-[550px]">
      {props.image ? 
        <div className="aspect-video relative overflow-hidden">
          <Image src={props.image} alt={`a photo of ${props.name}`} fill />
        </div>
      : null}
      <p>{props.name}</p>
      <p>{props.country}</p>
      <p>{props.description}</p>
      <ul>
        {props.reasons.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
    </div>
  )
}