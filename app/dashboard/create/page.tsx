import { Tabs, TabsContent } from "@/components/ui/tabs";
import Content from "./components/Content";
import ContentOptions from "./components/ContentOptions";
import ContentInformation from "./components/ContentInformation";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[88vh]">
      <Tabs defaultValue="content" className="w-[850px] h-[90%]">
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
