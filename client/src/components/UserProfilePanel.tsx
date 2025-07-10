import {
  Persona,
  PersonaSize,
  Text,
  Stack,
} from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserRolesModal3 } from './UserRole/UserRolesModal3';

const tagStyle = {
  backgroundColor: '#dff6dd',
  color: '#107C10',
  fontSize: '13px',
  fontWeight: 500,
  padding: '4px 8px',
  borderRadius: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '6px',
};

const labelStyle = { fontSize: 12, color: '#555', marginTop: 12 };
const valueStyle = { fontSize: 13, fontWeight: 500 };

const UserProfilePanel = ({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:5153/api/users/${userId}`)
      .then((res) => {
        console.log("Full response:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
  }, [userId]);

  if (!user) return <Text>Loading...</Text>;

  const fullName = user.name?.toUpperCase();
  const role = user.role;
  const configs = user.configRoles || [];

  return (
    <div
      style={{
        width: 300,
        background: "#fff",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        position: "relative",
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          border: "none",
          background: "transparent",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ✖
      </button>

      <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }}>
        <Persona
          text={fullName}
          hidePersonaDetails
          size={PersonaSize.size56}
          initialsColor={6}
          styles={{ primaryText: { fontWeight: 600 } }}
        />
        <Text variant="mediumPlus" style={{ fontWeight: 600 }}>
          {fullName}
        </Text>
        <Text variant="small">{role}</Text>
      </Stack>

      <Stack tokens={{ childrenGap: 4 }} style={{ marginTop: 12 }} horizontalAlign="center">
        {configs.map((cfg: string, idx: number) => (
          <span key={idx} style={tagStyle}>
            <Icon iconName="CheckMark" styles={{ root: { fontSize: 12 } }} />
            {cfg}
          </span>
        ))}
      </Stack>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        <UserRolesModal3
          userId={user.id}
          userName={user.name}
          userEmail={user.email}
          primaryRole={user.role}
          configRoles={user.configRoles ?? []}
          phone={user.phone}
          nationality={user.nationality}
          address={user.address}
          onUpdate={() => {
            axios.get(`http://localhost:5153/api/users/${userId}`).then((res) => setUser(res.data));
          }}
        />
      </div>

      <hr style={{ margin: "16px 0", borderColor: "#eee" }} />

      <div>
        <div style={labelStyle}>Email</div>
        <div style={valueStyle}>
          {user.email?.toUpperCase() || "-"} <Icon iconName="Mail" style={{ fontSize: 12 }} />
        </div>

        <div style={labelStyle}>Phone</div>
        <div style={valueStyle}>{user.phone || "-"}</div>

        <div style={labelStyle}>Nationality</div>
        <div style={valueStyle}>{user.nationality || "-"}</div>

        <div style={labelStyle}>Address</div>
        <div style={valueStyle}>{user.address || "-"}</div>
      </div>
    </div>
  );
};

export default UserProfilePanel;
