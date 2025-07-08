import { useEffect, useState } from "react";
import SB from "./SB";
import UserProfilePanel from "./UserProfilePanel";
import axios from "axios";
import UserDetailsDemo from "./UserDetailDemo";

const MainUserUserTablePage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userConfigRoles, setUserConfigRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5153/api/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
        setUserConfigRoles(res.data.configRoles || []);
      } catch (err) {
        console.error("❌ Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Fixed Sidebar */}
      <div
        style={{
          width: 220,
          position: "fixed",
          height: "100vh",
          zIndex: 10,
          backgroundColor: "#fff",
        }}
      >
        <SB userConfigRoles={userConfigRoles} />
      </div>

      {/* Main Content shifted to the right of Sidebar */}
      <div
        style={{
          marginLeft: 210,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!selectedUserId ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 16 }}>
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
                <h1 style={{ marginLeft: "20px", marginTop: "20px" }}>Profile</h1>
                <UserDetailsDemo />
              </div>
              {isLoading && (
                <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
              )}
            </div>
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

export default MainUserUserTablePage;
