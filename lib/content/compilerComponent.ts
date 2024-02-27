import { Component } from "./types";

export function compilerComponent(components: Component[]) {
  let result: string[] = [];

  components.forEach((item) => {
    if (item.type == "title") {
      result.push(`<h2>${item.content}</h2>`);
    } else if (item.type == "text") {
      result.push(`<p>${item.content}</p>`);
    } else {
      result.push(`<img src={${item.content}}>`);
    }
  });

  return result;
}
