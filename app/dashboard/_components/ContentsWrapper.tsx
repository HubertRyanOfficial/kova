"use client";

import { useUser } from "@/contexts/UserContext";
import CreateButton from "./CreateButton";
import Loader from "@/components/Loader";
import ContentsList from "./ContentsList";

export default function ContentsWrapper() {
  const { loading, contents } = useUser();

  if (loading) {
    return <Loader color="#000000" />;
  }

  if (contents.length === 0) {
    return (
      <>
        <h1 className="text-5xl font-bold">Create new content</h1>
        <p className="text-gray-300 mt-4">Or create your new project</p>
        <div className="mt-8">
          <CreateButton />
        </div>
      </>
    );
  }

  return <ContentsList />;
}
