// import {
//   DetailsList,
//   type IColumn,
//   PrimaryButton,
//   Dropdown,
//   type IDropdownOption,
//   Icon,
//   SearchBox,
//   SelectionMode,
// } from '@fluentui/react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { CreateQuotePanel } from '../Panels/CreateQuotePanel';

// const responseTeamOptions: IDropdownOption[] = [
//   { key: 'TeamA', text: 'Team A' },
//   { key: 'TeamB', text: 'Team B' },
// ];

// export const QuoteTable = () => {
//   const [Quotes, setQuotes] = useState<any[]>([]);
//   const [isPanelOpen, setIsPanelOpen] = useState(false);

//   const [search, setSearch] = useState('');
//   const [searchValue, setSearchValue] = useState('');
//   const [businessFilter, setBusinessFilter] = useState<string | null>(null);
//   const [responseFilter, setResponseFilter] = useState<string | null>(null);

//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(5);
//   const [total, setTotal] = useState(0);

//   const fetchQuotes = async () => {
//     try {
//       const res = await axios.get('http://localhost:5153/api/quotes', {
//         params: {
//           page,
//           pageSize,
//           search,
//           business: businessFilter || undefined,
//           responseTeam: responseFilter || undefined,
//         },
//       });

//       setQuotes(res.data.quotes || []);
//       setTotal(res.data.total || 0);
//       console.log(res.data)
//     } catch (err) {
//       toast.error('Failed to load quotes');
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchQuotes();
//   }, [page, search, businessFilter, responseFilter]);

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.put(`http://localhost:5153/api/Quotes/delete/${id}`);
//       toast.warn('Quote deleted');
//       fetchQuotes();
//     } catch (err) {
//       toast.error('Delete failed');
//     }
//   };

//   const columns: IColumn[] = [
//     {
//       key: 'businessName',
//       name: 'Business',
//       minWidth: 150,
//       maxWidth: 180,
//       onRender: (item) => item.businessName || '-',
//     },
//     {
//       key: 'date',
//       name: 'Date',
//       minWidth: 100,
//       maxWidth: 180,
//       onRender: (item) =>
//         item.date ? new Date(item.date).toLocaleDateString() : '-',
//     },
//     {
//       key: 'team',
//       name: 'Response Team',
//       minWidth: 120,
//       maxWidth: 180,
//       fieldName: 'firstResponseTeam',
//     },
//     {
//       key: 'subtotal',
//       name: 'Subtotal',
//       minWidth: 100,
//       maxWidth: 180,
//       onRender: (item) => `£${item.subtotal?.toFixed(2) || '0.00'}`,
//     },
//     {
//       key: 'discount',
//       name: 'Discount %',
//       minWidth: 100,
//       maxWidth: 180,
//       fieldName: 'discountPercentage',
//     },
//     {
//       key: 'vat',
//       name: 'VAT %',
//       minWidth: 80,
//       maxWidth: 180,
//       fieldName: 'vatPercentage',
//     },
//     {
//       key: 'total',
//       name: 'Total',
//       minWidth: 100,
//       maxWidth: 180,
//       onRender: (item) => `£${item.total?.toFixed(2) || '0.00'}`,
//     },
//     {
//       key: 'actions',
//       name: '',
//       minWidth: 50,
//       maxWidth: 80,
//       onRender: (item) => (
//         <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)}>
//           <Icon iconName="Delete" style={{ color: 'red' }} />
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           backgroundColor: 'white',
//           padding: '12px',
//           borderRadius: '8px',
//         }}
//       >
//         <div style={{ display: 'flex', gap: '12px' }}>
//           <PrimaryButton text="Add Invoice" onClick={() => setIsPanelOpen(true)} />
//           <Dropdown
//             placeholder="Filter by team"
//             options={responseTeamOptions}
//             selectedKey={responseFilter}
//             onChange={(_, opt) => setResponseFilter(opt?.key as string)}
//             styles={{ root: { width: 160 } }}
//           />
//           {responseFilter && (
//             <Icon
//               iconName="Cancel"
//               style={{ cursor: 'pointer', color: '#666' }}
//               onClick={() => setResponseFilter(null)}
//             />
//           )}
//         </div>

//         <div style={{ display: 'flex', gap: '8px' }}>
//           <SearchBox
//             placeholder="Search Quote"
//             value={searchValue}
//             onChange={(_, val) => setSearchValue(val || '')}
//           />
//           <PrimaryButton
//             text="Apply"
//             onClick={() => {
//               setSearch(searchValue);
//               setPage(1);
//             }}
//           />
//         </div>
//       </div>

//       <div
//         style={{
//           backgroundColor: 'white',
//           borderRadius: '8px',
//           boxShadow: '0 0 4px rgba(0,0,0,0.05)',
//         }}
//       >
//         <DetailsList
//           items={Quotes}
//           columns={columns}
//           selectionMode={SelectionMode.none}
//           compact
//           styles={{
//             root: {
//               selectors: {
//                 '.ms-DetailsHeader': { background: '#f3f2f1' },
//                 '.ms-DetailsRow': { minHeight: 32 },
//                 '.ms-DetailsRow-cell': {
//                   padding: '6px 8px',
//                   fontSize: '13px',
//                 },
//               },
//             },
//           }}
//         />
//       </div>

//       {/* Pagination */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Previous
//         </button>
//         <span>Page {page}</span>
//         <button
//           disabled={Quotes.length < pageSize}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>

//       <div style={{ textAlign: 'center' }}>
//         Showing {Quotes.length} of {total} Quotes
//       </div>

//       {/* Add panel */}
//       <CreateQuotePanel
//         isOpen={isPanelOpen}
//         onDismiss={() => {
//           setIsPanelOpen(false);
//           fetchQuotes();
//         }}
//       />
//     </div>
//   );
// };

































// import {
//   DetailsList,
//   type IColumn,
//   PrimaryButton,
//   Dropdown,
//   type IDropdownOption,
//   Icon,
//   SearchBox,
//   SelectionMode,
// } from '@fluentui/react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { CreateQuotePanel } from '../Panels/CreateQuotePanel';

// import jsPDF from 'jspdf';

// const responseTeamOptions: IDropdownOption[] = [
//   { key: 'TeamA', text: 'Team A' },
//   { key: 'TeamB', text: 'Team B' },
// ];

// ✅ Keep imports here




import {
  DetailsList,
  type IColumn,
  PrimaryButton,
  Dropdown,
  type IDropdownOption,
  Icon,
  SearchBox,
  SelectionMode,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateQuotePanel } from '../Panels/CreateQuotePanel';

import jsPDF from 'jspdf';

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

// ✅ ⬇️ Move this function here, outside QuoteTable
export const generateQuotePdf = (quote: any) => {
   const {
    businessName,
    firstResponseTeam,
    date,
    services = [], // default to empty array
    discountPercentage,
    vatPercentage,
    subtotal,
    vatAmount,
    total,
  } = quote;

  if (!services.length) {
    console.warn("No services found for quote:", quote.id);
    // Optional: Show a toast or fallback message
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
        doc.text(`- ${s.service || 'No service'}`, 25, 90 + quote.services.length * 10 + idx*10);

    doc.text(`- ${s.description || 'No description'} | £${s.amount}`, 25, y);
  });

  const finalY = 110 + quote.services.length * 10;

  doc.text(`Subtotal: £${quote.subtotal}`, 20, finalY + 10);
  doc.text(`Discount: ${quote.discountPercentage}%`, 20, finalY + 20);
  doc.text(`VAT: ${quote.vatPercentage}% (£${quote.vatAmount})`, 20, finalY + 30);
  doc.text(`Total: £${quote.total}`, 20, finalY + 40);

  doc.save(`Quote_${quote.id}.pdf`);
};

const responseTeamOptions: IDropdownOption[] = [
  { key: 'TeamA', text: 'Team A' },
  { key: 'TeamB', text: 'Team B' },
];

export const QuoteTable = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [businessFilter, setBusinessFilter] = useState<string | null>(null);
  const [responseFilter, setResponseFilter] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get('http://localhost:5153/api/quotes', {
        params: {
          page,
          pageSize,
          search,
          business: businessFilter || undefined,
          responseTeam: responseFilter || undefined,
        },
      });

      setQuotes(res.data.quotes || []);
      console.log(res.data)
      setTotal(res.data.total || 0);
    } catch (err) {
      toast.error('Failed to load quotes');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [page, search, businessFilter, responseFilter]);

  const handleDelete = async (id: string) => {
    try {
      await axios.put(`http://localhost:5153/api/Quotes/delete/${id}`);
      toast.warn('Quote deleted');
      fetchQuotes();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const columns: IColumn[] = [
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
    // {
    //   key: 'actions',
    //   name: '',
    //   minWidth: 50,
    //   maxWidth: 80,
    //   onRender: (item) => (
    //     <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)}>
    //       <Icon iconName="Delete" style={{ color: 'red' }} />
    //     </span>
    //   ),
    // },

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
    generateQuotePdf(item)}}
/>

      {/* <Icon
        iconName="Delete"
        title="Delete"
        style={{ cursor: 'pointer', color: 'red' }}
        onClick={() => handleDelete(item.id)}
      /> */}
    </div>
  ),
}

  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* <PrimaryButton text="Add Invoice" onClick={() => setIsPanelOpen(true)} /> */}

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
            
          <Dropdown
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
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
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
          // styles={{
          //   root: {
          //     selectors: {
          //       '.ms-DetailsHeader': { background: '#f3f2f1' },
          //       '.ms-DetailsRow': { minHeight: 32 },
          //       '.ms-DetailsRow-cell': {
          //         padding: '6px 8px',
          //         fontSize: '13px',
          //       },
          //     },
          //   },
          // }}
          styles={{
              root: {
                width: '100%',
                selectors: {
                  '.ms-DetailsHeader': { backgroundColor: '#f3f2f1', paddingTop: "0px", paddingBottom: "0px", border: "none" },
                  '.ms-DetailsHeader-cell': {
                    color: '#004578',
                    fontWeight: 600,
                    fontSize: '13px',
                    // borderBottom: '1px solid #ccc',
                    // paddingTop: '0 px !important'
                    
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
                    display: "flex",
                    alignItems: "center"
                  },
                },
              },
            }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
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
    </div>
  );
};
