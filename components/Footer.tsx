"use client";

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
    </footer>
  );
}
