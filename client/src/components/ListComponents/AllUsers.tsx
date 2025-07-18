// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const AllUsers = () => {
//     const [users, setUsers] = useState<any[]>([]);

//     useEffect(() => {
//         async function getAllUsers() {
//             try {
//                 const response = await axios.get("http://localhost:5153/api/users/all");
//                 setUsers(response.data);
//                 console.log("response", response);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         }

//         getAllUsers();
//     }, []);

//     return (
//         <div>
//             <h1>All Users</h1>
//             {users.map((user, index) => (
//                 <div key={index} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
//                     <p><strong>ID:</strong> {user.id}</p>
//                     <p><strong>Name:</strong> {user.name}</p>
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <p><strong>Phone:</strong> {user.phone}</p>
//                     <p><strong>Nationality:</strong> {user.nationality}</p>
//                     <p><strong>Address:</strong> {user.address}</p>
//                     <p><strong>Role:</strong> {user.role}</p>
//                     <p><strong>Status:</strong> {user.status}</p>
//                     <p><strong>Logins:</strong> {user.logins}</p>
//                     <p><strong>Password Hash:</strong> {user.passwordHash}</p>
//                     <p><strong>Config Roles:</strong> {user.configRoles?.join(', ') || 'None'}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AllUsers;
























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
  Stack
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
    fetchUsers(); // reload list after restore
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
        <PrimaryButton text="Restore" onClick={() => handleRestore(item.id)} />
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

  const handlePageChange = (_: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <h2>Users</h2>

      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <TextField label="Search" value={search} onChange={handleSearchChange} />
        <Dropdown
          label="Role"
          options={roleOptions}
          selectedKey={role}
          onChange={handleRoleChange}
        />
        <Dropdown
          label="Status"
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
