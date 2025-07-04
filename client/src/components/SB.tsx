// import { Icon } from '@fluentui/react/lib/Icon';
// import { useState } from 'react';

// const Sidebar = () => {

//     const [isIcon, setIsIcon] = useState(true);

//   return (
//     <div 
//       className="bg-light border-end d-flex flex-column p-3" 
//       style={{ 
//         width: '250px', 
//         minWidth: '250px',
//         height: '100vh',
//         overflow: 'auto'
//       }}
//     >
//       {/* <h5 className="mb-3">Acting Office</h5> */}
//       <div>
//         <button onClick={() => setIsIcon(prev => !prev)} style={{ border: 'none', background: 'transparent' }}>
//             <Icon iconName="GlobalNavButton" className="me-2" />
//         </button>
//       </div>
//       <hr />
//       <ul className="list-unstyled">
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="ViewDashboard" className="me-2" />
//           <strong>Dashboard</strong>
//         </li>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="Mail" className="me-2" />
//           {isIcon && <div>Emails</div>}
//         </li>

//         <p className="fw-bold mt-3">Operations</p>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="Suitcase" className="me-2" />
//           {isIcon && <div>Clients</div>}
//         </li>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="TaskManager" className="me-2" />
//           Tasks
//         </li>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="ContactCard" className="me-2" />
//           E-signatures
//         </li>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="Calendar" className="me-2" />
//           Deadlines
//         </li>

//         <p className="fw-bold mt-3">Sales</p>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="UserGauge" className="me-2" />
//           Leads
//         </li>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="TaskManagerMirrored" className="me-2" />
//           Quotes
//         </li>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="ChatInviteFriend" className="me-2" />
//           Chats
//         </li>

//         <p className="fw-bold mt-3">Timesheets</p>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="DateTime2" className="me-2" />
//           Timesheet
//         </li>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="FolderList" className="me-2" />
//           Documents
//         </li>
//         <li className="mb-3 d-flex align-items-center">
//           <Icon iconName="DateTime" className="me-2" />
//           Manual timesheet
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;





// import { Icon } from '@fluentui/react/lib/Icon';
// import { useState } from 'react';

// const SB = () => {
//   const [isIcon, setIsIcon] = useState(true);

//   const menuItems = [
//     { icon: 'ViewDashboard', label: 'Dashboard' },
//     { icon: 'Mail', label: 'Emails' },
//     { type: 'section', label: 'Operations' },
//     { icon: 'Suitcase', label: 'Clients' },
//     { icon: 'TaskManager', label: 'Tasks' },
//     { icon: 'ContactCard', label: 'E-signatures' },
//     { icon: 'Calendar', label: 'Deadlines' },
//     { type: 'section', label: 'Sales' },
//     { icon: 'UserGauge', label: 'Leads' },
//     { icon: 'TaskManagerMirrored', label: 'Quotes' },
//     { icon: 'ChatInviteFriend', label: 'Chats' },
//     { type: 'section', label: 'Timesheets' },
//     { icon: 'DateTime2', label: 'Timesheet' },
//     { icon: 'FolderList', label: 'Documents' },
//     { icon: 'DateTime', label: 'Manual timesheet' },
//   ];

//   return (
//     <div
//       className="bg-light border-end d-flex flex-column p-3"
//       style={{
//         width: isIcon ? '210px' : '60px',
//         minWidth: isIcon ? '210px' : '60px',
//         height: '100vh',
//         overflow: 'auto',
//         transition: 'width 0.2s ease',
//       }}
//     >
//       {/* Toggle Button */}
//       <div className="mb-3 d-flex justify-content-start">
//         <button
//           onClick={() => setIsIcon(prev => !prev)}
//           style={{
//             border: 'none',
//             background: 'transparent',
//             cursor: 'pointer',
//           }}
//           title={isIcon ? 'Collapse' : 'Expand'}
//         >
//           <Icon iconName="GlobalNavButton" />
//         </button>
//       </div>

//       <hr />

//       <ul className="list-unstyled" style={{ paddingLeft: 0, margin: 0 }}>
//         {menuItems.map((item, index) => {
//           if (item.type === 'section') {
//             return (
//                 <div key={index}>
//                     <hr />
//                 <p
//                     key={index}
//                     className="fw-bold mt-3 mb-2"
//                     style={{
//                     fontSize: isIcon ? '1rem' : 0,
//                     opacity: isIcon ? 1 : 0,
//                     transition: 'opacity 0.2s ease, font-size 0.2s ease',
//                     }}
//                 >
//                     {item.label}
//                 </p>
//               </div>
//             );
//           }

//           return (
//             <li
//               key={index}
//               className="mb-3 d-flex align-items-center"
//               style={{ gap: '0.5rem' }}
//             >
//               <Icon iconName={item.icon} className="me-2" />
//               {isIcon && <span>{item.label}</span>}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default SB;



// import { Icon } from '@fluentui/react/lib/Icon';
// import { useState } from 'react';

// const SB = () => {
//   const [isIcon, setIsIcon] = useState(true);

//   const menuItems = [
//     { icon: 'ViewDashboard', label: 'Dashboard' },
//     { icon: 'Mail', label: 'Emails' },
//     { type: 'section', label: 'Operations' },
//     { icon: 'Suitcase', label: 'Clients' },
//     { icon: 'TaskManager', label: 'Tasks' },
//     { icon: 'ContactCard', label: 'E-signatures' },
//     { icon: 'Calendar', label: 'Deadlines' },
//     { type: 'section', label: 'Sales' },
//     { icon: 'UserGauge', label: 'Leads' },
//     { icon: 'TaskManagerMirrored', label: 'Quotes' },
//     { icon: 'ChatInviteFriend', label: 'Chats' },
//     { type: 'section', label: 'Timesheets' },
//     { icon: 'DateTime2', label: 'Timesheet' },
//     { icon: 'FolderList', label: 'Documents' },
//     { icon: 'DateTime', label: 'Manual timesheet' },
//   ];

//   return (
//     <div
//       className="bg-light border-end d-flex flex-column"
//       style={{
//         width: isIcon ? '210px' : '60px',
//         minWidth: isIcon ? '210px' : '60px',
//         height: '100vh',
//         overflow: 'auto',
//         transition: 'width 0.2s ease',
//         padding: '16px 0 16px 0', // remove side padding
//       }}
//     >
//       {/* Toggle Button */}
//       <div className="mb-3" style={{ paddingLeft: isIcon ? '16px' : '8px' }}>
//         <button
//           onClick={() => setIsIcon(prev => !prev)}
//           style={{
//             border: 'none',
//             background: 'transparent',
//             cursor: 'pointer',
//           }}
//           title={isIcon ? 'Collapse' : 'Expand'}
//         >
//           <Icon iconName="GlobalNavButton" />
//         </button>
//       </div>

//       <hr />

//       <div style={{ paddingLeft: isIcon ? '16px' : '8px', paddingRight: isIcon ? '16px' : '8px' }}>
//         <ul className="list-unstyled" style={{ paddingLeft: 0, margin: 0 }}>
//           {menuItems.map((item, index) => {
//             if (item.type === 'section') {
//               return (
//                 <div key={index}>
//                   <hr />
//                   <p
//                     className="fw-bold mt-3 mb-2"
//                     style={{
//                       fontSize: isIcon ? '1rem' : 0,
//                       opacity: isIcon ? 1 : 0,
//                       transition: 'opacity 0.2s ease, font-size 0.2s ease',
//                     }}
//                   >
//                     {item.label}
//                   </p>
//                 </div>
//               );
//             }

//             return (
//               <li
//                 key={index}
//                 className="mb-3 d-flex align-items-center"
//                 style={{
//                   gap: '0.5rem',
//                   width: '100%',
//                 }}
//               >
//                 <Icon iconName={item.icon} className="me-2" />
//                 {isIcon && <span>{item.label}</span>}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SB;




const SB = () => {
  const sidebarItems = [
    {
      section: "Your preferences",
      items: ["Profile"],
    },
    {
      section: "Practice configuration",
      items: [
        "Practice profile",
        "Automation",
        { label: "Users", active: true },
        "Call flow",
        "Addons",
        "Canned emails",
        {
          label: "Customisations",
          children: [
            "Web chat",
            "Engagement letter",
            "E-signature",
            "Other letters",
            "Email templates",
            "Leads",
            "Data-link",
            "Services",
            "Tasks",
            "Client tags",
            "Notes",
            "Leaves",
            "DMS (alerts)",
            "Holidays",
          ],
        },
      ],
    },
  ];

  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#fff",
        fontFamily: "Segoe UI, sans-serif",
        fontSize: "14px",
        color: "#323130",
        padding: "8px 0",
      }}
    >
      {sidebarItems.map((section, idx) => (
        <div key={idx} style={{ padding: "0 16px", marginBottom: "8px" }}>
          <div
            style={{
              fontWeight: 600,
              color: "#004578",
              fontSize: "13px",
              margin: "12px 0 6px",
            }}
          >
            {section.section}
          </div>

          {section.items.map((item, i) => {
            if (typeof item === "string") {
              return (
                <div
                  key={i}
                  style={{
                    padding: "6px 8px",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </div>
              );
            }

            if (item.children) {
              return (
                <div key={i}>
                  <div
                    style={{
                      padding: "6px 8px",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ marginLeft: "16px" }}>
                    {item.children.map((child, j) => (
                      <div
                        key={j}
                        style={{
                          padding: "6px 8px",
                          borderRadius: "2px",
                          cursor: "pointer",
                        }}
                      >
                        {child}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={i}
                style={{
                  padding: "6px 8px",
                  borderRadius: "2px",
                  backgroundColor: item.active ? "#f3f2f1" : "transparent",
                  fontWeight: item.active ? 500 : "normal",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SB;
