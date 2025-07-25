import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import {
  Dropdown,
  type IDropdownOption,
  Checkbox,
  DatePicker,
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
    userEmail: string;
    restriction: string;
    fromDate?: string;
    toDate?: string;
  };
};

const restrictionOptions: IDropdownOption[] = [
  { key: 'Deny', text: 'Deny' },
  { key: 'Allow', text: 'Allow' },
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
  const [selectedUser, setSelectedUser] = useState<string | undefined>();
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [enableDatePick, setEnableDatePick] = useState(true);
  const [userMap, setUserMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await axios.get('http://localhost:5153/api/users');
        const users = Array.isArray(response.data)
          ? response.data
          : response.data.users;

        const options = users.map((user: any) => ({
          key: user.email,
          text: user.email,
        }));

        const map: Record<string, string> = {};
        for (const user of users) {
          map[user.email] = user.id;
        }

        setUserMap(map);
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
      setSelectedUser(existingRule.userEmail);
      setRestriction(existingRule.restriction);
      setFromDate(
        existingRule.fromDate ? new Date(existingRule.fromDate) : null
      );
      setToDate(existingRule.toDate ? new Date(existingRule.toDate) : null);
      setDateRangeEnabled(!!existingRule.fromDate || !!existingRule.toDate);
    } else {
      setSelectedUser(undefined);
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
    if (!selectedUser) return;

    const userId = userMap[selectedUser];
    if (!userId) return;

    const payload = {
      userId,
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
        toast.success('Login rule updated');
      } else {
        await axios.post('http://localhost:5153/api/loginrules', payload);
        toast.success('Login rule created');
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
      {/* <Stack tokens={{ childrenGap: 15 }}> */}
      <Stack
        verticalFill
        styles={{ root: { height: '100%' } }}
        tokens={{ childrenGap: 15 }}
      >
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
              label="Select user"
              selectedKey={selectedUser}
              onChange={(_, option) => {
                if (!option) return;
                setSelectedUser(option.key as string);
              }}
              options={filteredOptions}
            />
          </Stack>
        )}

        <Dropdown
          label="Restrictions"
          options={restrictionOptions}
          selectedKey={restriction}
          onChange={(_, opt) => {
            const newRestriction = opt?.key as string;
            setRestriction(newRestriction);
            const enableDates = newRestriction === 'Deny';
            setEnableDatePick(enableDates);
            if (!enableDates) {
              setDateRangeEnabled(false);
              setFromDate(null);
              setToDate(null);
            }
          }}
        />

        {enableDatePick && (
          <Checkbox
            label="Select date range"
            checked={dateRangeEnabled}
            onChange={(_, checked) => setDateRangeEnabled(!!checked)}
          />
        )}

        {dateRangeEnabled && (
          <>
            <DatePicker
              label="From Date"
              placeholder="DD/MM/YYYY"
              value={fromDate ?? undefined}
              onSelectDate={(date) => setFromDate(date ?? null)}
              allowTextInput
            />
            <DatePicker
              label="To Date"
              placeholder="DD/MM/YYYY"
              value={toDate ?? undefined}
              onSelectDate={(date) => setToDate(date ?? null)}
              allowTextInput
            />
          </>
        )}

        <div
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            background: 'white',
            padding: '8px',
            zIndex: 1000,
          }}
        >
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <DefaultButton text="Cancel" onClick={onDismiss} />
            <PrimaryButton text="Save" onClick={handleSave} />
          </Stack>
        </div>
      </Stack>
    </Panel>
  );
};
