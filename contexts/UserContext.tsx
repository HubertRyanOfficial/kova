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
import {
  QueryDocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface UserContextProps {
  children: React.ReactNode;
}

interface UserContextType extends UserContextHandles {
  loading: boolean;
  contents: Content[];
}

interface UserContextHandles {
  refreshContents: () => void;
}

export interface Content {
  id: string;
  title: string;
  timestamp: number;
  full_content: string;
  onDelete: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({} as any);

export function UserProvider({ children }: UserContextProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    handleContents();
  }, []);

  const handleDeleteContent = useCallback(
    async (id: string, previousContent: Content[]) => {
      let allContents = [...previousContent];

      const contentIndex = allContents.findIndex((item) => item.id === id);

      allContents[contentIndex].loading = true;
      setContents(allContents);

      const contentRef = doc(collection(db, "contents"), id);
      await deleteDoc(contentRef);

      setContents(allContents.filter((item) => item.id != id));
    },
    []
  );

  const formatContent = (docs: any[]) => {
    return docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        full_content: doc.data().full_content,
        timestamp: data.timestamp,
        title: data.title,
        loading: false,
        onDelete: () => handleDeleteContent(doc.id, formatContent(docs)),
      };
    });
  };

  const handleContents = useCallback(async () => {
    if (contents.length > 0) return;
    if (!loading) setLoading(true);

    try {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;

        const contentsRef = query(
          collection(db, "contents"),
          orderBy("timestamp", "desc")
        );
        const allContents = await getDocs(contentsRef);

        const contentsData: Content[] = formatContent(allContents.docs);

        setContents(contentsData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error searching all contents",
        action: (
          <ToastAction
            altText="Refresh contents"
            onClick={() => handleContents()}
          >
            Refresh
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
    }
  }, [loading, contents]);

  return (
    <UserContext.Provider
      value={{ loading, contents, refreshContents: handleContents }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
