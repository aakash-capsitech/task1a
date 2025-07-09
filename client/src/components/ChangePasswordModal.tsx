import React, { useState } from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  Stack,
  TextField,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import axios from 'axios';

type ChangePasswordModalProps = {
  userId: string;
  isOpen: boolean;
  onDismiss: () => void;
};

const ChangePasswordModal = ({ userId, isOpen, onDismiss }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChangePassword = async () => {
    setError('');
    setSuccessMsg('');

    if (!newPassword || !confirmPassword || !currentPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:5153/api/users/${userId}/change-password`, {
        currentPassword,
        newPassword,
      });

      setSuccessMsg('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onDismiss}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: 'Change Password',
      }}
      modalProps={{
        isBlocking: false,
      }}
    >
      <Stack tokens={{ childrenGap: 12 }}>
        <TextField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(_, val) => setCurrentPassword(val || '')}
          required
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(_, val) => setNewPassword(val || '')}
          required
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(_, val) => setConfirmPassword(val || '')}
          required
        />

        {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}
        {successMsg && <MessageBar messageBarType={MessageBarType.success}>{successMsg}</MessageBar>}
      </Stack>

      <DialogFooter>
        <PrimaryButton text="Change Password" onClick={handleChangePassword} disabled={loading} />
        <DefaultButton text="Cancel" onClick={onDismiss} />
      </DialogFooter>
    </Dialog>
  );
};

export default ChangePasswordModal;
