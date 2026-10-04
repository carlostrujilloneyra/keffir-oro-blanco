const BOLD = /(\*\*[^*]+\*\*)/g;

export const inlineMarkdown = (text: string): React.ReactNode[] =>
  text
    .split(BOLD)
    .map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
    );
