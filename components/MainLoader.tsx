"use client";

import Image from "next/image";
import Loader from "./Loader";
import Logo from "./Logo";

export default function MainLoader() {
  return (
    <main className="flex flex-col justify-center items-center h-[100vh] bg-white -mt-14">
      <Logo width={180} height={180} />
      <div role="status" className="mt-8">
        <Loader />
        <span className="sr-only">Loading...</span>
      </div>
    </main>
  );
}
