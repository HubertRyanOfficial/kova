import Content from "./components/Content";
import ContentHeader from "./components/ContentHeader";
import ContentOptions from "./components/ContentOptions";

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-[850px] h-[90%]">
        <ContentOptions />
        <div className="mt-2 p-6 border-[1px] border-gray-100 rounded-xl overflow-y-auto h-full">
          <ContentHeader />
          <div className="mt-8">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}
