"use client";
import Container from "@/components/Container";
import CitiesPreviewGrid from "@/components/CitiesPreviewGrid";
import { generateDestinations } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function Discover() {
  const [state, formAction] = useFormState(generateDestinations, null)

  return (
    <div>
      <Container>
        <h1 className="text-4xl py-8 ">Discover Page</h1>
        <form action={formAction} className="border p-8 rounded-xl">
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col w-fit space-y-2">
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="days">How many days are you traveling?</label>
              <input id="days" name="days" type="number" placeholder="Between 3 and 10" required className="ring-1 ring-inset ring-gray-300 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" />
            </div>
            <div className="flex flex-col w-fit space-y-2">
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="budget">What is your max budget (in €)?</label>
              <input id="budget" name="budget" type="number" placeholder="e.g. €5000" required className="ring-1 ring-inset ring-gray-300 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" />
            </div>
            <div className="flex flex-col w-fit space-y-2">
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="from">Where are you travelling from?</label>
              <input id="from" name="from" type="text" placeholder="e.g. London" required className="ring-1 ring-inset ring-gray-300 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm" />
            </div>
          </div>
          <div className="flex flex-col space-y-2 max-w-lg mt-8">
            <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="details">Trip details</label>
            <small>In a sentence or two, describe what kind of trip you are looking for.</small>
            <textarea id="details" name="details" rows={4} placeholder="e.g. I want to go on a relaxing party trip with my best friends. Somewhere that has a great party scene and nightlife." required className="block mt-2 w-full ring-1 ring-inset ring-gray-300 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm">
            </textarea>
          </div>
          <button className="bg-blue-600 text-white hover:bg-blue-500 rounded-xl px-4 py-2 mt-8">Submit</button>
        </form>
        {state ? 
          <div className="mt-8">
            <CitiesPreviewGrid {...state} />
          </div>
        : null}
      </Container>
    </div>
  );
}