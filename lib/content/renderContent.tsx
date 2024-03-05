import { memo } from "react";

function getClientTypeByComponent(
  content: string,
  index: number,
  className?: string | undefined
) {
  return (
    <div
      key={index}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export function RenderContent({
  content,
  className,
}: {
  content: string;
  className?: string | undefined;
}): React.ReactNode {
  const fullContent = JSON.parse(content);
  return (
    <>
      {fullContent.map((item: string, index: number) =>
        getClientTypeByComponent(item, index, className)
      )}
    </>
  );
}
