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
  const { informations, handleInformations } = useContent();

  return (
    <section className="flex flex-col bg-white py-4 px-4 ml-4 rounded-md shadow-sm border-[1px] border-gray-200">
      <div>
        <Label className="font-medium">Title</Label>
        <Input
          placeholder="Main title"
          className="mt-2"
          value={informations.title}
          onChange={(e) => handleInformations("title", e.target.value)}
        />
      </div>
      <div className="mt-2">
        <Label className="font-medium">Description</Label>
        <Input
          placeholder="Description"
          className="mt-2"
          value={informations.description}
          onChange={(e) => handleInformations("description", e.target.value)}
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Advanced options to OG, Twitter and Cards tag.
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <Label className="font-medium">Open Graph - Title</Label>
              <Input
                placeholder="OG - Main title"
                className="mt-2"
                value={
                  !informations.og_title
                    ? informations.title
                    : informations.og_title
                }
                onChange={(e) => handleInformations("og_title", e.target.value)}
              />
            </div>
            <div className="mt-2">
              <Label className="font-medium">Open Graph - Description</Label>
              <Input
                placeholder="OG - Description"
                className="mt-2"
                value={
                  !informations.og_description
                    ? informations.description
                    : informations.og_description
                }
                onChange={(e) =>
                  handleInformations("og_description", e.target.value)
                }
              />
            </div>
            <Separator className="my-4" />
            <div>
              <Label className="font-medium">Twitter - Title</Label>
              <Input
                placeholder="Main title"
                className="mt-2"
                value={
                  !informations.twitter_title
                    ? informations.title
                    : informations.twitter_title
                }
                onChange={(e) =>
                  handleInformations("twitter_title", e.target.value)
                }
              />
            </div>
            <div className="mt-2">
              <Label className="font-medium">Twitter - Description</Label>
              <Input
                placeholder="Description"
                className="mt-2"
                value={
                  !informations.twitter_description
                    ? informations.description
                    : informations.twitter_description
                }
                onChange={(e) =>
                  handleInformations("twitter_description", e.target.value)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
