import type { City } from "@/lib/actions";

type Props = City;

export default function CitiesPreviewCard(props: Props) {
  return (
    <div>
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