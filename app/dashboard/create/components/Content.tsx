"use client";

import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { renderComponent } from "@/lib/content/renderComponent";
import { TrashIcon } from "@radix-ui/react-icons";

export default function Content() {
  const { components, handleComponentContent, handleRemoveComponent } =
    useContent();
  return (
    <div>
      {components.map((item, index) => (
        <div className="flex items-end">
          {renderComponent(item, (value: string | File | null) =>
            handleComponentContent(value, index)
          )}
          <aside className="ml-4">
            <Button
              disabled={item.loading}
              onClick={() => handleRemoveComponent(index)}
            >
              <TrashIcon color="#FFFFFF" />
            </Button>
          </aside>
        </div>
      ))}
    </div>
  );
}
