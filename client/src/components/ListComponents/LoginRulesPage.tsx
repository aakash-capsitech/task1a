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
  Panel,
  Icon,
  DefaultButton,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddLoginRulePanel } from '../Panels/AddLoginRulePanel';

type LoginRule = {
  id: string;
  userEmails: string[];
  restriction: 'Allow' | 'Deny';
  fromDate?: string;
  toDate?: string;
};


export const LoginRulesPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [rules, setRules] = useState<LoginRule[]>([]);
  const [editingRule, setEditingRule] = useState<LoginRule | null>(null);
  const [search, setSearch] = useState('');

  const [history, setHistory] = useState<any[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const openHistory = async (id: string) => {
    const res = await axios.get(`http://localhost:5153/api/loginrules/${id}/history`);
    setHistory(res.data);
    setIsHistoryOpen(true);
  };


  const fetchRules = async () => {
    const response = await axios.get('http://localhost:5153/api/loginrules');
    console.log(response.data)
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
      onRender: (item: LoginRule) => item.userEmails?.join(', ') || 'No users',
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
    minWidth: 120,
    onRender: (item: LoginRule) => (
      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <IconButton
          iconProps={{ iconName: 'Edit' }}
          title="Edit"
          onClick={() => {
            setEditingRule(item);
            setIsPanelOpen(true);
          }}
        />
        <IconButton
          iconProps={{ iconName: 'History' }}
          title="View History"
          onClick={() => openHistory(item.id)}
        />
      </Stack>
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
        {/* <PrimaryButton
          text="+ Refresh"
          onClick={() => {
            fetchRules()
          }}
        /> */}

        <DefaultButton
          text='Refresh'
          onClick={() => fetchRules()}
            iconProps={{ iconName: 'Refresh' }}
        />
        {/* <PrimaryButton
          text="history"
          onClick={() => {
            openHistory(item.id)
          }}
        /> */}
        <SearchBox
          placeholder="Search"
          value={search}
          onChange={(_, val) => setSearch(val || '')}
        />
      </Stack>

      <DetailsList
        items={rules.filter((r) =>
          r.userEmails?.some((email) =>
            email.toLowerCase().includes(search.toLowerCase())
          )
        )
      }
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


      {isHistoryOpen && (
      <Panel
        isOpen
        onDismiss={() => setIsHistoryOpen(false)}
        headerText="Login Rule History"
      >
        {history.map((log, idx) => (
          <Stack key={idx} styles={{ root: { marginBottom: 10 } }}>
            <Text><strong>{log.action}</strong> - {new Date(log.timestamp).toLocaleString()}</Text>
            <Text>{log.description}</Text>
          </Stack>
        ))}
      </Panel>
    )}

    </Stack>
  );
};