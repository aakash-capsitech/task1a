// // import React from 'react'

// // const CannedEmails = () => {
// //   return (
// //     <div>CannedEmails</div>
// //   )
// // }

// // export default CannedEmails

// import { LoginRulesPage } from '../ListComponents/LoginRulesPage';
// import Topbar from '../Navs/Topbar';
// import Sidebar from '../Navs/Sidebar';
// import SB from '../Navs/SB';
// import UserDetailsDemo from '../CardComponenets/UserDetailDemo';

// const  CannedEmails = () => {
//   return (
//     <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
//       <Sidebar />

//       <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
//         <Topbar />

//         <div className="d-flex flex-grow-1 bg-light" style={{ overflow: 'hidden' }}>
//           {/* Fixed SB */}
//           <div
//             style={{
//               width: '220px', // adjust as needed
//               borderRight: '1px solid #e1e1e1',
//               overflow: 'hidden',
//               height: '100%',
//               flexShrink: 0,
//             }}
//           >
//             <SB
//               userConfigRoles={[]}
//               activeItem="Canned emails"
//               setActiveItem={() => {}}
//             />
//           </div>

//           {/* Scrollable Main Content */}
//           <div
//             className="flex-grow-1 p-3"
//             style={{ overflowY: 'auto', height: '100%' }}
//           >
//             {/* <LoginRulesPage /> */}
//             <h1> CannedEmails </h1>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default  CannedEmails;












import PageLayout from "../Navs/PageLayout";
const Addons = () => {
  return (
    <PageLayout activeItem="Canned emails">
      <h1>Canned Emails</h1>
    </PageLayout>
  );
};

export default Addons;
