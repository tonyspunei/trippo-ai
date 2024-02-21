import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between py-4 px-6 bg-teal-200">
      <Link href="/dashboard">Trippo</Link>
      <Link href="/discover">Discover</Link>
    </nav>
  );
}