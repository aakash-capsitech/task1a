// import { Icon } from '@fluentui/react';

// type UserToolbarButtonsProps = {
//   onAddUser: () => void;
//   onRefresh: () => void;
// };

// const buttonStyle: React.CSSProperties = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '6px',
//   padding: '6px 12px',
//   border: 'none',
//   background: 'white',
//   fontSize: '13px',
//   color: '#333',
//   cursor: 'pointer',
//   height: '32px',
//   transition: 'all 0.2s ease',
// };

// const buttonHoverStyle: React.CSSProperties = {
//   background: '#f3f2f1',
// };

// const iconStyle: React.CSSProperties = {
//   fontSize: '14px',
// };

// const UserToolbarButtons = ({ onAddUser, onRefresh }: UserToolbarButtonsProps) => {
//   return (
//     <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
//       <button
//         style={buttonStyle}
//         onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
//         onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: 'white' })}
//         onClick={onAddUser}
//       >
//         <span style={iconStyle}>
//           <Icon iconName="Add" />
//         </span>
//         User
//       </button>

//       <button
//         style={buttonStyle}
//         onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
//         onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: 'white' })}
//         onClick={onRefresh}
//       >
//         <span style={iconStyle}>
//           <Icon iconName="Refresh" />
//         </span>
//         Refresh
//       </button>

//       <button
//         style={buttonStyle}
//         onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
//         onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: 'white' })}
//       >
//         <span style={iconStyle}>£</span>
//         Unit rates
//       </button>

//       <button
//         style={buttonStyle}
//         onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
//         onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: 'white' })}
//       >
//         <span style={iconStyle}>
//           <Icon iconName="Clock" />
//         </span>
//         Active days
//       </button>

//       <button
//         style={buttonStyle}
//         onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
//         onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: 'white' })}
//       >
//         <span style={iconStyle}>
//           <Icon iconName="Money" />
//         </span>
//         Rate logs
//       </button>
//     </div>
//   );
// };

// export default UserToolbarButtons;
