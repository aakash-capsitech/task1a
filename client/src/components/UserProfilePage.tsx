import { useEffect, useState } from "react";
import SB from "./SB";
import axios from "axios";

// Page components
import Addons from './TemplatePages/Addons';
import PracticeProfile from './TemplatePages/PracticeProfile';
import Automation from './TemplatePages/Automation';
import CallFlow from './TemplatePages/CallFlow';
import CannedEmails from './TemplatePages/CannedEmails';
import UserDetailsDemo from "./UserDetailDemo";

const UserProfilePage = ({active}:{active: string}) => {
  const [activeItem, setActiveItem] = useState(active);
  const [adminAccess, setAdminAccess] = useState(false);
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
        setAdminAccess(res.data.role === "admin");
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  const renderPageComponent = () => {
    switch (activeItem) {
      case "Profile":
        // return <Profile />;
        return <UserDetailsDemo />;
      case "Practice profile":
        return <PracticeProfile />;
      case "Automation":
        return <Automation />;
      case "Users":
        // return adminAccess ? <Users /> : <div>Access denied</div>;
      case "Call flow":
        return <CallFlow />;
      case "Addons":
        return <Addons />;
      case "Canned emails":
        return <CannedEmails />;
      default:
        return <div style={{ padding: "20px" }}>Select a section</div>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SB
        userConfigRoles={userConfigRoles}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div
        style={{
          flexGrow: 1,
          backgroundColor: "#f9f9f9",
          padding: "16px",
          overflow: "auto",
        }}
      >
        {renderPageComponent()}
      </div>
    </div>
  );
};

export default UserProfilePage;
