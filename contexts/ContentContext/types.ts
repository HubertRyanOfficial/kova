import type {
  Component,
  ComponentTypes,
  TextStyleTypes,
} from "@/lib/content/types";

export interface ContentContextProps {
  children: React.ReactNode;
}

export interface ContentContextType extends ContentContextHandles {
  informations: ContentInformations;
  components: Component[];
  hasComponentsAvailable: boolean;
  publishing: boolean;
  isEditing: boolean;
  focusedComponentType: ComponentTypes | null;
  styleSelected: string;
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
  handleTextComponentFocus: (index: number | null) => void;
  handleStyle: (style: TextStyleTypes) => void;
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
