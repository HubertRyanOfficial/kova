"use client";

import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { renderComponent } from "@/lib/content/renderComponent";
import { Label } from "@radix-ui/react-dropdown-menu";
import { TrashIcon } from "@radix-ui/react-icons";

import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";

export default function Content() {
  const { components, handleComponentContent, handleRemoveComponent } =
    useContent();
  return (
    <AnimatePresence mode="sync">
      {components.map((item, index) => (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn("flex flex-col w-full mt-4 ", {
            "mt-8": item.type == "title",
          })}
        >
          <div className="flex items-center justify-between">
            <Label className="text-gray-400 text-xs">Type: {item.type}</Label>
            <Button
              disabled={item.loading}
              onClick={() => handleRemoveComponent(index)}
              className="ml-4 h-8"
              variant="outline"
            >
              <TrashIcon />
            </Button>
          </div>

          {renderComponent(item, (value: string | File | null) =>
            handleComponentContent(value, index)
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
