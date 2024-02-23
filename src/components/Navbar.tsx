import Link from "next/link";
import { PlaneLanding} from "lucide-react";
import Container from "./Container";

export default function Navbar() {
  return (
    <div className="bg-blue-600 text-white shadow-lg">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link className="flex space-x-2 items-center" href="/dashboard">
            <PlaneLanding size={32} />
            <span className="font-bold text-xl">Trippo</span>
          </Link>
          <Link className="text-sm border rounded-lg px-4 py-2 outline-white font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out" href="/discover">Discover</Link>
        </nav>
      </Container>
    </div>
  );
}