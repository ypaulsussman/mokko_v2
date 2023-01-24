import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const buildClassName = (
    activeSignal,
    activeSignalOptions,
    overrides = []
  ) => {
    return `btn btn-square btn-sm mr-2 mb-2 ${
      editor.isActive(activeSignal, activeSignalOptions)
        ? "is-active"
        : "btn-outline"
    } ${overrides.join(" ")}`;
  };

  return (
    <>
      <div className="tooltip" data-tip="Bold">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={buildClassName("bold")}
        >
          bold
        </button>
      </div>
      <div className="tooltip" data-tip="Italic">
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={buildClassName("italic")}
        >
          italic
        </button>
      </div>
      <div className="tooltip" data-tip="Strikethrough">
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={buildClassName("strike")}
        >
          strike
        </button>
      </div>
      <div className="tooltip" data-tip="Monospace">
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={buildClassName("code")}
        >
          code
        </button>
      </div>
      <div className="tooltip" data-tip="Paragraph">
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={buildClassName("paragraph")}
        >
          para
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 1">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={buildClassName("heading", { level: 1 })}
        >
          h1
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 2">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buildClassName("heading", { level: 2 })}
        >
          h2
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 3">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={buildClassName("heading", { level: 3 })}
        >
          h3
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 4">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={buildClassName("heading", { level: 4 })}
        >
          h4
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 5">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={buildClassName("heading", { level: 5 })}
        >
          h5
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 6">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={buildClassName("heading", { level: 6 })}
        >
          h6
        </button>
      </div>
      <div className="tooltip" data-tip="Bullet List">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buildClassName("bulletList")}
        >
          ul
        </button>
      </div>
      <div className="tooltip" data-tip="Numbered List">
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buildClassName("orderedList")}
        >
          ol
        </button>
      </div>
      <div className="tooltip" data-tip="Code Block">
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={buildClassName("codeBlock")}
        >
          pre
        </button>
      </div>
      <div className="tooltip" data-tip="Blockquote">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buildClassName("blockquote")}
        >
          bq
        </button>
      </div>
      <div className="tooltip" data-tip="Horizontal Rule">
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="btn btn-square btn-sm mr-2 mb-2 btn-outline"
        >
          hr
        </button>
      </div>
      <div className="tooltip" data-tip="Line Break">
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="btn btn-square btn-sm mr-2 mb-2 btn-outline"
        >
          br
        </button>
      </div>
      <div className="tooltip" data-tip="Clear Formatting">
        <button
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
            editor.chain().focus().clearNodes().run();
          }}
          className="btn btn-square btn-sm mr-2 mb-2 btn-outline"
        >
          clear
        </button>
      </div>
      <div className="tooltip" data-tip="Undo">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={`btn btn-square btn-sm mr-2 mb-2 btn-outline ${
            !editor.can().chain().focus().undo().run() ? "btn-disabled" : ""
          }`}
        >
          undo
        </button>
      </div>
      <div className="tooltip" data-tip="Redo">
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={`btn btn-square btn-sm mr-2 mb-2 btn-outline ${
            !editor.can().chain().focus().redo().run() ? "btn-disabled" : ""
          }`}
        >
          redo
        </button>
      </div>
    </>
  );
};

function RichTextEditor({ currentText, handleContentUpdate }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: currentText ? currentText : "",
    onUpdate: ({ editor }) => {
      const newText = editor.getHTML();
      handleContentUpdate(newText);
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose" />
    </div>
  );
}

export default RichTextEditor;
