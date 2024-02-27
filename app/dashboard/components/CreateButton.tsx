"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";

export default function CreateButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.replace("/dashboard/create")}>
      <PlusIcon className="mr-2" /> Create Article
    </Button>
  );
}
