"use client";

import { usePathname, useRouter } from "next/navigation";
import { ContainerIcon, PackagePlus, FileBoxIcon } from "lucide-react";
import cn from "classnames";

import { Button } from "@/components/ui/button";

const OPTIONS = [
  {
    icon: <ContainerIcon className="w-4 h-4 mr-4" />,
    name: "Contents",
    path: "/dashboard",
  },
  {
    icon: <FileBoxIcon className="w-4 h-4 mr-4" />,
    name: "Drafts",
    path: "/dashboard/drafts",
  },
];

export default function TabBar() {
  const location = usePathname();
  const router = useRouter();

  return (
    <aside className="w-[220px] px-4 rounded-tr-2xl">
      <Button
        onClick={() => router.push("/dashboard/create")}
        variant={"ghost"}
        className=""
      >
        <PackagePlus className="w-4 h-4 mr-4" /> Create new content
      </Button>
      <div className="border-[1px] bg-gray-300 border-dashed my-4" />
      <div>
        {OPTIONS.map((option, index) => (
          <Button
            onClick={() => router.push(option.path)}
            variant={option.path === location ? "outline" : "ghost"}
            className={cn("w-full flex justify-start items-center", {
              "bg-white": option.path === location,
              "mt-2": index > 0,
            })}
          >
            {option.icon} {option.name}
          </Button>
        ))}
      </div>
    </aside>
  );
}
