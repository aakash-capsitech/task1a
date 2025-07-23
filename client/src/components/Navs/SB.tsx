import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SB = ({
  userConfigRoles,
  activeItem,
  setActiveItem,
}: {
  userConfigRoles: string[];
  activeItem: string;
  setActiveItem: (item: string) => void;
}) => {
  const [adminAccess, setAdminAccess] = useState(false);
  const [configs, setConfigs] = useState<any[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      setAdminAccess(false);
      return;
    }

    const decoded: any = jwtDecode(token);
    const role = decoded?.role;
    // console.log(role)
    // alert(role)
    if (role == 'Admin') {
      setAdminAccess(true);
    }
  }, []);

  useEffect(()=>{

    async function getConfigs() {
          const token: string | null = localStorage.getItem('token');
        if (!token) {
          setAdminAccess(false);
          return;
        }

        const decoded: any = jwtDecode(token);
            const id = decoded?.nameid;
        
        const response = await axios.get(`http://localhost:5153/api/users/${id}`)
        const configRoles = response.data.configRoles
        setConfigs(configRoles)

        console.log(configRoles)
    }

    getConfigs()
    
  },[])

  const sidebarItems = [
    {
      section: 'Your preferences',
      items: ['Profile'],
    },
    {
      section: 'Practice configuration',
      items: [
        // 'Practice profile',
        ...(adminAccess ? ['Login Rules'] : []),
        'Automation',
        ...(adminAccess ? ['Users'] : []),
        // 'Users',
        'Call flow',
        'Addons',
        'Canned emails',
        "All",
      ],
    },
    {
      section: 'Customisations',
      items: [
        {
          children: configs,
        },
      ],
    },
  ];

  return (
    <div
      style={{
        width: '220px',
        backgroundColor: '#fff',
        fontFamily: 'Segoe UI, sans-serif',
        fontSize: '14px',
        color: '#323130',
        padding: '8px 0',
        height: '100vh',
      }}
    >
      {sidebarItems.map((section, idx) => (
        <div key={idx} style={{ padding: '0 16px', marginBottom: '8px' }}>
          <div
            style={{
              fontWeight: 600,
              color: '#004578',
              fontSize: '13px',
              margin: '12px 0 6px',
            }}
          >
            {section.section}
          </div>

          {section.items.map((item: any, i: number) => {
            if (typeof item === 'string') {
              const isActive = activeItem === item;

              return (
                <div
                  key={i}
                  style={{
                    padding: '6px 8px',
                    borderRadius: '2px',
                    backgroundColor: isActive ? '#f3f2f1' : 'transparent',
                    fontWeight: isActive ? 600 : 'normal',
                    cursor: 'pointer',
                  }}
                >
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      width: '100%',
                      textAlign: 'left',
                      color: 'inherit',
                      fontWeight: 'inherit',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (item === 'Users') {
                        // Clear active item when navigating to admin
                        setActiveItem('');
                        navigate('/admin');
                      } else if (item == 'Profile') {
                        setActiveItem('');
                        navigate('/profile');
                      } else if (item == 'Automation') {
                        setActiveItem('');
                        navigate('/automation');
                      } else if (item == 'Call flow') {
                        setActiveItem('');
                        navigate('/callflow');
                      } else if (item == 'Addons') {
                        setActiveItem('');
                        navigate('/addons');
                      } else if (item == 'Canned emails') {
                        setActiveItem('');
                        navigate('/cannedemails');
                      } else if (item == 'All') {
                        setActiveItem('');
                        navigate('/all');
                      } else {
                        // Set active item first, then always navigate to home
                        setActiveItem('');
                        navigate('/loginrules');
                        // navigate("/")
                      }
                    }}
                    onMouseEnter={(e) => {
                      // Only apply hover effect if not active
                      if (!isActive) {
                        e.currentTarget.style.background = '#eee';
                      }
                    }}
                    onMouseLeave={(e) => {
                      // Reset to transparent (parent div handles active background)
                      e.currentTarget.style.background = 'none';
                    }}
                  >
                    {item}
                  </button>
                </div>
              );
            }

            if (item.children) {
              return (
                <div key={i}>
                  <div
                    style={{
                      padding: '6px 8px',
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ marginLeft: '16px' }}>
                    {item.children.map((child: string, j: number) => {
                      const isActive = activeItem === child;
                      return (
                        <div
                          key={j}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '2px',
                            cursor: 'pointer',
                            color: 'green',
                            fontWeight: isActive ? 'bold' : 'normal',
                            backgroundColor: isActive
                              ? '#f3f2f1'
                              : 'transparent',
                          }}
                          onClick={() => setActiveItem(child)}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = '#eee';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = isActive
                              ? '#f3f2f1'
                              : 'transparent';
                          }}
                        >
                          {child}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default SB;