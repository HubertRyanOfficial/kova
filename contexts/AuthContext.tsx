"use client";

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import MainLoader from "@/components/MainLoader";
import { auth } from "@/lib/firebase-config";
import { usePathname, useRouter } from "next/navigation";
import { Unsubscribe, User, onAuthStateChanged } from "firebase/auth";

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextValues {
  handleLoading: (value: boolean) => void;
}

const AuthContext = createContext({} as AuthContextValues);

function AuthProvider({ children }: AuthContextProps) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const location = usePathname();

  useEffect(() => {
    const unsubscribe = handleUser();
    return () => unsubscribe();
  }, []);

  const handleUser = useCallback((): Unsubscribe => {
    if (!loading) setLoading(true);
    return onAuthStateChanged(auth, (user) => {
      if (user && location == "/") {
        router.push("/dashboard");
      }

      if (!user && location !== "/") {
        router.push("/");
      }

      setLoading(false);
    });
  }, [location, loading]);

  const handleLoading = (value: boolean) => setLoading(value);

  return (
    <AuthContext.Provider value={{ handleLoading }}>
      {!loading ? children : <MainLoader />}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default memo(AuthProvider);
