import type { Component, ComponentTypes } from "@/lib/content/types";

export interface ContentContextProps {
  children: React.ReactNode;
}

export interface ContentContextType extends ContentContextHandles {
  informations: ContentInformations;
  components: Component[];
  hasComponentsAvailable: boolean;
  publishing: boolean;
  isEditing: boolean;
}

export interface ContentContextHandles {
  handleInformations: (key: keyof ContentInformations, value: string) => void;
  handleComponentContent: (
    content: string | File | null,
    index: number
  ) => void;
  handleAddNewComponent: (type: ComponentTypes) => void;
  handleRemoveComponent: (index: number) => void;
  handlePublish: () => Promise<void>;
  handleEditContent: (data: Content, id: string) => void;
  handleResetContentBuilder: () => void;
}

export interface ContentInformations {
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
}

export interface Content extends ContentInformations {
  full_content: string;
  timestamp: number;
  last_change?: number;
}
