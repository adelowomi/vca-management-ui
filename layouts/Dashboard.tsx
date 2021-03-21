import React from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = ({ children }): JSX.Element => {
  const [sidebar, setSidebar] = React.useState(false);
  const [userMenu, setuserMenu] = React.useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const showUsermenu = () => {
    setuserMenu(!userMenu);
  };

  return (
    <>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
        {/* MOBILE SIDE BAR ENDS */}
        <Sidebar showSidebar={showSidebar} sidebar={sidebar} />
        {/* SIDEBAR ENDS DESKTOP */}

        {/* NAV BAR  */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <Navbar
            showSidebar={showSidebar}
            userMenu={userMenu}
            showUsermenu={showUsermenu}
          />
          <main
            className="flex-1 relative overflow-y-auto focus:outline-none"
            tabIndex={0}
          >
            <div className="py-6">
              {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div> */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  {children}
                  {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div> */}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
        {/* NAVBAR ENDS */}
      </div>
    </>
  );
};

export default Dashboard;
