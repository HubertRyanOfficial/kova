// import { RenderContent } from "@/lib/content/renderContent";
import { db } from "@/lib/firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
import { RenderContent } from "@kova/render";

import Loader from "@/components/Loader";

import "@/lib/content/renderStyles.css";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const content = (await getDoc(doc(collection(db, "contents"), id))).data();

  if (!content) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader color="#000000" />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 overflow-y-auto">
      <h1 className="text-4xl font-semibold">{content.title}</h1>
      <RenderContent content={content.full_content} className="content" />
    </div>
  );
}
