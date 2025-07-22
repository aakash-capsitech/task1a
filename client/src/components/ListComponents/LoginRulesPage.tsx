// import {
//   Stack,
//   IconButton,
//   SearchBox,
//   DetailsList,
//   DetailsListLayoutMode,
//   type IColumn,
//   SelectionMode,
//   Text,
//   Panel,
//   Icon,
// } from '@fluentui/react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { AddLoginRulePanel } from '../Panels/AddLoginRulePanel';

// type LoginRule = {
//   id: string;
//   userEmails: string[];
//   restriction: 'Allow' | 'Deny';
//   fromDate?: string;
//   toDate?: string;
// };

// const buttonStyle = {
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

// const buttonHoverStyle = {
//   background: '#f3f2f1',
// };

// const iconStyle = {
//   fontSize: '14px',
// };


// export const LoginRulesPage = () => {
//   const [isPanelOpen, setIsPanelOpen] = useState(false);
//   const [rules, setRules] = useState<LoginRule[]>([]);
//   const [editingRule, setEditingRule] = useState<LoginRule | null>(null);
//   const [search, setSearch] = useState('');

//   const [history, setHistory] = useState<any[]>([]);
//   const [isHistoryOpen, setIsHistoryOpen] = useState(false);

//   const openHistory = async (id: string) => {
//     const res = await axios.get(`http://localhost:5153/api/loginrules/${id}/history`);
//     setHistory(res.data);
//     setIsHistoryOpen(true);
//   };


//   const fetchRules = async () => {
//     const response = await axios.get('http://localhost:5153/api/loginrules');
//     console.log(response.data)
//     setRules(response.data);
//   };

//   useEffect(() => {
//     fetchRules();
//   }, []);

//   const columns: IColumn[] = [
//     {
//       key: 'sno',
//       name: 'S.No.',
//       fieldName: 'id',
//       minWidth: 50,
//       maxWidth: 70,
//       onRender: (_, i) => i! + 1,
//     },
//     {
//       key: 'users',
//       name: 'Users',
//       minWidth: 200,
//       onRender: (item: LoginRule) => item.userEmails?.join(', ') || 'No users',
//     },
//     {
//       key: 'restriction',
//       name: 'Restriction',
//       fieldName: 'restriction',
//       minWidth: 100,
//     },
//     {
//       key: 'fromDate',
//       name: 'From',
//       minWidth: 130,
//       onRender: (item) =>
//         item.fromDate ? new Date(item.fromDate).toLocaleString() : '-',
//     },
//     {
//       key: 'toDate',
//       name: 'To',
//       minWidth: 130,
//       onRender: (item) =>
//         item.toDate ? new Date(item.toDate).toLocaleString() : '-',
//     },
//      {
//     key: 'actions',
//     name: 'Actions',
//     minWidth: 120,
//     onRender: (item: LoginRule) => (
//       <Stack horizontal tokens={{ childrenGap: 8 }}>
//         <IconButton
//           iconProps={{ iconName: 'Edit' }}
//           title="Edit"
//           onClick={() => {
//             setEditingRule(item);
//             setIsPanelOpen(true);
//           }}
//         />
//         <IconButton
//           iconProps={{ iconName: 'History' }}
//           title="View History"
//           onClick={() => openHistory(item.id)}
//         />
//       </Stack>
//     ),
//   },
//   ];

//   return (
//     <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 0 } }}>
//       <Stack horizontal horizontalAlign="space-between">
//         <button
//           style={buttonStyle}
//           onMouseEnter={(e) =>
//             Object.assign(e.currentTarget.style, buttonHoverStyle)
//           }
//           onMouseLeave={(e) =>
//             Object.assign(e.currentTarget.style, { background: 'white' })
//           }
//           onClick={() => {
//             setEditingRule(null);
//             setIsPanelOpen(true);
//           }}
//         >
//           <span style={iconStyle}>
//             <Icon iconName="Add" />
//           </span>
//           Add
//       </button>
//         <button
//           style={buttonStyle}
//           onMouseEnter={(e) =>
//             Object.assign(e.currentTarget.style, buttonHoverStyle)
//           }
//           onMouseLeave={(e) =>
//             Object.assign(e.currentTarget.style, { background: 'white' })
//           }
//           onClick={() => fetchRules()}
//         >
//           <span style={iconStyle}>
//             <Icon iconName="Refresh" />
//           </span>
//           Refresh
//         </button>
//         <SearchBox
//           placeholder="Search"
//           value={search}
//           onChange={(_, val) => setSearch(val || '')}
//         />
//       </Stack>

//       <DetailsList
//         items={rules.filter((r) =>
//           r.userEmails?.some((email) =>
//             email.toLowerCase().includes(search.toLowerCase())
//           )
//         )
//       }
//         columns={columns}
//         setKey="loginRulesList"
//         layoutMode={DetailsListLayoutMode.fixedColumns}
//         selectionMode={SelectionMode.none}
//       />

//       <Text variant="small">Showing {rules.length} rules</Text>

//       <AddLoginRulePanel
//         isOpen={isPanelOpen}
//         onDismiss={() => {
//           setIsPanelOpen(false);
//           setEditingRule(null);
//           fetchRules();
//         }}
//         existingRule={editingRule as any}
//       />


//       {isHistoryOpen && (
//       <Panel
//         isOpen
//         onDismiss={() => setIsHistoryOpen(false)}
//         headerText="Login Rule History"
//       >
//         {history.map((log, idx) => (
//           <Stack key={idx} styles={{ root: { marginBottom: 10 } }}>
//             <Text><strong>{log.action}</strong> - {new Date(log.timestamp).toLocaleString()}</Text>
//             <Text>{log.description}</Text>
//           </Stack>
//         ))}
//       </Panel>
//     )}
//     </Stack>
//   );
// };






























import {
  DetailsList,
  DetailsListLayoutMode,
  type IColumn,
  IconButton,
  Icon,
  Panel,
  SearchBox,
  SelectionMode,
  Text,
  PrimaryButton,
} from '@fluentui/react';
import { Stack } from '@fluentui/react/lib/Stack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddLoginRulePanel } from '../Panels/AddLoginRulePanel';

type LoginRule = {
  id: string;
  userEmail: string;
  restriction: 'Allow' | 'Deny';
  fromDate?: string;
  toDate?: string;
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '0px 6px',
  border: 'none',
  background: 'white',
  fontSize: '13px',
  color: '#333',
  cursor: 'pointer',
  height: '18px',
  transition: 'all 0.2s ease',
};

const buttonHoverStyle = {
  background: '#f3f2f1',
};

const iconStyle = {
  fontSize: '14px',
};

export const LoginRulesPage = () => {
  const [rules, setRules] = useState<LoginRule[]>([]);
  const [total, setTotal] = useState(0);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<LoginRule | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [history, setHistory] = useState<any[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const fetchRules = async () => {
    try {
      const res = await axios.get('http://localhost:5153/api/loginrules', {
        params: {
          page,
          pageSize,
          search: searchTerm || undefined,
        },
      });
      setRules(res.data.rules || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch rules', err);
    }
  };

  useEffect(() => {
    fetchRules();
  }, [page, pageSize, searchTerm]);

  const openHistory = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:5153/api/loginrules/${id}/history`);
      setHistory(res.data);
      setIsHistoryOpen(true);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const columns: IColumn[] = [
    {
      key: 'sno',
      name: 'S.No.',
      fieldName: 'id',
      minWidth: 50,
      maxWidth: 70,
      onRender: (_item, index) => (page - 1) * pageSize + index! + 1,
    },
    {
      key: 'users',
      name: 'Users',
      minWidth: 200,
      onRender: (item: LoginRule) => item.userEmail || 'No users',
    },
    {
      key: 'restriction',
      name: 'Restriction',
      fieldName: 'restriction',
      minWidth: 100,
    },
    {
      key: 'fromDate',
      name: 'From',
      minWidth: 130,
      onRender: (item) =>
        item.fromDate ? new Date(item.fromDate).toLocaleString() : '-',
    },
    {
      key: 'toDate',
      name: 'To',
      minWidth: 130,
      onRender: (item) =>
        item.toDate ? new Date(item.toDate).toLocaleString() : '-',
    },
    {
      key: 'actions',
      name: '',
      minWidth: 100,
      onRender: (item: LoginRule) => (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <IconButton
            iconProps={{ iconName: 'Edit' }}
            title="Edit"
            onClick={() => {
              setEditingRule(item);
              setIsPanelOpen(true);
            }}
          />
          <IconButton
            iconProps={{ iconName: 'History' }}
            title="View History"
            onClick={() => openHistory(item.id)}
          />
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: 'white' })}
            onClick={() => {
              setEditingRule(null);
              setIsPanelOpen(true);
            }}
          >
            <span style={iconStyle}><Icon iconName="Add" /></span>
            Add
          </button>

          <button
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: 'white' })}
            onClick={fetchRules}
          >
            <span style={iconStyle}><Icon iconName="Refresh" /></span>
            Refresh
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0px' }}>
          <SearchBox
            placeholder="Search users"
            value={searchInput}
            onChange={(e) => setSearchInput(e!.target.value)}
            styles={{ root: { width: 200 } }}
          />
          {/* <button
            style={{
              background: "blue"
            }}
            onClick={() => setSearchTerm(searchInput)}
          >
            <Icon iconName="Search" /> Apply
          </button> */}
          <PrimaryButton text='Apply' onClick={() => setSearchTerm(searchInput)} />
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          flex: 1,
          // marginTop: '12px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 0 8px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, overflow: 'auto' }}>
          <DetailsList
            items={rules}
            columns={columns}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selectionMode={SelectionMode.none}
            // styles={{
            //   root: {
            //     width: '100%',
            //     alignItems: "center",
            //     selectors: {
            //       '.ms-DetailsHeader': {
            //         backgroundColor: '#f3f2f1',
            //         paddingTop: '0px',
            //         paddingBottom: '0px',
            //         marginTop: '0px',
            //         border: 'none',
            //         minHeight: '0px',
            //       },
            //       '.ms-DetailsHeader-cell': {
            //         color: '#004578',
            //         fontWeight: 600,
            //         fontSize: '13px',
            //         // borderBottom: '1px solid #ccc',
            //       },
            //       '.ms-DetailsRow': {
            //         height: '24px !important',
            //         borderBottom: '0.5px solid #eee',
            //       },
            //       '.ms-DetailsRow-cell': {
            //         paddingTop: '4px',
            //         paddingBottom: '4px',
            //         fontSize: '13px',
            //         whiteSpace: 'normal',
            //         wordBreak: 'break-word',
            //         // margin:  "auto 0"
            //       },
            //     },
            //   },
            // }}
            styles={{
              root: {
                width: '100%',
                selectors: {
                  '.ms-DetailsHeader': { backgroundColor: '#f3f2f1', paddingTop: "0px", paddingBottom: "0px", border: "none" },
                  '.ms-DetailsHeader-cell': {
                    color: '#004578',
                    fontWeight: 600,
                    fontSize: '13px',
                    // borderBottom: '1px solid #ccc',
                    // paddingTop: '0 px !important'
                    
                  },
                  '.ms-DetailsRow': {
                    minHeight: '28px !important',
                    borderBottom: '0.5px solid #eee',
                    
                  },
                  '.ms-DetailsRow-cell': {
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    fontSize: '13px',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    display: "flex",
                    alignItems: "center"
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={buttonStyle}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={rules.length < pageSize}
          onClick={() => setPage(page + 1)}
          style={buttonStyle}
        >
          Next
        </button>
      </div>

      {/* Page size selector */}
      <div style={{ textAlign: 'center', marginTop: '4px' }}>
        Show{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            const newSize = parseInt(e.target.value, 10);
            setPageSize(newSize);
            setPage(1);
          }}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </select>{' '}
        rules | Showing {rules.length} of {total}
      </div>

      {/* Panel */}
      <AddLoginRulePanel
        isOpen={isPanelOpen}
        onDismiss={() => {
          setIsPanelOpen(false);
          setEditingRule(null);
          fetchRules();
        }}
        existingRule={editingRule as any}
      />

      {isHistoryOpen && (
        <Panel
          isOpen
          onDismiss={() => setIsHistoryOpen(false)}
          headerText="Login Rule History"
        >
          {history.map((log, idx) => (
            <Stack key={idx} styles={{ root: { marginBottom: 10 } }}>
              <Text style={{
                color: "blue"
              }}>
                <strong style={{
                  color: "red"
                }}>{log.action}</strong> - {new Date(log.timestamp).toLocaleString()}
              </Text>
              <Text style={{
                color: "yellowgreen"
              }}>{log.description}</Text>
            </Stack>
          ))}
        </Panel>
      )}
    </div>
  );
};
