import type { LegacyRef, Ref } from "react";

export interface Component {
  ref: any;
  type: ComponentTypes;
  content: string;
  loading?: boolean;
  failed?: boolean;
}

export interface RenderComponet {
  type: ComponentTypes;
  icon: JSX.Element;
  title: string;
}

export type ComponentTypes = "title" | "text" | "image";
