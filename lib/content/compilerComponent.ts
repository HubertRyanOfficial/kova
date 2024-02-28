import { Component } from "./types";

function formatRichText(text: string) {
  text.replace("<h2>", "<b>");
  text.replace("</h2>", "</b>");

  return text;
}

export function compilerComponent(components: Component[]) {
  let result: string[] = [];

  components.forEach((item) => {
    if (item.type == "title") {
      result.push(`<h2>${item.content}</h2>`);
    } else if (item.type == "text") {
      result.push(`<p>${formatRichText(item.content)}</p>`);
    } else {
      result.push(`<img src={${item.content}}>`);
    }
  });

  return result;
}
