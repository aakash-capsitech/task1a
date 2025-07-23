import Topbar from './Topbar';
import Sidebar from './Sidebar';
import React from 'react';
import BreadcrumbBar from './BreadcrumbBar';

type PageLayoutProps = {
  children: React.ReactNode;
  activeItem: string;
};

const DashboardLayout = ({ children, activeItem }: PageLayoutProps) => {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />

      <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
        <Topbar />
        <BreadcrumbBar activeItem={activeItem} />


        <div
          className="d-flex flex-grow-1 bg-light"
          style={{ overflow: 'hidden' }}
        >
          <div
            className="flex-grow-1"
            style={{ overflowY: 'auto', height: '100%' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;