import Content from "./components/Content";
import ContentHeader from "./components/ContentHeader";

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-[800px] mt-16">
        <ContentHeader />

        <div className="mt-4">
          <Content />
        </div>
      </div>
    </div>
  );
}
