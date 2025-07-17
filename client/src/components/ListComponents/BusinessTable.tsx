import {
  DetailsList,
  type IColumn,
  PrimaryButton,
  SearchBox,
  SelectionMode,
  Icon,
  Dropdown,
  type IDropdownOption,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AddBusinessPanel } from '../Panels/AddBusinessPanel';

const typeOptions: IDropdownOption[] = [
  { key: 'limited', text: 'Limited' },
  { key: 'individual', text: 'Individual' },
];

export const BusinessTable = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('http://localhost:5153/api/businesses', {
        params: {
          page,
          pageSize,
          search,
          type: typeFilter || undefined,
        },
      });
      setBusinesses(res.data.businesses || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      toast.error('Failed to load businesses');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [page, pageSize, search, typeFilter]);

  const handleDelete = async (id: string) => {
    try {
      await axios.put(`http://localhost:5153/api/businesses/delete/${id}`);
      toast.warn('Business deleted');
      fetchBusinesses();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const columns: IColumn[] = [
    {
  key: 'nameOrNumber',
  name: 'Business Name/Number',
  minWidth: 150,
  maxWidth: 200,
  isMultiline: false,
  isResizable: true,
//   onRender: (item) => {
//     const firstEntry = item.businesses?.[0];
//     return firstEntry ? firstEntry.nameOrNumber : '-';
//   },
onRender: (item) =>
  item.businesses?.map((b: any) => b.nameOrNumber).join(', ') || '-',

},
    // {
    //   key: 'type',
    //   name: 'Type',
    //   fieldName: 'type',
    //   minWidth: 80,
    //   maxWidth: 100,
    // },
    {
  key: 'type',
  name: 'Type',
  minWidth: 80,
  maxWidth: 100,
  onRender: (item) => {
    const firstEntry = item.businesses?.[0];
    return firstEntry ? firstEntry.type : '-';
  },
},
    {
      key: 'contact',
      name: 'Contact Name',
      minWidth: 140,
      maxWidth: 180,
      onRender: (item) => {
        const contact = item.contact;
        if (!contact) return '-';
        return `${contact.firstName || ''} ${contact.lastName || ''}`.trim();
      },
    },
    {
      key: 'mode',
      name: 'Mode',
      minWidth: 100,
      maxWidth: 180,
      onRender: (item) => item.contact?.mode || '-',
    },
    {
      key: 'phone',
      name: 'Phone',
      minWidth: 120,
      maxWidth: 180,
      onRender: (item) =>
        item.contact?.phoneNumbers?.[0]?.value || '-',
    },
    {
      key: 'email',
      name: 'Email',
      minWidth: 160,
      maxWidth: 180,
      onRender: (item) =>
        item.contact?.emails?.[0]?.value || '-',
    },
    // {
    //   key: 'actions',
    //   name: '',
    //   minWidth: 50,
    //   onRender: (item) => (
    //     <div style={{ display: 'flex', gap: '6px' }}>
    //       {/* Future View/Edit can go here */}
    //       <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)}>
    //         <Icon iconName="Delete" style={{ color: 'red' }} />
    //       </span>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        //   padding: '12px',
          borderRadius: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          <PrimaryButton text="Add Business" onClick={() => setIsPanelOpen(true)} />
          <Dropdown
            placeholder="Filter by type"
            options={typeOptions}
            selectedKey={typeFilter}
            onChange={(_, opt) => setTypeFilter(opt?.key as string)}
            styles={{ root: { width: 160 } }}
          />
          {typeFilter && (
            <Icon
              iconName="Cancel"
              style={{ cursor: 'pointer', color: '#666' }}
              onClick={() => setTypeFilter(null)}
            />
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <SearchBox
            placeholder="Search business/contact"
            value={searchValue}
            onChange={(_, val) => setSearchValue(val || '')}
          />
          <PrimaryButton
            text="Apply"
            onClick={() => {
              setSearch(searchValue);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 0 4px rgba(0,0,0,0.05)',
        }}
      >
        <DetailsList
          items={businesses}
          columns={columns}
          selectionMode={SelectionMode.none}
          compact
          styles={{
            root: {
              selectors: {
                '.ms-DetailsHeader': { background: '#f3f2f1', paddingTop: "0", paddingBottom: "0" },
                '.ms-DetailsRow': { minHeight: 32 },
                '.ms-DetailsRow-cell': {
                  padding: '6px 8px',
                  fontSize: '13px',
                },
              },
            },
          }}
        />
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          disabled={businesses.length < pageSize}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <div style={{ textAlign: 'center' }}>
        Showing {businesses.length} of {total} businesses
      </div>

      {/* Panel for adding */}
      <AddBusinessPanel
        isOpen={isPanelOpen}
        onDismiss={() => {
          setIsPanelOpen(false);
          fetchBusinesses();
        }}
      />
    </div>
  );
};
