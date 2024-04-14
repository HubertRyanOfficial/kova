"use client";

import { useUser } from "@/contexts/UserContext";
import CreateButton from "./CreateButton";
import Loader from "@/components/Loader";
import ContentsList from "./ContentsList";

export default function ContentsWrapper() {
  const { loading, contents } = useUser();

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader color="#000000" />
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">Create new content</h1>
        <p className="text-gray-300 mt-4">Or create your new project</p>
        <div className="mt-8">
          <CreateButton />
        </div>
      </div>
    );
  }

  return <ContentsList />;
}
