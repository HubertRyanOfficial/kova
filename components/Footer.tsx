"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="h-[4vh] flex items-center justify-center">
      <span className="text-gray-300 text-sm">@Kova 2024 | Open Source</span>
      <Button
        variant="link"
        className="text-gray-300 px-0 ml-2"
        onClick={() =>
          window.location.assign("https://www.mozilla.org/en-US/MPL/1.1/")
        }
      >
        (License)
      </Button>
      <a
        href="https://github.com/hubertryanofficial/kova"
        target="_blank"
        className="text-gray-300 text-sm ml-4 flex flex-row items-center hover:text-gray-800 cursor-pointer"
      >
        <GitHubLogoIcon className="w-5 h-5" />
        <span className="ml-2">Respository</span>
      </a>
    </footer>
  );
}
