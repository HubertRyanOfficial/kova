import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Component } from "./types";

import cn from "classnames";

export function renderComponent(
  component: Component,
  handleFunction: (value: string | File | null) => void
) {
  let resultComponent = null;

  if (component.type == "image") {
    resultComponent = (
      <div className="flex items-center justify-between w-full">
        {!component.content ? (
          <Input
            type="file"
            onChange={(e) =>
              e.target &&
              e.target.files &&
              e.target.files?.length >= 0 &&
              handleFunction(e.target.files[0])
            }
            accept="image/png, image/jpeg"
            disabled={component.loading}
          />
        ) : (
          <img src={component.content} width={50} height={50} />
        )}
        {component.loading && (
          <span className="ml-4 text-xs">
            <Loader color="#000000" size={24} />
          </span>
        )}
      </div>
    );
  } else if (component.type == "title") {
    resultComponent = (
      <input
        value={component.content}
        onChange={(e) => handleFunction(e.target.value)}
        placeholder="Title"
        className="w-full font-medium text-4xl border-0 outline-none pl-0 text-black placeholder:text-gray-400 bg-transparent"
      />
    );
  } else {
    resultComponent = (
      <div
        className="text-base w-full h-auto bg-white border-[1px] rounded-md border-gray-500 p-4 outline-none"
        contentEditable
        onInput={(e: any) => {
          e.target?.innerText && handleFunction(String(e.target?.innerHTML));
        }}
      />
    );
  }

  return <div className={cn("mt-4 overflow-auto")}>{resultComponent}</div>;
}
