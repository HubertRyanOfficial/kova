"use client";

import { useEffect, useState } from "react";

import Content from "@/components/Content/Content";
import ContentOptions from "@/components/Content/ContentOptions";
import ContentInformation from "@/components/Content/ContentInformation";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { useContent } from "@/contexts/ContentContext";
import { Content as ContentType } from "@/contexts/ContentContext/types";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: EditPageProps) {
  const { toast } = useToast();
  const { handleEditContent } = useContent();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getContent() {
      try {
        setLoading(true);
        const contentRef = await getDoc(doc(collection(db, "contents"), id));
        const contentData = contentRef.data() as ContentType;

        if (contentData) {
          handleEditContent(contentData);
        }
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error editing this content",
        });
        setLoading(false);
        router.push("/dashboard");
      }
    }

    getContent();
  }, [id]);

  if (loading) return <span>Loading</span>;

  return (
    <div className="px-4 w-full h-[96%]">
      <ContentOptions
        title="Edit content"
        description="Edit content and the informations."
      />
      <div className="h-[92%]">
        <ResizablePanelGroup direction="horizontal" className="mt-6">
          <ResizablePanel defaultSize={60}>
            <Content />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <ContentInformation />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
