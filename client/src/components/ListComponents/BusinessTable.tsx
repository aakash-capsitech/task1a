import {
  DetailsList,
  type IColumn,
  PrimaryButton,
  SearchBox,
  SelectionMode,
  Icon,
  Dropdown,
  type IDropdownOption,
  DefaultButton,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AddBusinessPanel } from '../Panels/AddBusinessPanel';

const typeOptions: IDropdownOption[] = [
  { key: 'limited', text: 'Limited' },
  { key: 'individual', text: 'Individual' },
];

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 12px',
  border: 'none',
  background: 'white',
  fontSize: '13px',
  color: '#333',
  cursor: 'pointer',
  height: '32px',
  transition: 'all 0.2s ease',
};

const buttonHoverStyle = {
  background: '#f3f2f1',
};

const iconStyle = {
  fontSize: '14px',
};

export const BusinessTable = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [refresh, setRefresh] = useState(false);

  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const [tempInput, setTempInput] = useState('');

  const filterOptions: IDropdownOption[] = [{ key: 'type', text: 'Types' }];

  const roleOptions: IDropdownOption[] = [
    { key: 'Limited', text: 'Limited' },
    { key: 'Individual', text: 'Individual' },
  ];

  const fetchBusinesses = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get('http://localhost:5153/api/businesses', {
        params: {
          page,
          pageSize,
          search,
          type: typeFilter || undefined,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
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
  }, [page, pageSize, search, typeFilter, refresh, selectedFilter]);

  const columns: IColumn[] = [
    {
      key: 'BSID',
      name: 'BSID',
      minWidth: 100,
      maxWidth: 150,
      isMultiline: false,
      isResizable: true,
      onRender: (item) => item.bsid || '-',
    },
    {
      key: 'nameOrNumber',
      name: 'Business Name/Number',
      minWidth: 150,
      maxWidth: 200,
      isMultiline: false,
      isResizable: true,
      onRender: (item) => item.businessE?.nameOrNumber || '-',
    },
    {
      key: 'type',
      name: 'Type',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item) => item.businessE?.type || '-',
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
      onRender: (item) => item.contact?.phoneNumbers?.[0]?.value || '-',
    },
    {
      key: 'email',
      name: 'Email',
      minWidth: 160,
      maxWidth: 180,
      onRender: (item) => item.contact?.emails?.[0]?.value || '-',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '4px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={buttonStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { background: 'white' })
            }
            onClick={() => setIsPanelOpen(true)}
          >
            <span style={iconStyle}>
              <Icon iconName="Add" />
            </span>
            Add Business
          </button>

          <button
            style={buttonStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, { background: 'white' })
            }
            onClick={() => {
              setSearchValue('');
              setTypeFilter(null);
              setSelectedFilter(null);
              setSearch('');
              setSelectedRole(null);
              setRefresh(!refresh);
            }}
          >
            <span style={iconStyle}>
              <Icon iconName="Refresh" />
            </span>
            Refresh
          </button>

          {/* <Dropdown
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
          )} */}
        </div>

        <div style={{ display: 'flex', gap: '80px', marginRight: '10px' }}>
          <div style={{ display: 'flex', gap: '0px' }}>
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

          <div style={{ display: 'flex', gap: '12px' }}>
            {selectedRole && (
              <span
                style={{
                  backgroundColor: '#f3f2f1',
                  borderRadius: '12px',
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '13px',
                }}
              >
                Role = <strong>{selectedRole}</strong>
                <Icon
                  iconName="Cancel"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedRole(null);
                    setSelectedFilter(null);
                    setTypeFilter(null);
                    setPage(1);
                  }}
                />
              </span>
            )}
            <button
              style={{
                ...buttonStyle,
                border: '1px solid #ccc',
                background: '#f3f2f1',
              }}
              onClick={() => setFilterPanelVisible((prev) => !prev)}
            >
              <Icon iconName="Filter" /> Add filter
            </button>

            {/* Filter Dropdown Panel */}
            {filterPanelVisible && (
              <div
                style={{
                  position: 'absolute',
                  top: '36px',
                  right: 0,
                  background: '#fff',
                  padding: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  width: '220px',
                  zIndex: 1000,
                  boxShadow: '0 0 4px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '6px' }}>
                  Add filter
                </div>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  Criteria *
                </span>
                <Dropdown
                  placeholder="Select"
                  options={filterOptions}
                  onChange={(_, option) =>
                    setSelectedFilter(option?.key as string)
                  }
                />

                {selectedFilter === 'type' && (
                  <Dropdown
                    placeholder="Select type"
                    options={roleOptions}
                    onChange={(_, option) => {
                      setTempInput(option?.key as string);
                    }}
                  />
                )}

                <PrimaryButton
                  style={{ marginTop: '10px' }}
                  text="Apply Filter"
                  onClick={() => {
                    setSelectedRole(tempInput || null);
                    setTypeFilter(tempInput || null);
                    setFilterPanelVisible(false);
                    setPage(1);
                  }}
                />

                <DefaultButton
                  style={{ marginTop: '10px' }}
                  text="Cancel"
                  onClick={() => {
                    setFilterPanelVisible(false);
                  }}
                />
              </div>
            )}
          </div>
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
              width: '100%',
              selectors: {
                '.ms-DetailsHeader': {
                  backgroundColor: '#f3f2f1',
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  border: 'none',
                },
                '.ms-DetailsHeader-cell': {
                  color: '#004578',
                  fontWeight: 600,
                  fontSize: '13px',
                },
                '.ms-DetailsRow': {
                  minHeight: '28px !important',
                  borderBottom: '0.5px solid #eee',
                },
                '.ms-DetailsRow-cell': {
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  fontSize: '13px',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  display: 'flex',
                  alignItems: 'center',
                },
              },
            },
          }}
        />
      </div>

      {/* Pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          marginTop: '20px',
        }}
      >
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
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
