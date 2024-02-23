import Container from "@/components/Container";

export default function Discover() {
  return (
    <div>
      <Container>
        <h1 className="text-4xl py-8 ">Discover Page</h1>
        <form action="">
          <div className="space-y-4">
            <div className="flex flex-col w-fit space-y-2">
              <label htmlFor="days_traveling">How many days are you traveling?</label>
              <input id="days_traveling" type="number" className="ring-1 ring-inset ring-gray-300" />
            </div>
            <div className="flex flex-col w-fit space-y-2">
              <label htmlFor="max_budget">What is your max budget (in €)?</label>
              <input id="max_budget" type="number" className="ring-1 ring-inset ring-gray-300" />
            </div>
            <div className="flex flex-col w-fit space-y-2">
              <label htmlFor="current_location">Where are you travelling from?</label>
              <input id="current_location" type="text" className="ring-1 ring-inset ring-gray-300" />
            </div>
          </div>
          <div className="flex flex-col space-y-2 max-w-lg mt-8">
            <label htmlFor="trip_details">Trip details</label>
            <small>In a sentence or two, describe what kind of trip you are looking for.</small>
            <textarea id="trip_details" rows={4} className="block mt-2 w-full ring-1 ring-inset ring-gray-300">
            </textarea>
          </div>
          <button className="bg-blue-600 text-white hover:bg-blue-500 rounded-xl px-4 py-2 mt-8">Submit</button>
        </form>
      </Container>
    </div>
  );
}