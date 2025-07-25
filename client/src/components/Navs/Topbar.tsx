import {
  SearchBox,
  Stack,
  IconButton,
  Persona,
  PersonaSize,
  Callout,
  DirectionalHint,
  mergeStyleSets,
  PersonaPresence,
} from '@fluentui/react';
import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const classNames = mergeStyleSets({
  calloutContainer: {
    width: 270,
    padding: 12,
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  optionRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: 4,
    selectors: {
      ':hover': {
        backgroundColor: '#f3f2f1',
      },
    },
  },
  icon: {
    fontSize: 16,
    marginRight: 10,
    color: '#323130',
  },
  label: {
    fontSize: 14,
    color: '#323130',
  },
});

const Topbar = () => {
  const navigate = useNavigate();
  const [adminAccess, setAdminAccess] = useState(false);
  const [isCalloutVisible, setIsCalloutVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: 'User', role: 'Admin' });
  const personaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded: any = jwtDecode(token);
    setAdminAccess(decoded?.role === 'admin');
    setUserInfo({
      name: decoded?.email || 'User',
      role: decoded?.role || 'User',
    });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    toast.success('logged out');
    navigate('/login');
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#0078D4',
          color: 'white',
          padding: '5px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 500 }}>Acting Office - Dev</div>

        <div
          style={{
            display: 'flex',
            gap: '4rem',
          }}
        >
          <div style={{ flex: 1, maxWidth: 320, margin: 'auto 16px' }}>
            <SearchBox
              placeholder="Ctrl + K"
              styles={{
                root: {
                  width: '100%',
                  borderRadius: 4,
                  backgroundColor: 'white',
                },
                field: { fontSize: 14, padding: '4px 8px' },
                iconContainer: { color: '#605e5c' },
              }}
            />
          </div>

          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <IconButton
              iconProps={{ iconName: 'Waffle' }}
              title="Apps"
              styles={{ root: { color: 'white' } }}
            />
            <IconButton
              iconProps={{ iconName: 'News' }}
              title="Feed"
              styles={{ root: { color: 'white' } }}
            />
            <IconButton
              iconProps={{ iconName: 'ReadingMode' }}
              title="Bookmarks"
              styles={{ root: { color: 'white' } }}
            />
            <IconButton
              iconProps={{ iconName: 'Headset' }}
              title="Support"
              styles={{ root: { color: 'white' } }}
            />

            <div ref={personaRef}>
              <button
                onClick={() => setIsCalloutVisible((prev) => !prev)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                <Persona
                  text={userInfo.name}
                  size={PersonaSize.size40}
                  hidePersonaDetails
                  presence={PersonaPresence.online}
                  initialsColor={6}
                  styles={{
                    root: { background: 'transparent' },
                    primaryText: { color: 'white' },
                  }}
                />
              </button>
            </div>
          </Stack>
        </div>
      </div>

      {isCalloutVisible && (
        <Callout
          target={personaRef.current as Element}
          onDismiss={() => setIsCalloutVisible(false)}
          directionalHint={DirectionalHint.bottomRightEdge}
          gapSpace={8}
          isBeakVisible
          setInitialFocus
        >
          <div className={classNames.calloutContainer}>
            <Persona
              text={userInfo.name}
              secondaryText={userInfo.role}
              size={PersonaSize.size48}
              presence={PersonaPresence.online}
              styles={{
                root: { marginBottom: 12 },
                secondaryText: { color: '#605e5c' },
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                className={classNames.optionRow}
                onClick={() => {
                  // alert('Go to profile');
                  navigate('/profile');
                  setIsCalloutVisible(false);
                }}
              >
                <span
                  className={`ms-Icon ms-Icon--ContactInfo ${classNames.icon}`}
                />
                <span className={classNames.label}>Profile</span>
              </div>

              <div className={classNames.optionRow} onClick={handleSignOut}>
                <span
                  className={`ms-Icon ms-Icon--SignOut ${classNames.icon}`}
                />
                <span className={classNames.label}>Sign Out</span>
              </div>
            </div>
          </div>
        </Callout>
      )}
    </>
  );
};

export default Topbar;
