import { createRef } from "react";
import { Component } from "./types";

function formatRichText(text: string) {
  return text.replace("<h2>", "<b>").replace("</h2>", "</b>");
}

function reverseFormatRichText(text: string) {
  return text.replace("<b>", "<b>").replace("</b>", "</h2>");
}

export function compilerComponent(components: Component[]) {
  let result: string[] = [];

  components
    .filter((component) => component.content != "")
    .forEach((item) => {
      if (item.type == "title") {
        result.push(`<h2>${item.content}</h2>`);
      } else if (item.type == "text") {
        result.push(`<p>${formatRichText(item.content)}</p>`);
      } else {
        result.push(`<img src=${item.content}>`);
      }
    });

  return result;
}

export function reverseToComponents(full_content: string) {
  let result: Component[] = [];

  const json: string[] = JSON.parse(full_content);

  json.map((content) => {
    if (content.startsWith("<p>")) {
      result.push({
        ref: createRef<any>(),
        type: "text",
        content: reverseFormatRichText(content),
      });
    } else if (content.startsWith("<h2>")) {
      result.push({
        ref: createRef<any>(),
        type: "title",
        content: content.replace("<h2>", "").replace("</h2>", ""),
      });
    } else {
      const regex = /<img.*?src=(.*?)>/;
      const match: any = content.match(regex);

      result.push({
        ref: createRef<any>(),
        type: "image",
        content: match[1],
        loading: false,
        failed: false,
      });
    }
  });

  return result;
}
