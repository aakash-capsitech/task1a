import {
  DetailsList,
  type IColumn,
  PrimaryButton,
  Dropdown,
  type IDropdownOption,
  Icon,
  SearchBox,
  SelectionMode,
  DefaultButton,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateQuotePanel } from '../Panels/CreateQuotePanel';

import jsPDF from 'jspdf';
import { DuePanel } from '../Panels/DuePanel';

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

export const generateQuotePdf = (quote: any) => {
  const { services = [] } = quote;

  if (!services.length) {
    console.warn('No services found for quote:', quote.id);
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Quote Summary', 20, 20);

  doc.setFontSize(12);
  doc.text(`Quote ID: ${quote.id}`, 20, 30);
  doc.text(`Business ID: ${quote.businessId}`, 20, 40);
  doc.text(`Date: ${new Date(quote.date).toLocaleString()}`, 20, 50);
  doc.text(`Response Team: ${quote.firstResponseTeam}`, 20, 60);

  doc.text('Services:', 20, 75);

  quote.services?.forEach((s: any, idx: number) => {
    const y = 85 + idx * 10;
    doc.text(
      `- ${s.service || 'No service'}`,
      25,
      90 + quote.services.length * 10 + idx * 10
    );

    doc.text(`- ${s.description || 'No description'} | £${s.amount}`, 25, y);
  });

  const finalY = 110 + quote.services.length * 10;

  doc.text(`Subtotal: £${quote.subtotal}`, 20, finalY + 10);
  doc.text(`Discount: ${quote.discountPercentage}%`, 20, finalY + 20);
  doc.text(
    `VAT: ${quote.vatPercentage}% (£${quote.vatAmount})`,
    20,
    finalY + 30
  );
  doc.text(`Total: £${quote.total}`, 20, finalY + 40);

  doc.save(`Quote_${quote.id}.pdf`);
};

const responseTeamOptions: IDropdownOption[] = [
  { key: 'response1', text: 'response1' },
  { key: 'response2', text: 'response2' },
];

export const QuoteTable = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDuePanelOpen, setIsDuePanelOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [businessFilter, setBusinessFilter] = useState<string | null>(null);
  const [responseFilter, setResponseFilter] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [refresh, setRefresh] = useState(false);

  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // const [token, setToken] = useState("")

  const [dueUser, setDueUser] = useState<any>();

  const [tempInput, setTempInput] = useState('');

  const filterOptions: IDropdownOption[] = [{ key: 'team', text: 'Teams' }];

  const roleOptions: IDropdownOption[] = [
    { key: 'response1', text: 'response1' },
    { key: 'response2', text: 'response2' },
  ];

  const fetchQuotes = async () => {
    const token = localStorage.getItem("token")
    console.log(token)
    try {
      const res = await axios.get('http://localhost:5153/api/quotes', {
        params: {
          page,
          pageSize,
          search,
          business: businessFilter || undefined,
          team: responseFilter || undefined,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setQuotes(res.data.quotes || []);
      console.log(res.data);
      setTotal(res.data.total || 0);
    } catch (err) {
      toast.error('Failed to load quotes');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [page, search, businessFilter, responseFilter, refresh]);

  const fetchDues = async () => {
    const token = localStorage.getItem("token")
    console.log(token)
    try {
      const res = await axios.get('http://localhost:5153/api/quotes', {
        params: {
          page,
          pageSize,
          search,
          business: businessFilter || undefined,
          team: responseFilter || undefined,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setQuotes(res.data.quotes || []);
      console.log(res.data);
      setTotal(res.data.total || 0);
    } catch (err) {
      toast.error('Failed to load quotes');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDues();
  }, []);


  // const handleDelete = async (id: string) => {
  //   try {
  //     await axios.put(`http://localhost:5153/api/Quotes/delete/${id}`);
  //     toast.warn('Quote deleted');
  //     fetchQuotes();
  //   } catch (err) {
  //     toast.error('Delete failed');
  //   }
  // };

  const columns: IColumn[] = [
    {
      key: 'QSID',
      name: 'QSID',
      minWidth: 100,
      maxWidth: 150,
      isMultiline: false,
      isResizable: true,
      onRender: (item) => (
        <div style={{ display: 'flex', gap: 8 }}>
          {item.qsid || '-'}
          <Icon
            iconName="ReportDocument"
            style={{ cursor: 'pointer', color: '#0078d4' }}
            onClick={() => {
              // console.log('Downloading PDF for:', item);
              // generateQuotePdf(item);
              setDueUser(item)
              setIsDuePanelOpen(true)
            }}
          />
        </div>
      ),
    },
    {
      key: 'businessName',
      name: 'Business',
      minWidth: 150,
      maxWidth: 180,
      onRender: (item) => item.businessName || '-',
    },
    {
      key: 'date',
      name: 'Date',
      minWidth: 100,
      maxWidth: 180,
      onRender: (item) =>
        item.date ? new Date(item.date).toLocaleDateString() : '-',
    },
    {
      key: 'team',
      name: 'Response Team',
      minWidth: 120,
      maxWidth: 180,
      fieldName: 'firstResponseTeam',
    },
    {
      key: 'subtotal',
      name: 'Subtotal',
      minWidth: 100,
      maxWidth: 180,
      onRender: (item) => `£${item.subtotal ?? '0.00'}`,
    },
    {
      key: 'discount',
      name: 'Discount %',
      minWidth: 100,
      maxWidth: 180,
      onRender: (item) => `${item.discountPercentage ?? 0}%`,
    },
    {
      key: 'vat',
      name: 'VAT %',
      minWidth: 80,
      maxWidth: 180,
      onRender: (item) => `${item.vatPercentage ?? 0}%`,
    },
    {
      key: 'total',
      name: 'Total',
      minWidth: 100,
      maxWidth: 180,
      onRender: (item) => `£${item.total ?? '0.00'}`,
    },

    {
      key: 'actions',
      name: '',
      minWidth: 100,
      maxWidth: 120,
      onRender: (item) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Icon
            iconName="Download"
            title="Download PDF"
            style={{ cursor: 'pointer', color: '#0078d4' }}
            onClick={() => {
              console.log('Downloading PDF for:', item);
              generateQuotePdf(item);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: '4px',
          borderRadius: '8px',
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
            Invoice
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
              // setTypeFilter(null)
              setSelectedFilter(null);
              setSearch('');
              setSelectedRole(null);
              setResponseFilter(null);
              setBusinessFilter(null);
              setRefresh(!refresh);
            }}
          >
            <span style={iconStyle}>
              <Icon iconName="Refresh" />
            </span>
            Refresh
          </button>

          {/* <Dropdown
            placeholder="Filter by team"
            options={responseTeamOptions}
            selectedKey={responseFilter}
            onChange={(_, opt) => setResponseFilter(opt?.key as string)}
            styles={{ root: { width: 160 } }}
          />
          {responseFilter && (
            <Icon
              iconName="Cancel"
              style={{ cursor: 'pointer', color: '#666' }}
              onClick={() => setResponseFilter(null)}
            />
          )} */}
        </div>

        <div style={{ display: 'flex', gap: '80px', marginRight: '10px' }}>
          <div style={{ display: 'flex', gap: '0px' }}>
            <SearchBox
              placeholder="Search Quote"
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
                    // setTypeFilter(null)
                    setResponseFilter(null);
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

                {selectedFilter === 'team' && (
                  <Dropdown
                    placeholder="Select team"
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
                    setResponseFilter(tempInput || null);
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
          items={quotes}
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
          disabled={quotes.length < pageSize}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <div style={{ textAlign: 'center' }}>
        Showing {quotes.length} of {total} Quotes
      </div>

      <CreateQuotePanel
        isOpen={isPanelOpen}
        onDismiss={() => {
          setIsPanelOpen(false);
          fetchQuotes();
        }}
      />

      {dueUser && <DuePanel
        isOpen={isDuePanelOpen}
        onDismiss={() => {
          setIsDuePanelOpen(false);
          fetchDues();
        }}
        dueUserItem = {dueUser}
      />}
    </div>
  );
};
