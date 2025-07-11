import Topbar from '../Navs/Topbar';
import Sidebar from '../Navs/Sidebar';
import SB from '../Navs/SB';
import React from 'react';

type PageLayoutProps = {
  children: React.ReactNode;
  activeItem: string;
};

const PageLayout = ({ children, activeItem }: PageLayoutProps) => {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />

      <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
        <Topbar />

        <div className="d-flex flex-grow-1 bg-light" style={{ overflow: 'hidden' }}>
          {/* Fixed SB */}
          <div
            style={{
              width: '220px',
              borderRight: '1px solid #e1e1e1',
              overflow: 'hidden',
              height: '100%',
              flexShrink: 0,
            }}
          >
            <SB
              userConfigRoles={[]}
              activeItem={activeItem}
              setActiveItem={() => {}}
            />
          </div>

          {/* Scrollable Main Content */}
          <div className="flex-grow-1 p-3" style={{ overflowY: 'auto', height: '100%' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
