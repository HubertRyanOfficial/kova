import Content from "./_components/Content";
import ContentOptions from "./_components/ContentOptions";
import ContentInformation from "./_components/ContentInformation";

import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div className="px-4 w-full">
      <Tabs defaultValue="content" className="w-full h-[90%]">
        <ContentOptions />
        <div className="mt-2 rounded-xl overflow-y-auto h-full">
          <TabsContent value="content">
            <Content />
          </TabsContent>
          <TabsContent value="informations">
            <ContentInformation />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
