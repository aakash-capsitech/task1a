import {
  DetailsList,
  DetailsListLayoutMode,
  type IColumn,
  SelectionMode,
  TextField,
  Dropdown,
  type IDropdownOption,
  PrimaryButton,
  Spinner,
  Stack,
  type IDetailsRowProps,
  DetailsRow,
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const pageSize = 10;

const roleOptions: IDropdownOption[] = [
  { key: '', text: 'All Roles' },
  { key: 'Unknown', text: 'Unknown' },
  { key: 'Staff', text: 'Staff' },
  { key: 'Admin', text: 'Admin' },
  { key: 'Manager', text: 'Manager' },
];

const statusOptions: IDropdownOption[] = [
  { key: '', text: 'All Statuses' },
  { key: 'Unknown', text: 'Unknown' },
  { key: 'Active', text: 'Active' },
  { key: 'Deleted', text: 'Deleted' },
];

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleRestore = async (userId: string) => {
    try {
      await axios.put(`http://localhost:5153/api/users/${userId}/restore`);
      fetchUsers();
    } catch (err) {
      console.error('Restore failed', err);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5153/api/users/all', {
        params: {
          page,
          pageSize,
          search,
          role,
          status,
        },
      });

      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, role, status, page]);

  const columns: IColumn[] = [
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, isResizable: true },
    { key: 'email', name: 'Email', fieldName: 'email', minWidth: 150, isResizable: true },
    { key: 'phone', name: 'Phone', fieldName: 'phone', minWidth: 100, isResizable: true },
    { key: 'role', name: 'Role', fieldName: 'role', minWidth: 100, isResizable: true },
    { key: 'status', name: 'Status', fieldName: 'status', minWidth: 100, isResizable: true },
    {
      key: 'restore',
      name: 'Restore',
      minWidth: 100,
      onRender: (item: any) =>
        item.status === 'Deleted' ? (
          <PrimaryButton
            iconProps={{ iconName: 'Refresh' }}
            onClick={() => handleRestore(item.id)}
            styles={{
              root: {
                height: 24,
                minHeight: 24,
                paddingTop: 0,
                paddingBottom: 0,
                fontSize: 12,
                lineHeight: 1,
                backgroundColor: "white",
                color: "blue",
                border: "none",
                background: "none"
              },
            }}
          />
        ) : null,
    },

  ];

  const handleSearchChange = (_: any, newValue?: string) => {
    setPage(1);
    setSearch(newValue ?? '');
  };

  const handleRoleChange = (_: any, option?: IDropdownOption) => {
    setPage(1);
    setRole(option?.key.toString() || '');
  };

  const handleStatusChange = (_: any, option?: IDropdownOption) => {
    setPage(1);
    setStatus(option?.key.toString() || '');
  };

  const customRenderRow = (props?: IDetailsRowProps) => {
    if (!props) return null;

    return (
      <DetailsRow
        {...props}
        styles={{
        root: {
          minHeight: 28,
          paddingTop: 0,
          paddingBottom: 0,
        },
        cell: {
          display: 'flex',
          alignItems: 'center',
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
      />
    );
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <TextField 
        placeholder='Search'
        value={search} onChange={handleSearchChange} />
        <Dropdown
          options={roleOptions}
          selectedKey={role}
          onChange={handleRoleChange}
        />
        <Dropdown
          options={statusOptions}
          selectedKey={status}
          onChange={handleStatusChange}
        />
      </Stack>

      {loading ? (
        <Spinner label="Loading users..." />
      ) : (
        <DetailsList
          items={users}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          onRenderRow={customRenderRow}
          compact= {true} 
          styles={{
              root: {
                width: '100%',
                selectors: {
                  '.ms-DetailsHeader': { backgroundColor: '#f3f2f1', paddingTop: "0px", paddingBottom: "0px", border: "none" },
                  '.ms-DetailsHeader-cell': {
                    color: '#004578',
                    fontWeight: 600,
                    fontSize: '13px',
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
                  },
                },
              },
            }}
        />
      )}

      {totalPages > 1 && (
        <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 8 }} style={{ marginTop: 16 }}>
          <PrimaryButton
            text="Prev"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          />

          {[...Array(totalPages)].map((_, i) => (
            <PrimaryButton
              key={i}
              text={(i + 1).toString()}
              onClick={() => setPage(i + 1)}
              style={{ backgroundColor: page === i + 1 ? '#0078d4' : undefined }}
            />
          ))}

          <PrimaryButton
            text="Next"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default AllUsers;
