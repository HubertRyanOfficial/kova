import ProjectList from "./components/ProjectList";

export default function Page() {
  return (
    <div className="bg-white h-full flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Select your project</h1>
      <p className="text-gray-300 mt-4">Or create your new project</p>
      <div className="mt-8">
        <ProjectList />
      </div>
    </div>
  );
}
