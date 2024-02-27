"use client";

import Image from "next/image";
import Loader from "./Loader";

export default function MainLoader() {
  return (
    <main className="flex flex-col justify-center items-center h-[100vh] bg-white -mt-14">
      <Image alt="Kova" src="/kova.svg" width={220} height={220} />
      <div role="status" className="mt-6">
        <Loader />
        <span className="sr-only">Loading...</span>
      </div>
    </main>
  );
}
