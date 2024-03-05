export function renderContent(content: string): React.ReactNode {
  const fullContent = JSON.parse(content);
  return (
    <>
      {fullContent.map((item: string) => (
        <div dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </>
  );
}
