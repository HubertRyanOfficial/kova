import Content from "./_components/Content";
import ContentOptions from "./_components/ContentOptions";
import ContentInformation from "./_components/ContentInformation";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Page() {
  return (
    <div className="px-4 w-full h-[96%]">
      <ContentOptions />
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
