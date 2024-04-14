"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PackagePlusIcon } from "lucide-react";

export default function CreateButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/dashboard/create")}
      className="w-[200px]"
    >
      <PackagePlusIcon className="w-5 h-5 mr-2" /> Create Article
    </Button>
  );
}
