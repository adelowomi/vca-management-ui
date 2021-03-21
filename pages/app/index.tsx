import React from 'react';
import styled from 'styled-components';

import Dashboard from '../../layouts/Dashboard';

const Container = styled.div`
  display: flex;
`;
const index = () => {
  return (
    <Dashboard>
      <h1 className="text-lg text-black text-">Component Dashboard</h1>
    </Dashboard>
  );
};

export default index;
