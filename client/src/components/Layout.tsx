import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
        <Topbar />
        <div className="flex-grow-1 bg-light" style={{ overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;