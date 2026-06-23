import clsx from "clsx";
import { normalizeAnswerForDisplay } from "@/lib/rich-text";
import styles from "./RichTextContent.module.css";

interface RichTextContentProps {
  html: string;
  className?: string;
}

export default function RichTextContent({ html, className }: RichTextContentProps) {
  const sanitized = normalizeAnswerForDisplay(html);

  if (!sanitized) return null;

  return (
    <div
      className={clsx(styles.richText, className)}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
