/// <reference types="next" />
/// <reference types="next/types/global" />

// Add support for svg imports
declare module '*.svg' {
  const content: any;
  export default content;
}

// Add support for png imports
declare module '*.png' {
  const value: any;
  export default value;
}
