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
import { jwtDecode } from 'jwt-decode';
import ChangePasswordModal from '../Panels/ChangePasswordModal';
import EditUserPanel from '../Panels/EditUserPanel';

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
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const decoded: any = jwtDecode(token);
        const id = decoded?.nameid;

        if (!id) {
          return;
        }

        setUserId(id);
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };

    fetchUserId();
  }, []);

  return (
    <Stack tokens={{ childrenGap: 8 }} styles={sectionStyle}>
      <Stack horizontal>
        <Text
          variant="mediumPlus"
          styles={{ root: { fontWeight: FontWeights.semibold } }}
        >
          Basic details
        </Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <DefaultButton
            text=""
            iconProps={{ iconName: 'Edit' }}
            onClick={() => setIsEditOpen(true)}
            style={{ border: 'none', background: 'none' }}
          />
          <DefaultButton
            text="Change Password"
            iconProps={{ iconName: 'PasswordField' }}
            onClick={() => setIsPasswordModalOpen(true)}
          />
        </div>
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
          <Stack
            tokens={{ childrenGap: 4 }}
            styles={{ root: { minWidth: 250 } }}
          >
            <Text styles={labelStyle}>Phone number</Text>
            <Stack
              horizontal
              verticalAlign="center"
              tokens={{ childrenGap: 8 }}
            >
              <Text styles={valueStyle}>{phone}</Text>
              <TooltipHost content="WhatsApp available">
                <Icon iconName="Chat" styles={{ root: { color: '#25d366' } }} />
              </TooltipHost>
            </Stack>
          </Stack>
        )}

        {role && (
          <Stack
            tokens={{ childrenGap: 4 }}
            styles={{ root: { minWidth: 200 } }}
          >
            <Text styles={labelStyle}>Role</Text>
            <Text styles={valueStyle}>{role}</Text>
          </Stack>
        )}

        {address && (
          <Stack
            tokens={{ childrenGap: 4 }}
            styles={{ root: { minWidth: 300 } }}
          >
            <Text styles={labelStyle}>Address (default)</Text>
            <Text styles={valueStyle}>{address}</Text>
          </Stack>
        )}

        {configs && configs.length > 0 && (
          <Stack
            tokens={{ childrenGap: 4 }}
            styles={{ root: { minWidth: 300 } }}
          >
            <Text styles={labelStyle}>Configs</Text>
            <Text styles={valueStyle}>{configs.join(', ')}</Text>
          </Stack>
        )}

        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 200 } }}>
          <Text styles={labelStyle}>Nationality</Text>
          <Text styles={valueStyle}>{nationality || '-'}</Text>
        </Stack>
      </Stack>

      <EditUserPanel
        isOpen={isEditOpen}
        initialData={{
          username,
          email,
          phone,
          role,
          address,
          configs,
          nationality,
        }}
        onDismiss={() => setIsEditOpen(false)}
        onSave={(data) => {
          onSave?.(data);
          setIsEditOpen(false);
        }}
      />

      {isPasswordModalOpen && (
        <ChangePasswordModal
          userId={userId}
          isOpen={isPasswordModalOpen}
          onDismiss={() => setIsPasswordModalOpen(false)}
        />
      )}
    </Stack>
  );
};

export default UserDetailsCard;
