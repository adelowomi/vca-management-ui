import React from 'react';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const Dashboard = ({ children }): JSX.Element => {
  const [sidebar, setSidebar] = React.useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar showSidebar={showSidebar} sidebar={sidebar} />

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Navbar showSidebar={showSidebar} />
        <main
          className="flex-1 relative overflow-y-auto focus:outline-none"
          tabIndex={0}
        >
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
