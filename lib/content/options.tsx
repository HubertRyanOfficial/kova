import { HeadingIcon, ImageIcon, TextIcon } from "@radix-ui/react-icons";
import { RenderComponet } from "./types";

export const componentOptions: RenderComponet[] = [
  {
    type: "title",
    title: "Title",
    icon: <HeadingIcon className="mr-4" />,
  },
  {
    type: "text",
    title: "Text",
    icon: <TextIcon className="mr-4" />,
  },
  {
    type: "image",
    title: "Image",
    icon: <ImageIcon className="mr-4" />,
  },
];

export const getTypeOption = (type: string) => {
  const typeSelected = componentOptions.find((item) => item.type == type);

  if (!typeSelected)
    return {
      title: "",
      icon: <div />,
    };

  return {
    title: typeSelected.title,
    icon: typeSelected.icon,
  };
};
