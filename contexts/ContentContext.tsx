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
import { auth, db, storage } from "@/lib/firebase-config";
import { useRouter } from "next/navigation";
import { User, onAuthStateChanged } from "firebase/auth";
import type { Component, ComponentTypes } from "@/lib/content/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { compilerComponent } from "@/lib/content/compilerComponent";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useUser } from "./UserContext";

interface ContentContextProps {
  children: React.ReactNode;
}

interface ContentContextType extends ContetContextHandles {
  title: string;
  components: Component[];
  hasComponentsAvailable: boolean;
  publishing: boolean;
}

interface ContetContextHandles {
  handleTitle: (value: string) => void;
  handleComponentContent: (
    content: string | File | null,
    index: number
  ) => void;
  handleAddNewComponent: (type: ComponentTypes) => void;
  handleRemoveComponent: (index: number) => void;
  handlePublish: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType>({} as any);

export function ContentProvider({ children }: ContentContextProps) {
  const { toast } = useToast();
  const { refreshContents } = useUser();
  const router = useRouter();

  const [contentId, setContentId] = useState("");
  const [title, setTitle] = useState("");
  const [components, setComponents] = useState<Component[]>([
    {
      type: "text",
      content: "",
    },
  ]);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    getNewId();
  }, []);

  const getNewId = useCallback(async () => {
    const newContentRef = collection(db, "contents");
    const newId = doc(newContentRef);
    if (!contentId && newId && newId.id) {
      setContentId(newId.id);
    }
  }, [contentId]);

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
      const storageRef = ref(
        storage,
        `contents/${contentId}/${timestamp}.${type}`
      );
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
    [components, contentId]
  );

  const handlePublish = async () => {
    try {
      setPublishing(true);
      const timestamp = new Date().valueOf();
      const fullContentToUpload = compilerComponent(components);

      const contentRef = doc(collection(db, "contents"), contentId);
      await setDoc(contentRef, {
        title,
        full_content: JSON.stringify(fullContentToUpload),
        timestamp,
      });
      setTitle("");
      setContentId("");
      setComponents([]);
      refreshContents();
      router.back();
    } catch (error) {
    } finally {
      setPublishing(false);
    }
  };

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
        publishing,
        handleTitle,
        handleComponentContent,
        handleAddNewComponent,
        handleRemoveComponent,
        handlePublish,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
