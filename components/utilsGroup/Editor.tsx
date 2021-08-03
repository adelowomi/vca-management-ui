import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
export const DraftEditor = ({ onChange, value }) => {
  return (
    <>
      <Editor
        editorState={value}
        onEditorStateChange={onChange}
        wrapperClassName=" border border-gray-400 h-96 max-h-full"
        editorClassName="px-3 h-full max-h-72 overflow-auto"
        toolbarClassName=""
      />
    </>
  );
};
