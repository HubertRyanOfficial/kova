import GoogleButton from "@/components/GoogleButton";
import Image from "next/image";

import MainLoader from "@/components/MainLoader";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center h-[100vh] bg-white">
      <div>
        <Image alt="Kova" src="/kova.svg" width={220} height={220} />
      </div>
      <p className="text-sm mt-4 w-[300px] text-center text-gray-400">
        Use Kova as your CMS and manage/create good contents.
      </p>
      <GoogleButton />
    </main>
  );
}
