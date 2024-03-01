"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import MainLoader from "@/components/MainLoader";
import { auth } from "@/lib/firebase-config";
import { usePathname, useRouter } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext(null);

export function AuthProvider({ children }: AuthContextProps) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const location = usePathname();

  useEffect(() => {
    handleUser();
  }, [auth, children]);

  const handleUser = useCallback(async () => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(location);

      if (user && location == "/") {
        router.push("/dashboard");
      }

      if (!user && location !== "/") {
        router.push("/");
      }

      // * Make sure that is getting user data from firestore by UID

      setLoading(false);
    });
    return unsubscribe;
  }, [location]);

  return (
    <AuthContext.Provider value={null}>
      {!loading ? children : <MainLoader />}
    </AuthContext.Provider>
  );
}
