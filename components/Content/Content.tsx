"use client";

import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useContent } from "@/contexts/ContentContext";
import { TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import RenderComponent from "./RenderComponent";
import { getTypeOption } from "@/lib/content/options";

export default function Content() {
  const { components, handleRemoveComponent } = useContent();
  return (
    <div className="mr-4 overflow-y">
      <AnimatePresence mode="sync">
        {components.map((item, index) => {
          const typeOption = getTypeOption(item.type);

          return (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn("flex flex-col w-full", {
                "mt-4": index > 0,
                "mt-2": index > 0 && components[index - 1].type == "title",
              })}
              key={index}
            >
              <div className="flex items-center justify-between">
                <Label className="text-gray-400 text-xs flex items-center">
                  {typeOption.icon}
                  <span className="-ml-2">{typeOption.title}</span>
                </Label>
                <div className="flex flex-row items-center">
                  <Button
                    disabled={item.loading}
                    onClick={() => handleRemoveComponent(index)}
                    className="ml-4 h-9"
                    variant="outline"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>

              <RenderComponent index={index} component={item} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
