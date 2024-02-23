"use client";

import { auth } from "@/lib/firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function GoogleButton() {
  const router = useRouter();
  const handleGoogleAuth = useCallback(async () => {
    const googleProvier = new GoogleAuthProvider();
    googleProvier.addScope("https://www.googleapis.com/auth/userinfo.email");

    const response = await signInWithPopup(auth, googleProvier);

    router.push("/dashboard");
  }, []);

  return (
    <div className="px-6 sm:px-0 max-w-sm mt-8">
      <button
        type="button"
        className="text-white w-full  bg-[#AD49A2] hover:bg-[#AD49A2]/90 focus:ring-4 focus:outline-none focus:ring-[#AD49A2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#AD49A2]/55 mr-2 mb-2"
        onClick={() => handleGoogleAuth()}
      >
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        <span className="font-medium">Sign up with Google</span>
      </button>
    </div>
  );
}
