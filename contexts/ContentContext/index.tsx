"use client";

import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { auth, db, storage } from "@/lib/firebase-config";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

import {
  compilerComponent,
  reverseToComponents,
} from "@/lib/content/compilerComponent";

import { useToast } from "@/components/ui/use-toast";
import { useUser } from "../UserContext";
import type { Component, ComponentTypes } from "@/lib/content/types";

import {
  Content,
  ContentContextProps,
  ContentContextType,
  ContentInformations,
} from "./types";

const ContentContext = createContext<ContentContextType>({} as any);

export function ContentProvider({ children }: ContentContextProps) {
  const { toast } = useToast();
  const { refreshContents } = useUser();
  const router = useRouter();

  const contentId = useRef<string>("");

  const [isEditing, setIsEditing] = useState(false);
  const [informations, setInformations] = useState<ContentInformations>({
    title: "",
    description: "",
  });
  const [components, setComponents] = useState<Component[]>([
    {
      ref: createRef<any>(),
      type: "text",
      content: "",
    },
  ]);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!isEditing) getNewId();
  }, [isEditing]);

  useEffect(() => {
    const handleInnersValue = () => {
      if (isEditing) {
        components.map((comp, index) => {
          if (
            comp.type == "text" &&
            comp.ref.current &&
            comp.ref.current.innerHTML == "" &&
            comp.content != ""
          ) {
            comp.ref.current.innerHTML = comp.content;
          }
        });
      }
    };

    handleInnersValue();
  }, [isEditing, components]);

  const getNewId = useCallback(async () => {
    const newContentRef = collection(db, "contents");
    const newId = doc(newContentRef);
    if (!contentId.current && newId && newId.id) {
      contentId.current = newId.id;
    }
  }, [contentId.current]);

  const handleInformations = useCallback(
    (key: keyof ContentInformations, value: string) =>
      setInformations((prevValue) => ({
        ...prevValue,
        [key]: value,
      })),
    []
  );

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
        ref: createRef<any>(),
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
        `contents/${contentId.current}/${timestamp}.${type}`
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
    [components, contentId.current]
  );

  const handlePublish = async () => {
    try {
      setPublishing(true);
      const timestamp = new Date().valueOf();

      const fullContentToUpload = compilerComponent(components);

      const contentRef = doc(collection(db, "contents"), contentId.current);
      await setDoc(contentRef, {
        ...informations,
        full_content: JSON.stringify(fullContentToUpload),
        timestamp,
      });
      refreshContents();
      setInformations({
        title: "",
        description: "",
      });

      contentId.current = "";

      setComponents([
        {
          ref: createRef<any>(),
          type: "text",
          content: "",
        },
      ]);
      router.back();
    } catch (error) {
      toast({
        title: "Publishing error",
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleEditContent = (data: Content) => {
    setIsEditing(true);

    const allComponentes = reverseToComponents(data.full_content);
    setComponents(allComponentes);

    setInformations({
      title: data.title || "",
      description: data.description || "",
      og_title: data.og_title || "",
      og_description: data.og_description || "",
      twitter_title: data.twitter_title || "",
      twitter_description: data.twitter_description || "",
    });
  };

  const hasComponentsAvailable = useMemo(
    () =>
      informations.title &&
      informations.description &&
      components.find((item) => !!item.content || item.content.length > 0)
        ? true
        : false,
    [components, informations]
  );

  return (
    <ContentContext.Provider
      value={{
        components,
        informations,
        hasComponentsAvailable,
        publishing,
        handleInformations,
        handleComponentContent,
        handleAddNewComponent,
        handleRemoveComponent,
        handlePublish,
        handleEditContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
