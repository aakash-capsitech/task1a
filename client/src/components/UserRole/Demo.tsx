// UserRolesModal.tsx
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

const roles = [
  { key: 'callAgent', text: 'Call agent', description: 'A agent can receive and make phone calls.' },
  { key: 'callMonitor', text: 'Call monitor', description: 'A monitor can receive and make phone calls and listen any ongoing call.' },
  { key: 'chatAgent', text: 'Chat agent', description: 'A chat agent can join any ongoing web-chat.' },
  { key: 'chatMonitor', text: 'Chat monitor', description: 'A chat monitor can monitor any ongoing chats.' },
  { key: 'allClients', text: 'All clients', description: 'User can access all the clients saved in the practice.' },
  { key: 'reviewer', text: 'Reviewer', description: 'Tax and accounts reviewer.' },
  { key: 'creditNoteReviewer', text: 'Credit note reviewer', description: 'User can review credit notes request for approval' },
];

const primaryRoles: IDropdownOption[] = [
  { key: 'manager', text: 'Manager' },
  { key: 'admin', text: 'Admin' },
];

export const UserRolesModal3 = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRoles, setSelectedRoles] = React.useState<{ [key: string]: boolean }>({
    chatAgent: true,
    chatMonitor: true,
    allClients: true,
    reviewer: true,
    creditNoteReviewer: true,
  });

  const handleRoleChange = (key: string, checked?: boolean) => {
    setSelectedRoles(prev => ({ ...prev, [key]: !!checked }));
  };

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <DefaultButton text="Configure Roles" onClick={openDialog} />

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
          <TextField label="Name" value="AADIPTA ADHIKARY" readOnly />
          <TextField label="Email" value="ABC23456789@GMAIL.COM" readOnly />
          <Dropdown label="Primary role" selectedKey="manager" options={primaryRoles} disabled />

          {roles.map(role => (
            <div key={role.key}>
              <Checkbox
                label={role.text}
                checked={!!selectedRoles[role.key]}
                onChange={(_, checked) => handleRoleChange(role.key, checked)}
              />
              <div style={{ marginLeft: 24, color: '#666', fontSize: 12 }}>{role.description}</div>
            </div>
          ))}
        </Stack>

        <DialogFooter>
          <PrimaryButton text="Save" onClick={closeDialog} />
          <DefaultButton text="Cancel" onClick={closeDialog} />
        </DialogFooter>
      </Dialog>
    </div>
  );
};
