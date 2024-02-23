"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase-config";

export default function ProjectList() {
  const [name, setName] = useState("");
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  async function createNewProject() {
    if (!name || !auth.currentUser) return;

    setLoading(true);

    const newProject = await addDoc(
      collection(db, `users/${auth.currentUser.uid}/projects`),
      {
        name,
        total_contents: 0,
      }
    );

    setOpened(false);
    setLoading(false);
  }

  return (
    <Sheet open={opened}>
      <Button onClick={() => setOpened(true)}>
        <PlusIcon className="mr-2" />
        Create new project
      </Button>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create new project</SheetTitle>
          <SheetDescription>
            Create your project to start making your contents
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              disabled={loading}
              onClick={() => createNewProject()}
              type="submit"
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All projects" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Tapedin</SelectItem>
        <SelectItem value="dark">Cloudsky</SelectItem>
        <SelectItem value="system">Sixcry</SelectItem>
      </SelectContent>
    </Select>
  );
}
