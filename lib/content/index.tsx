import { HeadingIcon, ImageIcon, TextIcon } from "@radix-ui/react-icons";
import { RenderComponet } from "./types";

export const typeOfContents: RenderComponet[] = [
  {
    type: "title",
    title: "Title",
    icon: <HeadingIcon className="mr-4" />,
  },
  {
    type: "text",
    title: "Text",
    icon: <ImageIcon className="mr-4" />,
  },
  {
    type: "image",
    title: "Image",
    icon: <TextIcon className="mr-4" />,
  },
];
