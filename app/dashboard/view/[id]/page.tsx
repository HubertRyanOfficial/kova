import { RenderContent } from "@/lib/content/renderContent";
import { db } from "@/lib/firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";

import "@/lib/content/renderStyles.css";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const content = (await getDoc(doc(collection(db, "contents"), id))).data();

  if (!content) return <span>loading</span>;

  return (
    <div className="h-full max-w-[1100px] m-auto flex flex-col justify-center items-center">
      <div className="w-full bg-white px-4 rounded-xl h-[700px] shadow-md overflow-y-auto">
        <h1 className="text-4xl font-semibold mt-6">{content.title}</h1>
        <RenderContent content={content.full_content} className="content" />
      </div>
    </div>
  );
}
