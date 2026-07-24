'use client';

import React, { useEffect, useRef } from 'react';

interface CmsRichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CmsRichEditor: React.FC<CmsRichEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write content here...'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (cmd: string, arg?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(cmd, false, arg);
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertHtml = (html: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('insertHTML', false, html);
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="space-y-3">
      {/* Rich Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-950 border border-gray-850 rounded-xl text-xs select-none">
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('bold'); }}
          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-850 text-gray-200 rounded font-bold text-xs cursor-pointer transition-all active:scale-95 border border-gray-800"
          title="Bold text"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('italic'); }}
          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-850 text-gray-200 rounded italic text-xs cursor-pointer transition-all active:scale-95 border border-gray-800"
          title="Italic text"
        >
          I
        </button>

        <div className="w-[1px] h-5 bg-gray-850 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('formatBlock', '<h1>'); }}
          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-850 text-gray-200 rounded font-extrabold text-xs cursor-pointer transition-all active:scale-95 border border-gray-800"
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('formatBlock', '<h2>'); }}
          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-850 text-gray-200 rounded font-bold text-xs cursor-pointer transition-all active:scale-95 border border-gray-800"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('formatBlock', '<p>'); }}
          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-850 text-gray-200 rounded text-xs cursor-pointer transition-all active:scale-95 border border-gray-800"
          title="Paragraph"
        >
          Paragraph
        </button>

        <div className="w-[1px] h-5 bg-gray-850 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('insertUnorderedList'); }}
          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-850 text-gray-200 rounded text-xs cursor-pointer transition-all active:scale-95 border border-gray-800"
          title="Bullet List"
        >
          Bullet List
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            insertHtml('<div class="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl my-4 text-amber-300 font-medium"><p>Important Notice / Highlight text goes here...</p></div><p><br></p>');
          }}
          className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 rounded text-xs font-bold cursor-pointer transition-all active:scale-95"
          title="Callout Box"
        >
          Callout Box
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            insertHtml('<hr class="my-6 border-gray-850" /><p><br></p>');
          }}
          className="px-3 py-1.5 bg-gray-900 hover:bg-gray-850 text-gray-400 rounded text-xs cursor-pointer transition-all active:scale-95 border border-gray-800"
          title="Horizontal Line"
        >
          Divider
        </button>
      </div>

      {/* Real-time Editable Rich Canvas */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        className="w-full min-h-[350px] p-5 text-sm text-gray-100 bg-gray-950 border border-gray-850 rounded-2xl focus:border-primary focus:outline-none transition-all leading-relaxed prose prose-invert max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-600 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-white [&_h1]:mb-3 [&_h1]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-2 [&_h2]:mt-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-3 [&_li]:mb-1 [&_strong]:text-white [&_strong]:font-bold [&_em]:italic [&_hr]:border-gray-850 [&_hr]:my-6"
      />
    </div>
  );
};
