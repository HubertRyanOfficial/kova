export interface Component {
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
