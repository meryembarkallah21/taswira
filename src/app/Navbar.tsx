import Link from "next/link";
import Image from "next/image";
import logo from "../app/logo.png"; // Import the logo image with the correct path

export function Navbar() {
  return (
    <div className="border-b py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          {/* Use the imported logo image */}
          <Image src={logo} alt="Logo" width={200} height={160} />
        </div>
        <nav className="flex gap-4">
          <Link href="/">
          <span className="text-xl font-semibold text-white cursor-pointer hover:text-red-500 transition-colors">
              Generate
            </span>
          </Link>
        </nav>
        <div>
          <Link href="/collection">
            <span className="text-xl font-semibold text-white cursor-pointer hover:text-red-500 transition-colors">
              Collection
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
