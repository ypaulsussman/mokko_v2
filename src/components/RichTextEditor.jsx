import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faParagraph,
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  faList,
  faListOl,
  faTerminal,
  faQuoteLeft,
  faGripLines,
  faFileLines,
  faTextSlash,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

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
          aria-label="bold"
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
      </div>
      <div className="tooltip" data-tip="Italic">
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={buildClassName("italic")}
          aria-label="italic"
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
      </div>
      <div className="tooltip" data-tip="Strikethrough">
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={buildClassName("strike")}
          aria-label="strikethrough"
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
      </div>
      <div className="tooltip" data-tip="Monospace">
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={buildClassName("code")}
          aria-label="Monospace"
        >
          <FontAwesomeIcon icon={faCode} />
        </button>
      </div>
      <div className="tooltip" data-tip="Paragraph">
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={buildClassName("paragraph")}
          aria-label="Paragraph"
        >
          <FontAwesomeIcon icon={faParagraph} />
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 1">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={buildClassName("heading", { level: 1 })}
          aria-label="Heading 1"
        >
          <FontAwesomeIcon icon={fa1} />
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 2">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buildClassName("heading", { level: 2 })}
          aria-label="Heading 2"
        >
          <FontAwesomeIcon icon={fa2} />
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 3">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={buildClassName("heading", { level: 3 })}
          aria-label="Heading 3"
        >
          <FontAwesomeIcon icon={fa3} />
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 4">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={buildClassName("heading", { level: 4 })}
          aria-label="Heading 4"
        >
          <FontAwesomeIcon icon={fa4} />
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 5">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={buildClassName("heading", { level: 5 })}
          aria-label="Heading 5"
        >
          <FontAwesomeIcon icon={fa5} />
        </button>
      </div>
      <div className="tooltip" data-tip="Heading 6">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={buildClassName("heading", { level: 6 })}
          aria-label="Heading 6"
        >
          <FontAwesomeIcon icon={fa6} />
        </button>
      </div>
      <div className="tooltip" data-tip="Bullet List">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buildClassName("bulletList")}
          aria-label="Bullet List"
        >
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>
      <div className="tooltip" data-tip="Numbered List">
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buildClassName("orderedList")}
          aria-label="Numbered List"
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
      </div>
      <div className="tooltip" data-tip="Code Block">
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={buildClassName("codeBlock")}
          aria-label="Code Block"
        >
          <FontAwesomeIcon icon={faTerminal} />
        </button>
      </div>
      <div className="tooltip" data-tip="Blockquote">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buildClassName("blockquote")}
          aria-label="Blockquote"
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
        </button>
      </div>
      <div className="tooltip" data-tip="Horizontal Rule">
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="btn btn-square btn-sm mr-2 mb-2 btn-outline"
          aria-label="Horizontal Rule"
        >
          <FontAwesomeIcon icon={faGripLines} />
        </button>
      </div>
      <div className="tooltip" data-tip="Line Break">
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="btn btn-square btn-sm mr-2 mb-2 btn-outline"
          aria-label="Line Break"
        >
          <FontAwesomeIcon icon={faFileLines} />
        </button>
      </div>
      <div className="tooltip" data-tip="Clear Formatting">
        <button
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
            editor.chain().focus().clearNodes().run();
          }}
          className="btn btn-square btn-sm mr-2 mb-2 btn-outline"
          aria-label="Clear Formatting"
        >
          <FontAwesomeIcon icon={faTextSlash} />
        </button>
      </div>
      <div className="tooltip" data-tip="Undo">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={`btn btn-square btn-sm mr-2 mb-2 btn-outline ${
            !editor.can().chain().focus().undo().run() ? "btn-disabled" : ""
          }`}
          aria-label="Undo"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      </div>
      <div className="tooltip" data-tip="Redo">
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={`btn btn-square btn-sm mr-2 mb-2 btn-outline ${
            !editor.can().chain().focus().redo().run() ? "btn-disabled" : ""
          }`}
          aria-label="Redo"
        >
          <FontAwesomeIcon icon={faRotateRight} />
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
