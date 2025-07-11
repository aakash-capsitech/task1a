import {
  Stack,
  PrimaryButton,
  IconButton,
  SearchBox,
  DetailsList,
  DetailsListLayoutMode,
  type IColumn,
  SelectionMode,
  Text,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddLoginRulePanel } from '../Panels/AddLoginRulePanel';

type LoginRule = {
  id: string;
  userIds: string[];
  restriction: 'allow' | 'deny';
  fromDate?: string;
  toDate?: string;
};

export const LoginRulesPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [rules, setRules] = useState<LoginRule[]>([]);
  const [editingRule, setEditingRule] = useState<LoginRule | null>(null);
  const [search, setSearch] = useState('');

  const fetchRules = async () => {
    const response = await axios.get('http://localhost:5153/api/loginrules');
    setRules(response.data);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const columns: IColumn[] = [
    {
      key: 'sno',
      name: 'S.No.',
      fieldName: 'id',
      minWidth: 50,
      maxWidth: 70,
      onRender: (_, i) => i! + 1,
    },
    {
      key: 'users',
      name: 'Users',
      minWidth: 200,
      onRender: (item: LoginRule) => item.userIds.join(', '),
    },
    {
      key: 'restriction',
      name: 'Restriction',
      fieldName: 'restriction',
      minWidth: 100,
    },
    {
      key: 'fromDate',
      name: 'From',
      minWidth: 130,
      onRender: (item) =>
        item.fromDate ? new Date(item.fromDate).toLocaleString() : '-',
    },
    {
      key: 'toDate',
      name: 'To',
      minWidth: 130,
      onRender: (item) =>
        item.toDate ? new Date(item.toDate).toLocaleString() : '-',
    },
    {
      key: 'actions',
      name: 'Actions',
      minWidth: 50,
      onRender: (item: LoginRule) => (
        <IconButton
          iconProps={{ iconName: 'Edit' }}
          title="Edit"
          onClick={() => {
            setEditingRule(item);
            setIsPanelOpen(true);
          }}
        />
      ),
    },
  ];

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
      <Stack horizontal horizontalAlign="space-between">
        <PrimaryButton
          text="+ Add"
          onClick={() => {
            setEditingRule(null);
            setIsPanelOpen(true);
          }}
        />
        <SearchBox
          placeholder="Search"
          value={search}
          onChange={(_, val) => setSearch(val || '')}
        />
      </Stack>

      <DetailsList
        items={rules.filter((r) =>
          r.userIds.some((u) => u.toLowerCase().includes(search.toLowerCase()))
        )}
        columns={columns}
        setKey="loginRulesList"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionMode={SelectionMode.none}
      />

      <Text variant="small">Showing {rules.length} rules</Text>

      <AddLoginRulePanel
        isOpen={isPanelOpen}
        onDismiss={() => {
          setIsPanelOpen(false);
          setEditingRule(null);
          fetchRules();
        }}
        existingRule={editingRule as any}
      />
    </Stack>
  );
};
