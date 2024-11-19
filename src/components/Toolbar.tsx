import { BlockNoteEditor } from "@blocknote/core";
import { Bold, Italic, Strikethrough } from 'lucide-react';

type Props = {
  editor: BlockNoteEditor;
};

export function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex p-4 gap-1.5">
      <button
        className="flex items-center justify-center cursor-pointer rounded-md h-8 w-8 bg-white text-gray-800 border-0 shadow-md hover:text-gray-900 hover:shadow-lg focus:outline-none focus:ring-2 active:shadow-sm"
        onClick={() => editor.toggleStyles({ bold: true })}
        data-active={editor.getActiveStyles().bold ? "is-active" : undefined}
        aria-label="bold"
      >
        <Bold />
      </button>
      <button
        className="flex items-center justify-center cursor-pointer rounded-md h-8 w-8 bg-white text-gray-800 border-0 shadow-md hover:text-gray-900 hover:shadow-lg focus:outline-none focus:ring-2 active:shadow-sm"
        onClick={() => editor.toggleStyles({ italic: true })}
        data-active={editor.getActiveStyles().italic ? "is-active" : undefined}
        aria-label="italic"
      >
        <Italic />
      </button>
      <button
        className="flex items-center justify-center cursor-pointer rounded-md h-8 w-8 bg-white text-gray-800 border-0 shadow-md hover:text-gray-900 hover:shadow-lg focus:outline-none focus:ring-2 active:shadow-sm"
        onClick={() => editor.toggleStyles({ strike: true })}
        data-active={editor.getActiveStyles().strike ? "is-active" : undefined}
        aria-label="strikethrough"
      >
        <Strikethrough />
      </button>
    </div>
  );
}
