"use client";

import { createContext, memo, useCallback, useEffect, useState } from "react";

import MainLoader from "@/components/MainLoader";
import { auth } from "@/lib/firebase-config";
import { usePathname, useRouter } from "next/navigation";
import { Unsubscribe, User, onAuthStateChanged } from "firebase/auth";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext(null);

function AuthProvider({ children }: AuthContextProps) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const location = usePathname();

  useEffect(() => {
    const unsubscribe = handleUser();
    return () => unsubscribe();
  }, []);

  const handleUser = useCallback((): Unsubscribe => {
    setLoading(true);
    return onAuthStateChanged(auth, (user) => {
      if (user && location == "/") {
        router.push("/dashboard");
      }

      if (!user && location !== "/") {
        router.push("/");
      }

      setLoading(false);
    });
  }, [location]);

  return (
    <AuthContext.Provider value={null}>
      {!loading ? children : <MainLoader />}
    </AuthContext.Provider>
  );
}

export default memo(AuthProvider);
