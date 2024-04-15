"use client";

import { useEffect } from "react";

import Content from "@/components/Content/Content";
import ContentOptions from "@/components/Content/ContentOptions";
import ContentInformation from "@/components/Content/ContentInformation";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useContent } from "@/contexts/ContentContext";

export default function Page() {
  const { handleResetContentBuilder } = useContent();

  useEffect(() => {
    handleResetContentBuilder();
  }, []);

  return (
    <div className="px-4 w-full h-[96%]">
      <ContentOptions
        title="Create content"
        description="Create a new content and add seo information."
      />
      <div className="h-[92%]">
        <ResizablePanelGroup direction="horizontal" className="mt-6">
          <ResizablePanel defaultSize={60}>
            <Content />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <ContentInformation />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
