import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="mx-auto flex w-full max-w-4xl items-center justify-between pt-4 text-xl">
        <Link href="/" className="">
          noorify
        </Link>
        <ul>
          <li>
            <Link href="/hadiths" className="hover:underline">
              Hadiths
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
