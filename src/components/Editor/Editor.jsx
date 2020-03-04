import React from 'react';

const toolbarOptions = [
  [{ header: '1' }, { header: '2' }],
  [{ size: [] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'clean'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['link'],
];

const modules = {
  toolbar: toolbarOptions,
  clipboard: {
    matchVisual: false,
  },
};

export default function Editor({ input }) {
  if (typeof window !== 'undefined') {
    const ReactQuill = require('react-quill');

    return (
      <ReactQuill
        {...input}
        modules={modules}
        theme="snow"
        className={input.className}
        placeholder="Describe your event to the world..."
        onChange={(newValue, delta, source) => {
          if (source === 'user') {
            input.onChange(newValue);
          }
        }}
        onBlur={(range, source, quill) => {
          input.onBlur(quill.getHTML());
        }}
      />
    );
  } else {
    <textarea />;
  }
}
