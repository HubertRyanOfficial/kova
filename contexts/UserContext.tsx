"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import MainLoader from "@/components/MainLoader";
import { auth, db } from "@/lib/firebase-config";
import { usePathname, useRouter } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore";

interface UserContextProps {
  children: React.ReactNode;
}

interface UserContextType {
  loading: boolean;
  contents: Content[];
}

export interface Content {
  id: string;
  title: string;
  timestamp: number;
  full_content: string;
}

const UserContext = createContext<UserContextType>({} as any);

export function UserProvider({ children }: UserContextProps) {
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    handleContents();
  }, []);

  const handleContents = useCallback(async () => {
    if (contents.length > 0) return;

    try {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;

        const contentsRef = collection(db, "contents");
        const contents = await getDocs(contentsRef);

        const contentsData: Content[] = contents.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            full_content: data.full_content,
            timestamp: data.timestamp,
            title: data.title,
          };
        });

        setContents(contentsData);
        setLoading(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [contents]);

  return (
    <UserContext.Provider value={{ loading, contents }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
