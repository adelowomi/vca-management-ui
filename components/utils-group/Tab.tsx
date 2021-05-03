import React from 'react';

const Tabs = ({ isSelected, children }) => {
  return isSelected ? <React.Fragment> {children}</React.Fragment> : null;
};

export default Tabs;
