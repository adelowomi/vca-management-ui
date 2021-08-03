import DOMPurify from 'dompurify';
import { convertToHTML as HTMLConverter } from 'draft-convert';

export const convertToHTML = (value) => {
  const currentContentAsHTML = HTMLConverter(value.getCurrentContent());
  return DOMPurify.sanitize(currentContentAsHTML);
};
