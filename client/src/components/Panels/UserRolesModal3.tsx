import React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  TextField,
  Dropdown,
  type IDropdownOption,
  Checkbox,
  PrimaryButton,
  DefaultButton,
  Stack,
} from '@fluentui/react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const roles = [
  {
    key: 'callAgent',
    text: 'Call agent',
    description: 'An agent can receive and make phone calls.',
  },
  {
    key: 'callMonitor',
    text: 'Call monitor',
    description: 'Can monitor and make/receive calls.',
  },
  {
    key: 'chatAgent',
    text: 'Chat agent',
    description: 'Can join ongoing web-chats.',
  },
  {
    key: 'chatMonitor',
    text: 'Chat monitor',
    description: 'Can monitor any ongoing chats.',
  },
  {
    key: 'allClients',
    text: 'All clients',
    description: 'Can access all clients saved in the practice.',
  },
  {
    key: 'reviewer',
    text: 'Reviewer',
    description: 'Tax and accounts reviewer.',
  },
  {
    key: 'creditNoteReviewer',
    text: 'Credit note reviewer',
    description: 'Can review credit note requests.',
  },
];

const primaryRoles: IDropdownOption[] = [
  { key: 'manager', text: 'Manager' },
  { key: 'admin', text: 'Admin' },
];

export const UserRolesModal3 = ({
  userId,
  userName,
  userEmail,
  primaryRole,
  configRoles,
  phone: initialPhone,
  nationality: initialNationality,
  address: initialAddress,
  onUpdate,
}: {
  userId: string;
  userName: string;
  userEmail: string;
  primaryRole: string;
  configRoles: string[];
  phone?: string;
  nationality?: string;
  address?: string;
  onUpdate: () => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRoles, setSelectedRoles] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [phone, setPhone] = React.useState('');
  const [nationality, setNationality] = React.useState('');
  const [address, setAddress] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) return;

    const normalizedConfigRoles = configRoles.map((r) => r.toLowerCase());

    const initSelected: Record<string, boolean> = {};
    for (const role of roles) {
      initSelected[role.key] = normalizedConfigRoles.includes(
        role.key.toLowerCase()
      );
    }

    setSelectedRoles(initSelected);
    setPhone(initialPhone || '');
    setNationality(initialNationality || '');
    setAddress(initialAddress || '');
  }, [isOpen, configRoles]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const validate = () => {
    if (!/^[\d\s+\-()]{7,}$/.test(phone)) {
      toast.error('Please enter a valid phone number.');
      return false;
    }
    if (!nationality.trim()) {
      toast.error('Nationality is required.');
      return false;
    }
    if (!address.trim()) {
      toast.error('Address is required.');
      return false;
    }
    return true;
  };

  const handleRoleChange = (key: string, checked?: boolean) => {
    setSelectedRoles((prev) => ({ ...prev, [key]: !!checked }));
  };

  const handleSave = async () => {
    if (!validate()) return;

    const selectedKeys = Object.keys(selectedRoles).filter(
      (key) => selectedRoles[key]
    );

    try {
      await axios.put(`http://localhost:5153/api/users/${userId}`, {
        configRoles: selectedKeys,
        phone,
        nationality,
        address,
      });
      toast.success('User updated successfully');
      onUpdate();
      closeDialog();
    } catch (err) {
      console.error('Error updating user', err);
      toast.error('Something went wrong while saving.');
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <DefaultButton
        text="Configure Roles"
        onClick={openDialog}
        iconProps={{ iconName: 'Permissions' }}
      />

      <Dialog
        hidden={!isOpen}
        onDismiss={closeDialog}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'User roles',
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 500 } },
        }}
      >
        <Stack tokens={{ childrenGap: 15 }}>
          <TextField label="Name" value={userName} readOnly />
          <TextField label="Email" value={userEmail} readOnly />
          <Dropdown
            label="Primary role"
            selectedKey={primaryRole}
            options={primaryRoles}
            disabled
          />

          <TextField
            label="Phone Number"
            value={phone}
            onChange={(_, val) => setPhone(val || '')}
            placeholder="+91 98765 43210"
            required
          />
          <TextField
            label="Nationality"
            value={nationality}
            onChange={(_, val) => setNationality(val || '')}
            placeholder="Indian"
            required
          />
          <TextField
            label="Address"
            multiline
            value={address}
            onChange={(_, val) => setAddress(val || '')}
            placeholder="Enter address here"
            required
          />

          {Object.keys(selectedRoles).length > 0 &&
            roles.map((role) => (
              <div key={role.key}>
                <Checkbox
                  label={role.text}
                  checked={!!selectedRoles[role.key]}
                  onChange={(_, checked) => handleRoleChange(role.key, checked)}
                />
                <div style={{ marginLeft: 24, color: '#666', fontSize: 12 }}>
                  {role.description}
                </div>
              </div>
            ))}
        </Stack>

        <DialogFooter>
          <PrimaryButton text="Save" onClick={handleSave} />
          <DefaultButton text="Cancel" onClick={closeDialog} />
        </DialogFooter>
      </Dialog>
    </div>
  );
};