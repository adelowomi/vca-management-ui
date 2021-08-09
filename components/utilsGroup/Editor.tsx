import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { convertToHTML } from 'draft-convert';
import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import React from 'react';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
export const DraftEditor = ({
  getContent,
  error,
  defaultValue,
}: {
  getContent: any;
  error?: any;
  defaultValue?: any;
}): JSX.Element => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(defaultValue || ''))
    )
  );
  const [, setConvertedContent] = React.useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    getContent(currentContentAsHTML);
    setConvertedContent(currentContentAsHTML);
  };

  return (
    <>
      <Editor
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName={`border ${
          error ? 'border-red-500' : 'border-gray-400'
        } h-96 max-h-full`}
        editorClassName="px-3 h-full max-h-72 overflow-auto"
        toolbarClassName=""
      />
    </>
  );
};
