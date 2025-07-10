import { useEffect, useState } from 'react';
import {
  Stack,
  Text,
  Icon,
  Separator,
  TooltipHost,
  FontWeights,
  DefaultButton,
} from '@fluentui/react';
// import EditUserModal from './EditUserPanel'; // 💡 Separate modal for reuse
import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
import ChangePasswordModal from './ChangePasswordModal';
import EditUserPanel from './EditUserPanel';

type UserDetailsProps = {
  username: string;
  email: string;
  phone?: string;
  role?: string;
  address?: string;
  configs?: string[];
  country?: string;
  nationality?: string;
  contactPerson?: string;
  onSave?: (data: any) => void;
};

const sectionStyle = {
  root: {
    backgroundColor: '#fafafa',
    border: '1px solid #ddd',
    borderRadius: 6,
    padding: 16,
    maxWidth: 1100,
  },
};

const labelStyle = { root: { color: '#888', fontSize: 12 } };
const valueStyle = { root: { fontSize: 14, fontWeight: FontWeights.semibold } };

const UserDetailsCard = ({
  username,
  email,
  phone,
  role,
  address,
  configs,
  nationality,
  onSave,
}: UserDetailsProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  // const [passwordEdit, setPasswordEdit] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] =useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // setError('User not logged in.');
          return;
        }

        const decoded: any = jwtDecode(token);
        const id = decoded?.nameid;

        if (!id) {
          // setError('Invalid token: Missing user ID.');
          return;
        }

        setUserId(id);

        // const res = await axios.get(`http://localhost:5153/api/users/${id}`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

        // setUserData(res.data);
      } catch (err) {
        console.error('Failed to fetch user data', err);
        // setError('Could not load user data.');
      }
    };

    fetchUserId();
  }, []);

  return (
    <Stack tokens={{ childrenGap: 8 }} styles={sectionStyle}>
      <Stack horizontal horizontalAlign="space-between">
        <Text variant="mediumPlus" styles={{ root: { fontWeight: FontWeights.semibold } }}>
          Basic details
        </Text>
        <DefaultButton text="" iconProps={{ iconName: 'Edit' }} onClick={() => setIsEditOpen(true)} style={{border: "none", background: "none"}} />
        <DefaultButton text="Change Password" iconProps={{ iconName: 'PasswordField' }} onClick={() => setIsPasswordModalOpen(true)} />
      </Stack>

      <Separator />

      <Stack horizontal wrap tokens={{ childrenGap: 40 }}>
        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 200 } }}>
          <Text styles={labelStyle}>Username</Text>
          <Text styles={valueStyle}>{username}</Text>
        </Stack>

        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 250 } }}>
          <Text styles={labelStyle}>Email</Text>
          <Text styles={valueStyle}>{email}</Text>
        </Stack>

        {phone && (
          <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 250 } }}>
            <Text styles={labelStyle}>Phone number</Text>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              {/* <img
                src="https://flagcdn.com/gb.svg"
                alt="UK Flag"
                width={20}
                style={{ borderRadius: 2 }}
              /> */}
              <Text styles={valueStyle}>{phone}</Text>
              <TooltipHost content="WhatsApp available">
                <Icon iconName="Chat" styles={{ root: { color: '#25d366' } }} />
              </TooltipHost>
            </Stack>
          </Stack>
        )}

        {role && (
          <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 200 } }}>
            <Text styles={labelStyle}>Role</Text>
            <Text styles={valueStyle}>{role}</Text>
          </Stack>
        )}

        {address && (
          <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 300 } }}>
            <Text styles={labelStyle}>Address (default)</Text>
            <Text styles={valueStyle}>{address}</Text>
          </Stack>
        )}

        {configs && configs.length > 0 && (
          <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 300 } }}>
            <Text styles={labelStyle}>Configs</Text>
            <Text styles={valueStyle}>{configs.join(', ')}</Text>
          </Stack>
        )}

        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 200 } }}>
          <Text styles={labelStyle}>Nationality</Text>
          <Text styles={valueStyle}>{nationality || '-'}</Text>
        </Stack>
      </Stack>

      {/* {isEditOpen && (
        <EditUserPanel
          initialData={{ username, email, phone, role, address, configs, nationality }}
          onDismiss={() => setIsEditOpen(false)}
          onSave={(data) => {
            onSave?.(data);
            setIsEditOpen(false);
          }}
        />
      )} */}

      <EditUserPanel
        isOpen={isEditOpen}
        initialData={{ username, email, phone, role, address, configs, nationality }}
        onDismiss={() => setIsEditOpen(false)}
        onSave={(data) => {
          onSave?.(data);
          setIsEditOpen(false);
        }}
      />


      {isPasswordModalOpen && <ChangePasswordModal
        userId={userId}
        isOpen={isPasswordModalOpen}
        onDismiss={() => setIsPasswordModalOpen(false)}
      />
      }
    </Stack>
  );
};

export default UserDetailsCard;
