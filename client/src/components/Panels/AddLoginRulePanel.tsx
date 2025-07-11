import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import {
  Dropdown,
  type IDropdownOption,
  Checkbox,
  DatePicker,
  DayOfWeek,
  DefaultButton,
  PrimaryButton,
  Stack,
  Spinner,
  TextField,
} from '@fluentui/react';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

type AddLoginRulePanelProps = {
  isOpen: boolean;
  onDismiss: () => void;
  existingRule?: {
    id: string;
    userIds: string[];
    restriction: string;
    fromDate?: string;
    toDate?: string;
  };
};

const restrictionOptions: IDropdownOption[] = [
  { key: 'deny', text: 'Deny' },
  { key: 'allow', text: 'Allow' },
];

export const AddLoginRulePanel = ({
  isOpen,
  onDismiss,
  existingRule,
}: AddLoginRulePanelProps) => {
  const [restriction, setRestriction] = useState('deny');
  const [dateRangeEnabled, setDateRangeEnabled] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [userOptions, setUserOptions] = useState<IDropdownOption[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await axios.get('http://localhost:5153/api/users');
        const users = Array.isArray(response.data)
          ? response.data
          : response.data.users;

        const options = users.map((user: any) => ({
          key: user.id,
          text: user.email,
        }));

        setUserOptions(options);
      } catch (err) {
        console.error('Failed to fetch users', err);
      } finally {
        setLoadingUsers(false);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && existingRule) {
      setSelectedUsers(existingRule.userIds);
      setRestriction(existingRule.restriction);
      setFromDate(
        existingRule.fromDate ? new Date(existingRule.fromDate) : null
      );
      setToDate(existingRule.toDate ? new Date(existingRule.toDate) : null);
      setDateRangeEnabled(!!existingRule.fromDate || !!existingRule.toDate);
    } else {
      setSelectedUsers([]);
      setRestriction('deny');
      setFromDate(null);
      setToDate(null);
      setDateRangeEnabled(false);
    }
  }, [isOpen, existingRule]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return userOptions;
    return userOptions.filter((opt) =>
      opt.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, userOptions]);

  const handleSave = async () => {
    const payload = {
      userIds: selectedUsers,
      restriction,
      fromDate,
      toDate,
    };

    try {
      if (existingRule) {
        await axios.put(
          `http://localhost:5153/api/loginrules/${existingRule.id}`,
          payload
        );
        toast.success('Login rules Updated');
      } else {
        await axios.post('http://localhost:5153/api/loginrules', payload);
        toast.success('Login rules created');
      }
    } catch (err) {
      console.error('Save failed', err);
    }

    onDismiss();
  };

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText={existingRule ? 'Edit login rule' : 'Add login rule'}
      closeButtonAriaLabel="Close"
      type={PanelType.smallFixedFar}
    >
      <Stack tokens={{ childrenGap: 15 }}>
        {loadingUsers ? (
          <Spinner label="Loading users..." />
        ) : (
          <Stack tokens={{ childrenGap: 8 }}>
            <TextField
              placeholder="Search users..."
              value={searchTerm}
              onChange={(_, val) => setSearchTerm(val || '')}
            />

            <Dropdown
              label="Select users"
              multiSelect
              selectedKeys={selectedUsers}
              onChange={(_, option) => {
                if (!option) return;
                const key = option.key as string;
                setSelectedUsers((prev) =>
                  option.selected
                    ? [...prev, key]
                    : prev.filter((id) => id !== key)
                );
              }}
              options={filteredOptions}
            />
          </Stack>
        )}

        <Dropdown
          label="Restrictions"
          options={restrictionOptions}
          selectedKey={restriction}
          onChange={(_, opt) => setRestriction(opt?.key as string)}
        />

        <Checkbox
          label="Select date range"
          checked={dateRangeEnabled}
          onChange={(_, checked) => setDateRangeEnabled(!!checked)}
        />

        {dateRangeEnabled && (
          <>
            <DatePicker
              label="From Date"
              firstDayOfWeek={DayOfWeek.Sunday}
              placeholder="DD/MM/YYYY"
              value={fromDate ?? undefined}
              onSelectDate={(date) => setFromDate(date ?? null)}
              allowTextInput
            />
            <DatePicker
              label="To Date"
              firstDayOfWeek={DayOfWeek.Sunday}
              placeholder="DD/MM/YYYY"
              value={toDate ?? undefined}
              onSelectDate={(date) => setToDate(date ?? null)}
              allowTextInput
            />
          </>
        )}

        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <DefaultButton text="Cancel" onClick={onDismiss} />
          <PrimaryButton
            text="Save"
            onClick={handleSave}
            disabled={selectedUsers.length === 0}
          />
        </Stack>
      </Stack>
    </Panel>
  );
};