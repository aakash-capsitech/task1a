import { useEffect, useState } from "react";
import { DetailsList, type IColumn, Icon, SelectionMode } from "@fluentui/react";
import CreateUserPanel from "./CreateUserPanel";
import axios from "axios";
import SB from "./SB";
import UserProfilePanel from "./UserProfilePanel";

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

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Fixed Sidebar */}
      <div style={{ width: 220, position: "fixed", height: "100vh", zIndex: 10, backgroundColor: "#fff" }}>
        <SB />
      </div>

      {/* Main Content shifted to the right of Sidebar */}
      <div style={{ marginLeft: 210, flex: 1, display: "flex", flexDirection: "column" }}>
        {!selectedUserId ? (
          <div>
            <UserTable onUserSelect={setSelectedUserId} onLoading={setIsLoading} />
            {isLoading && <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>}
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <UserProfilePanel userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
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
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      onLoading(true);
      const response = await axios.get("http://localhost:5153/api/users");
      setItems(response.data);
    } catch (err) {
      console.error("❌ Failed to fetch users", err);
      setItems([]); // Optional fallback
    } finally {
      onLoading(false); // ✅ Always reset loading
    }
  };

  // Fixed: Add proper dependency array to prevent infinite loop
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveUser = async (newUser: any) => {
  const name = `${newUser.firstName} ${newUser.lastName}`.trim();
  const email = newUser.email;
  const role = newUser.role;
  const phone = newUser.phone;
  const nationality = newUser.nationality;
  const address = newUser.address;
  const configRoles = newUser.configRoles || []; // assuming optional comma-separated or checkbox array

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
    await fetchUsers(); // Refresh user list
  } catch (err) {
    console.error("❌ Failed to save user", err);
  } finally {
    onLoading(false);
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
            textDecoration: "none",
            color: "#0078d4",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
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
      name: "Phone number",
      fieldName: "phone",
      minWidth: 100,
      maxWidth: 120,
    },
    {
      key: "team",
      name: "Team(s)",
      fieldName: "team",
      minWidth: 100,
      maxWidth: 160,
      isMultiline: true,
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
      onRender: () => (
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ cursor: "pointer" }}>🗑️</span>
          <span style={{ cursor: "pointer" }}>⚙️</span>
        </div>
      ),
    },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 16 }}>
      {/* Toolbar */}
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
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: "white" })}
            onClick={() => setPanelOpen(true)}
          >
            <span style={iconStyle}><Icon iconName="Add" /></span>User
          </button>

          <button
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: "white" })}
            onClick={() => fetchUsers()}
          >
            <span style={iconStyle}><Icon iconName="Refresh" /></span>Refresh
          </button>

          <button
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: "white" })}
          >
            <span style={iconStyle}>£</span>Unit rates
          </button>

          <button
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: "white" })}
          >
            <span style={iconStyle}><Icon iconName="Clock" /></span>Active days
          </button>

          <button
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: "white" })}
          >
            <span style={iconStyle}><Icon iconName="Money" /></span>Rate logs
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>Status =</span>
            <select style={{ height: "36px", fontSize: "14px", borderRadius: "4px", padding: "4px 8px" }}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <button className="outline-btn">Add filter</button>
        </div>

        {/* <UserRolesModal3 /> */}
      </div>

      {/* Table Container (scrollable) */}
      <div style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 0 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        <div style={{ flex: 1, overflow: "auto" }}>
          <DetailsList
            items={items}
            columns={columns}
            selectionMode={SelectionMode.none}
            compact={true}
            styles={{
              root: {
                width: "100%",
                overflowX: "auto",
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

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderTop: "1px solid #ddd",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Show</span>
            <select style={{ height: "32px", width: "70px", fontSize: "14px", borderRadius: "4px" }}>
              <option>15</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>items</span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button className="outline-btn">←</button>
            <button className="primary-btn">1</button>
            <button className="outline-btn">2</button>
            <button className="outline-btn">3</button>
            <button className="outline-btn">→</button>
          </div>

          <div style={{ fontSize: "14px" }}>
            <span>1 - 15 of 107</span>
          </div>
        </div>
      </div>

      <CreateUserPanel
        isOpen={isPanelOpen}
        onDismiss={() => setPanelOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default MainUserTablePage;