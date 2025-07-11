// import Topbar from '../Navs/Topbar';
// import Sidebar from '../Navs/Sidebar';
// import SB from '../Navs/SB';



// const Addons = () => {
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
//               activeItem="Addons"
//               setActiveItem={() => {}}
//             />
//           </div>

//           {/* Scrollable Main Content */}
//           <div
//             className="flex-grow-1 p-3"
//             style={{ overflowY: 'auto', height: '100%' }}
//           >
//             {/* <LoginRulesPage /> */}
//             <h1>Addons</h1>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Addons;



// import PageLayout from '../Layouts/PageLayout';





import PageLayout from "../Navs/PageLayout";
const Addons = () => {
  return (
    <PageLayout activeItem="Addons">
      <h1>Addons</h1>
    </PageLayout>
  );
};

export default Addons;
