// import { SearchBox } from '@fluentui/react/lib/SearchBox';

// const Topbar = () => {
//   return (
//     <div 
//       className="d-flex justify-content-between align-items-center bg-[#0078D4] border-bottom px-3" 
//       style={{ 
//         height: '60px',
//         minHeight: '60px',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//       }}
//     >
//       <h4 className="m-0">Users</h4>
//       <div style={{ width: '300px' }}>
//         <SearchBox 
//           placeholder="Search" 
//           underlined 
//           styles={{
//             root: { width: '100%' }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Topbar;



import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Stack, IconButton } from '@fluentui/react';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';

const Topbar = () => {
  return (
    <div
      style={{
        // height: 60,
        // minHeight: 60,
        backgroundColor: '#0078D4',
        color: 'white',
        padding: '5px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* Left: Title */}
      <div style={{ fontSize: 16, fontWeight: 500, whiteSpace: 'nowrap' }}>
        Acting Office - Dev
      </div>

      {/* Center: Search bar (collapses on small screens) */}
      <div
        style={{
          flex: 1,
          maxWidth: 320,
          margin: '0 16px',
        }}
      >
        <SearchBox
          placeholder="Ctrl + K"
          styles={{
            root: {
              width: '100%',
              borderRadius: 4,
              backgroundColor: 'white',
            },
            field: {
              fontSize: 14,
              padding: '4px 8px',
            },
            iconContainer: {
              color: '#605e5c',
            },
          }}
        />
      </div>

      {/* Right: Icons + Persona */}
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
        <IconButton iconProps={{ iconName: 'Waffle' }} title="Apps" styles={{ root: { color: 'white' } }} />
        <IconButton iconProps={{ iconName: 'News' }} title="Feed" styles={{ root: { color: 'white' } }} />
        <IconButton iconProps={{ iconName: 'ReadingMode' }} title="Bookmarks" styles={{ root: { color: 'white' } }} />
        <IconButton iconProps={{ iconName: 'Headset' }} title="Support" styles={{ root: { color: 'white' } }} />
        <Persona
          text="GM"
          size={PersonaSize.size32}
          hidePersonaDetails
          styles={{
            root: { background: 'transparent' },
            primaryText: { color: 'white' },
          }}
        />
      </Stack>
    </div>
  );
};

export default Topbar;
