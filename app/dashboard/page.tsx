import CreateButton from "./components/CreateButton";

export default function Page() {
  return (
    <div className="bg-white h-full flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Create new content</h1>
      <p className="text-gray-300 mt-4">Or create your new project</p>
      <div className="mt-8">
        <CreateButton />
      </div>
    </div>
  );
}
