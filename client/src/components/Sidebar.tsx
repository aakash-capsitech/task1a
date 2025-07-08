import { Icon } from '@fluentui/react/lib/Icon';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [isIcon, setIsIcon] = useState(() => window.innerWidth > 1360);

  useEffect(() => {
    const handleResize = () => {
      setIsIcon(window.innerWidth > 1360);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: 'ViewDashboard', label: 'Dashboard' },
    { icon: 'Mail', label: 'Emails', beta: 'beta' },
    { type: 'section', label: 'Operations' },
    { icon: 'Suitcase', label: 'Clients' },
    { icon: 'TaskManager', label: 'Tasks' },
    { icon: 'ContactCard', label: 'E-signatures' },
    { icon: 'Calendar', label: 'Deadlines' },
    { type: 'section', label: 'Sales' },
    { icon: 'UserGauge', label: 'Leads' },
    { icon: 'TaskManagerMirrored', label: 'Quotes' },
    { icon: 'News', label: 'Letters' },
    { icon: 'ChatInviteFriend', label: 'Chats' },
    { type: 'section', label: 'Premium' },
    { icon: 'DateTime2', label: 'Timesheet', beta: 'beta' },
    { icon: 'FolderList', label: 'Documents' },
    { icon: 'Bank', label: 'Accabot Chat', beta: 'beta' },
    { type: 'section', label: 'Marketing' },
    { icon: 'UserEvent', label: 'Lead Sources' },
    { type: 'section', label: 'Reports' },
    { icon: 'DateTime', label: 'Manual timesheet' },
    { icon: 'Teamwork', label: 'Teams' },
    { icon: 'ReportDocument', label: 'Reports' },
    { icon: 'Share', label: 'Resources' },
  ];

  return (
    <div
      className="bg-[#FFFFFF] border-end d-flex flex-column"
      style={{
        width: isIcon ? '210px' : '60px',
        minWidth: isIcon ? '210px' : '60px',
        height: '100vh',
        overflow: 'hidden',
        transition: 'width 0.2s ease',
      }}
    >
      {/* Toggle Button */}
      <div className="mb-3 d-flex justify-content-start ml-1">
        <button
          onClick={() => setIsIcon(prev => !prev)}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            paddingLeft: '16px',
            paddingTop: '10px',
          }}
          title={isIcon ? 'Collapse' : 'Expand'}
        >
          <Icon iconName="GlobalNavButton" />
        </button>
      </div>

      <ul className="list-unstyled">
        {menuItems.map((item, index) => {
          if (item.type === 'section') {
            return (
              <div key={`section-${index}`}>
                <hr style={{ color: 'gray', width: '100vw', marginLeft: '-20px' }} />
                <p
                  className="fw-bold mt-3 mb-2"
                  style={{
                    paddingLeft: '16px',
                    fontSize: isIcon ? '1rem' : 0,
                    opacity: isIcon ? 1 : 0,
                    transition: 'opacity 0.2s ease, font-size 0.2s ease',
                  }}
                >
                  {item.label}
                </p>
              </div>
            );
          }

          return (
            <button
              key={`menu-${index}`}
              style={{
                all: 'unset',
                cursor: 'pointer',
                display: 'block',
                width: '100%',
                paddingLeft: '16px',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#eee')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <li className="mb-2 d-flex align-items-center justify-content-between w-100">
                <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
                  <Icon iconName={item.icon} className="me-2" />
                  {isIcon && <span>{item.label}</span>}
                </div>
                {isIcon && item.beta && (
                  <span
                    className="badge text-light px-2 py-1"
                    style={{
                      fontSize: '0.7rem',
                      backgroundColor: '#C6B1DE',
                      borderRadius: '2px',
                      marginRight: '22px',
                    }}
                  >
                    {item.beta}
                  </span>
                )}
              </li>

            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
