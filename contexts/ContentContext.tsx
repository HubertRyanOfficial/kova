"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useToast } from "@/components/ui/use-toast";

import MainLoader from "@/components/MainLoader";
import { auth, storage } from "@/lib/firebase-config";
import { usePathname, useRouter } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth";
import type { Component, ComponentTypes } from "@/lib/content/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface ContentContextProps {
  children: React.ReactNode;
}

interface ContentContextType extends ContetContextHandles {
  title: string;
  components: Component[];
  hasComponentsAvailable: boolean;
}

interface ContetContextHandles {
  handleTitle: (value: string) => void;
  handleComponentContent: (
    content: string | File | null,
    index: number
  ) => void;
  handleAddNewComponent: (type: ComponentTypes) => void;
  handleRemoveComponent: (index: number) => void;
}

const ContentContext = createContext<ContentContextType>({} as any);

export function ContentProvider({ children }: ContentContextProps) {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [components, setComponents] = useState<Component[]>([
    {
      type: "text",
      content: "",
    },
  ]);

  const handleTitle = useCallback((value: string) => setTitle(value), []);
  const handleComponentContent = useCallback(
    (content: string | File | null, index: number) => {
      let allComponents = [...components];
      let selectedComponent = allComponents[index];

      if (
        selectedComponent.type == "image" &&
        content &&
        typeof content !== "string"
      ) {
        handleUploadImage(content, index);
        selectedComponent.loading = true;
      } else if (content && typeof content === "string") {
        selectedComponent.content = content;
      }

      setComponents(allComponents);
    },
    [components]
  );

  const handleAddNewComponent = useCallback(
    (type: ComponentTypes) => {
      let newComponent = {
        type,
        content: "",
        loading: false,
        failed: false,
      };

      setComponents([...components, newComponent]);
    },
    [components]
  );

  const handleRemoveComponent = useCallback(
    (index: number) => {
      setComponents(
        components.filter((item, componentIndex) => componentIndex != index)
      );
    },
    [components]
  );

  const handleUploadImage = useCallback(
    async (file: File, index: number) => {
      const type = file.type == "image/jpeg" ? "jpg" : "png";
      const timestamp = new Date().valueOf();
      const storageRef = ref(storage, `images/${timestamp}.${type}`);
      const fileUplaoded = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      let allComponents = [...components];
      let selectedComponent = allComponents[index];
      selectedComponent.content = downloadURL;
      selectedComponent.loading = false;

      setComponents(allComponents);

      toast({
        title: "Image uploaded",
        description: `${timestamp}.${type}`,
      });
    },
    [components]
  );

  const hasComponentsAvailable = useMemo(
    () =>
      title &&
      components.find((item) => !!item.content || item.content.length > 0)
        ? true
        : false,
    [components, title]
  );

  return (
    <ContentContext.Provider
      value={{
        components,
        title,
        hasComponentsAvailable,
        handleTitle,
        handleComponentContent,
        handleAddNewComponent,
        handleRemoveComponent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
