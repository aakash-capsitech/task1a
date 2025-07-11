import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import {
  TextField,
  PrimaryButton,
  DefaultButton,
  Stack,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

type EditUserPanelProps = {
  isOpen: boolean;
  initialData: {
    username: string;
    email: string;
    phone?: string;
    role?: string;
    address?: string;
    configs?: string[];
    nationality?: string;
  };
  onDismiss: () => void;
  onSave: (data: any) => void;
};

const EditUserPanel = ({
  isOpen,
  initialData,
  onDismiss,
  onSave,
}: EditUserPanelProps) => {
  const [formData, setFormData] = useState({ ...initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData({ ...initialData });
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10–15 digits';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.nationality?.trim()) {
      newErrors.nationality = 'Nationality is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      toast.error('Please fill out all required fields.');
      return;
    }
    onSave(formData);
    onDismiss();
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Panel
        isOpen={isOpen}
        onDismiss={onDismiss}
        type={PanelType.custom}
        customWidth="400px"
        headerText="Edit User Details"
        closeButtonAriaLabel="Close"
        isFooterAtBottom={true}
        styles={{
          main: { width: '480px' },
          content: { padding: '24px' },
          footer: { padding: '16px 24px' },
        }}
      >
        <Stack tokens={{ childrenGap: 12 }}>
          <TextField
            label="Username"
            value={formData.username}
            onChange={(_, v) => handleChange('username', v || '')}
            errorMessage={errors.username}
            required
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(_, v) => handleChange('email', v || '')}
            errorMessage={errors.email}
            required
          />
          <TextField
            label="Phone"
            value={formData.phone}
            onChange={(_, v) => handleChange('phone', v || '')}
            errorMessage={errors.phone}
            required
          />
          <TextField
            label="Address"
            value={formData.address}
            onChange={(_, v) => handleChange('address', v || '')}
            errorMessage={errors.address}
            required
          />
          <TextField
            label="Nationality"
            value={formData.nationality}
            onChange={(_, v) => handleChange('nationality', v || '')}
            errorMessage={errors.nationality}
            required
          />
        </Stack>

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}
        >
          <DefaultButton
            text="Cancel"
            onClick={onDismiss}
            styles={{ root: { marginRight: 8, minWidth: 80 } }}
          />
          <PrimaryButton
            text="Save"
            onClick={handleSave}
            styles={{ root: { minWidth: 80 } }}
          />
        </div>
      </Panel>
    </>
  );
};

export default EditUserPanel;