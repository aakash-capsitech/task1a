import { useEffect, useState } from "react";
import {
  DetailsList,
  type IColumn,
  Icon,
  PrimaryButton,
  SearchBox,
  SelectionMode,
} from "@fluentui/react";
import CreateUserPanel from "./CreateUserPanel";
import axios from "axios";
import SB from "./SB";
import UserProfilePanel from "./UserProfilePanel";
import EditUserPanel from "./EditUserPanel";
import { Dropdown, type IDropdownOption } from "@fluentui/react/lib/Dropdown";

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px",
  border: "none",
  background: "white",
  fontSize: "13px",
  color: "#333",
  cursor: "pointer",
  height: "32px",
  transition: "all 0.2s ease",
};

const buttonHoverStyle = {
  background: "#f3f2f1",
};

const iconStyle = {
  fontSize: "14px",
};

const MainUserTablePage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("Users"); // Add this line

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: 220,
          position: "fixed",
          height: "100vh",
          zIndex: 10,
          backgroundColor: "#fff",
        }}
      >
        <SB
          userConfigRoles={[]}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>

      <div
        style={{
          marginLeft: 210,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!selectedUserId ? (
          <div>
            <UserTable
              onUserSelect={setSelectedUserId}
              onLoading={setIsLoading}
            />
            {isLoading && (
              <div style={{ textAlign: "center", padding: "20px" }}>
                Loading...
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UserProfilePanel
              userId={selectedUserId}
              onClose={() => setSelectedUserId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

type Props = {
  onUserSelect: (userId: string) => void;
  onLoading: (loadState: boolean) => void;
};

const UserTable = ({ onUserSelect, onLoading }: Props) => {
  const [isCreateUserPanelOpen, setIsCreateUserPanelOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState<any | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // const [selectedNationality, setSelectedNationality] = useState<string | null>(
  //   null
  // );

  const [tempInput, setTempInput] = useState("");

  const filterOptions: IDropdownOption[] = [{ key: "role", text: "Roles" }];

  const roleOptions: IDropdownOption[] = [
    { key: "staff", text: "Staff" },
    { key: "manager", text: "Manager" },
    { key: "admin", text: "Admin" },
  ];

  const fetchUsers = async () => {
    try {
      onLoading(true);
      const response = await axios.get("http://localhost:5153/api/users", {
        params: {
          page,
          pageSize,
          search: searchTerm,
          role: selectedRole || undefined,
        },
      });
      setItems(response.data.users || []);
      setTotalUsers(response.data.total || 0);
    } catch (err) {
      console.error("❌ Failed to fetch users", err);
      setItems([]);
    } finally {
      onLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm, pageSize, selectedRole]);

  const handleSaveUser = async (newUser: any) => {
    const name = `${newUser.firstName} ${newUser.lastName}`.trim();
    const {
      email,
      role,
      phone,
      nationality,
      address,
      configRoles = [],
    } = newUser;

    try {
      onLoading(true);
      await axios.post("http://localhost:5153/api/users", {
        name,
        email,
        role,
        phone,
        nationality,
        address,
        configRoles,
      });
      await fetchUsers();
    } catch (err) {
      console.error("❌ Failed to save user", err);
    } finally {
      onLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:5153/api/users/${userId}`);
      await fetchUsers();
    } catch (err) {
      console.error("❌ Failed to delete user", err);
    }
  };

  const columns: IColumn[] = [
    {
      key: "sno",
      name: "S.No.",
      fieldName: "sno",
      minWidth: 40,
      maxWidth: 50,
      onRender: (_item, index) => <span>{index! + 1}</span>,
    },
    {
      key: "name",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => (
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "#0078d4",
            fontWeight: 500,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          onClick={() => onUserSelect(item.id)}
        >
          {item.name}
        </button>
      ),
    },
    {
      key: "email",
      name: "Email",
      fieldName: "email",
      minWidth: 160,
      maxWidth: 220,
      isMultiline: true,
    },
    {
      key: "phone",
      name: "Phone",
      fieldName: "phone",
      minWidth: 100,
      maxWidth: 120,
    },
    {
      key: "nationality",
      name: "Nationality",
      fieldName: "nationality",
      minWidth: 100,
      maxWidth: 160,
    },
    {
      key: "role",
      name: "Role",
      fieldName: "role",
      minWidth: 120,
      maxWidth: 200,
      isMultiline: true,
    },
    {
      key: "actions",
      name: "",
      minWidth: 40,
      maxWidth: 50,
      onRender: (item) => (
        <div style={{ display: "flex", gap: "6px" }}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteUser(item.id)}
          >
            <Icon
              iconName={"Delete"}
              className="me-2"
              style={{ color: "red" }}
            />
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedEditUser(item);
              setIsEditOpen(true);
            }}
          >
            <Icon
              iconName={"Edit"}
              className="me-2"
              style={{ color: "blue" }}
            />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{ flex: 1, display: "flex", flexDirection: "column", padding: 16 }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "white",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            style={buttonStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { background: "white" })
            }
            onClick={() => setIsCreateUserPanelOpen(true)}
          >
            <span style={iconStyle}>
              <Icon iconName="Add" />
            </span>
            User
          </button>

          <button
            style={buttonStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { background: "white" })
            }
            onClick={() => fetchUsers()}
          >
            <span style={iconStyle}>
              <Icon iconName="Refresh" />
            </span>
            Refresh
          </button>

          <button style={buttonStyle}>
            <span style={iconStyle}>£</span>Unit rates
          </button>
          <button style={buttonStyle}>
            <span style={iconStyle}>
              <Icon iconName="Clock" />
            </span>
            Active days
          </button>
          <button style={buttonStyle}>
            <span style={iconStyle}>
              <Icon iconName="Money" />
            </span>
            Rate logs
          </button>
        </div>

        <SearchBox
          placeholder="Search by name, email, phone"
          value={searchTerm}
          onChange={(_, newValue) => {
            setSearchTerm(newValue || "");
            setPage(1);
          }}
          styles={{ root: { width: 200 } }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative",
          }}
        >
          {/* Filter Chip */}
          {selectedRole && (
            <span
              style={{
                backgroundColor: "#f3f2f1",
                borderRadius: "12px",
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "13px",
              }}
            >
              Role = <strong>{selectedRole}</strong>
              <Icon
                iconName="Cancel"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedRole(null);
                  setPage(1);
                }}
              />
            </span>
          )}

          {/* Add Filter Button */}
          <button
            style={{
              ...buttonStyle,
              border: "1px solid #ccc",
              background: "#f3f2f1",
            }}
            onClick={() => setFilterPanelVisible((prev) => !prev)}
          >
            <Icon iconName="Filter" /> Add filter
          </button>

          {/* Filter Dropdown Panel */}
          {filterPanelVisible && (
            <div
              style={{
                position: "absolute",
                top: "36px",
                right: 0,
                background: "#fff",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                width: "220px",
                zIndex: 1000,
                boxShadow: "0 0 4px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: "6px" }}>
                Add filter
              </div>
              <span style={{ fontSize: "12px", color: "#666" }}>
                Criteria *
              </span>
              <Dropdown
                placeholder="Select"
                options={filterOptions}
                onChange={(_, option) =>
                  setSelectedFilter(option?.key as string)
                }
              />

              {selectedFilter === "role" && (
                <Dropdown
                  placeholder="Select role"
                  options={roleOptions}
                  onChange={(_, option) => {
                    setTempInput(option?.key as string);
                  }}
                />
              )}

              <PrimaryButton
                style={{ marginTop: "10px" }}
                text="Apply Filter"
                onClick={() => {
                  setSelectedRole(tempInput || null);
                  setFilterPanelVisible(false);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1, overflow: "auto" }}>
          <DetailsList
            items={items}
            columns={columns}
            selectionMode={SelectionMode.none}
            compact={true}
            styles={{
              root: {
                width: "100%",
                selectors: {
                  ".ms-DetailsHeader": { backgroundColor: "#f3f2f1" },
                  ".ms-DetailsHeader-cell": {
                    color: "#004578",
                    fontWeight: 600,
                    fontSize: "13px",
                    borderBottom: "1px solid #ccc",
                  },
                  ".ms-DetailsRow": {
                    minHeight: "28px !important",
                    borderBottom: "0.5px solid #eee",
                  },
                  ".ms-DetailsRow-cell": {
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    fontSize: "13px",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {selectedEditUser && (
        <EditUserPanel
          isOpen={isEditOpen}
          initialData={{
            username: selectedEditUser.name,
            email: selectedEditUser.email,
            phone: selectedEditUser.phone,
            role: selectedEditUser.role,
            address: selectedEditUser.address,
            configs: selectedEditUser.configRoles,
            nationality: selectedEditUser.nationality,
          }}
          onDismiss={() => setIsEditOpen(false)}
          onSave={async (updatedData) => {
            try {
              await axios.put(
                `http://localhost:5153/api/users/${selectedEditUser.id}`,
                {
                  name: updatedData.username,
                  email: updatedData.email,
                  phone: updatedData.phone,
                  role: updatedData.role,
                  address: updatedData.address,
                  nationality: updatedData.nationality,
                  configRoles: updatedData.configs,
                }
              );
              await fetchUsers();
              setIsEditOpen(false);
            } catch (err) {
              console.error("❌ Failed to update user", err);
            }
          }}
        />
      )}

      <CreateUserPanel
        isOpen={isCreateUserPanelOpen}
        onDismiss={() => setIsCreateUserPanelOpen(false)}
        onSave={handleSaveUser}
      />

      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={buttonStyle}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={!items || items.length < pageSize}
          onClick={() => setPage(page + 1)}
          style={buttonStyle}
        >
          Next
        </button>
      </div>

      <div style={{ textAlign: "center", padding: "8px" }}>
        Showing {items.length} of {totalUsers} users
      </div>
      <div>
        <div>
          Show{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              const newSize = parseInt(e.target.value, 10);
              setPageSize(newSize);
              setPage(1); // optionally reset to page 1
            }}
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>{" "}
          users
        </div>
      </div>
    </div>
  );
};

export default MainUserTablePage;
