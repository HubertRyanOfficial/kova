"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useContent } from "@/contexts/ContentContext";

export default function ContentInformation() {
  const { title, handleTitle } = useContent();

  return (
    <section className="flex flex-col bg-white py-4 px-6 rounded-md shadow-sm border-[1px] border-gray-200">
      <div>
        <Label className="font-medium">SEO Title</Label>
        <Input placeholder="Main title" className="mt-2" />
      </div>
      <div className="mt-2">
        <Label className="font-medium">Description</Label>
        <Input placeholder="Description" className="mt-2" />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Advanced options to OG, Twitter and Cards tag.
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <Label className="font-medium">Open Graph - Title</Label>
              <Input placeholder="Main title" className="mt-2" />
            </div>
            <div className="mt-2">
              <Label className="font-medium">Open Graph - Description</Label>
              <Input placeholder="Description" className="mt-2" />
            </div>
            <Separator className="my-4" />
            <div>
              <Label className="font-medium">Twitter - Title</Label>
              <Input placeholder="Main title" className="mt-2" />
            </div>
            <div className="mt-2">
              <Label className="font-medium">Twitter - Description</Label>
              <Input placeholder="Description" className="mt-2" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
