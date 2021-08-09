import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export const RichEditor = ({ content }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(content, EditorState.getDecorator(<p></p>))
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div className="App">
      <header className="App-header">Rich Text Editor Example</header>
      <Editor
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </div>
  );
};
