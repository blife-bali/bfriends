"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Unlink,
} from "lucide-react";
import styles from "./RichTextEditor.module.css";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (html: string) => void;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`${styles.toolbarButton} ${active ? styles.toolbarButtonActive : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ label, value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();
    if (current !== value) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl ?? "https://");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  if (!editor) {
    return (
      <div className="admin-form-group">
        {label ? <label>{label}</label> : null}
        <div className={styles.editorShell}>Loading editor…</div>
      </div>
    );
  }

  return (
    <div className="admin-form-group">
      {label ? <label>{label}</label> : null}
      <div className={styles.editorShell}>
        <div className={styles.toolbar}>
          <ToolbarButton
            title="Bold"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={16} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton
            title="Italic"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={16} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton
            title="Bullet list"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={16} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton
            title="Numbered list"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={16} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton
            title="Add link"
            active={editor.isActive("link")}
            onClick={setLink}
          >
            <Link2 size={16} strokeWidth={2} />
          </ToolbarButton>
          <ToolbarButton
            title="Remove link"
            disabled={!editor.isActive("link")}
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            <Unlink size={16} strokeWidth={2} />
          </ToolbarButton>
        </div>
        <EditorContent editor={editor} className={styles.editorViewport} />
      </div>
    </div>
  );
}
