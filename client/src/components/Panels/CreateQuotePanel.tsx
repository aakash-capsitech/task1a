// import {
//   Panel,
//   PanelType,
//   TextField,
//   Dropdown,
//   DatePicker,
//   Stack,
//   IconButton,
//   PrimaryButton,
//   DefaultButton,
//   Label,
//   type IDropdownOption,
// } from '@fluentui/react';
// import { useEffect, useState } from 'react';
// import { Formik, Form, FieldArray, type FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const vatOptions = [
//   { key: '0', text: 'VAT 0%' },
//   { key: '5', text: 'VAT 5%' },
//   { key: '20', text: 'VAT 20%' },
// ];

// const sampleServices = [
//   { key: 'service1', text: 'Consultation' },
//   { key: 'service2', text: 'Filing' },
// ];

// const firstResponseOptions = [
//   { key: 'response1', text: 'Team A' },
//   { key: 'response2', text: 'Team B' },
// ];

// interface QuoteForm {
//   services: any;
//   vatPercentage: number;
//   subtotal: number;
//   vatAmount: number;
//   total: number;
//   businessId: string;
//   date: Date | null;
//   firstResponse?: string;
//   rows: { service?: string; description?: string; amount?: string }[];
//   discountPercent: number;
//   vatPercent: number;
// }

// const validationSchema = Yup.object({
//   businessId: Yup.string().required('Business is required'),
//   date: Yup.date().required('Date is required'),
//   rows: Yup.array()
//     .of(
//       Yup.object({
//         service: Yup.string().required('Service is required'),
//         description: Yup.string().required('Description is required'),
//         amount: Yup.string()
//           .required('Amount is required')
//           .matches(/^\d+(\.\d{1,2})?$/, 'Invalid amount format'),
//       })
//     )
//     .min(1, 'At least one service is required'),
// });

// export const CreateQuotePanel = ({
//   isOpen,
//   onDismiss,
// }: {
//   isOpen: boolean;
//   onDismiss: () => void;
// }) => {
//   const [businessOptions, setBusinessOptions] = useState<IDropdownOption[]>([]);

//   const fetchBusinesses = async () => {
//     try {
//       const res = await axios.get('http://localhost:5153/api/businesses', {
//         params: { page: 1, pageSize: 100 },
//       });
//       const options = (res.data.businesses || []).map((b: any) => ({
//         key: b.id,
//         text: b.businesses?.[0]?.nameOrNumber ?? 'Unnamed',
//       }));
//       setBusinessOptions(options);
//     } catch (err) {
//       console.error('Failed to load businesses', err);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) fetchBusinesses();
//   }, [isOpen]);

//   const initialValues: QuoteForm = {
//     businessId: '',
//     date: new Date(),
//     firstResponse: undefined,
//     rows: [{ service: '', description: '', amount: '' }],
//     discountPercent: 0,
//     vatPercent: 20,
//   };

//   // const handleSubmit = async (
//   //   values: QuoteForm,
//   //   helpers: FormikHelpers<QuoteForm>
//   // ) => {
//   //   console.log('Quote submitted:', values);
//   //   try {
//   //     const response = await axios.post("http://localhost:5153/api/Quotes", values)
//   //     toast.success("Quote added successfully")
//   //   } catch (error) {
//   //     console.log(error)
//   //     toast.error("something went wrong")
//   //   }
//   //   helpers.setSubmitting(false);
//   //   onDismiss();
//   // };

//   const handleSubmit = async (
//   values: QuoteForm,
//   helpers: FormikHelpers<QuoteForm>
// ) => {
//   console.log("Quote submitted:", values);

// const payload = {
//   businessId: values.businessId,
//   date: values.date,
//   firstResponseTeam: values.firstResponse,
//   services: values.services.map(row => ({
//     service: row.service.toLowerCase(),         // must match enum
//     description: row.description,
//     amount: Number(row.amount)                 // ✅ convert string to number
//   })),
//   discountPercentage: values.discountPercent ?? 0,
//   vatPercentage: values.vatPercentage ?? 0,
//   subtotal: values.subtotal ?? 0,
//   vatAmount: values.vatAmount ?? 0,
//   total: values.total ?? 0
// };

// console.log("Final Payload:", payload);

//   try {
//     console.log("🚀 Payload sent to backend:", payload);

//     const response = await axios.post("http://localhost:5153/api/Quotes", payload);
//     toast.success("Quote added successfully");
//   } catch (error) {
//     console.log(error);
//     toast.error("Something went wrong");
//   }

//   helpers.setSubmitting(false);
//   onDismiss();
// };


//   return (
//     <Panel
//       isOpen={isOpen}
//       onDismiss={onDismiss}
//       headerText="Create Quote"
//       closeButtonAriaLabel="Close"
//       type={PanelType.medium}
//       isFooterAtBottom
//     >
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({
//           values,
//           setFieldValue,
//           errors,
//           touched,
//           isSubmitting,
//           handleSubmit,
//         }) => {
//           const subtotal = values.rows.reduce(
//             (sum, row) => sum + (parseFloat(row.amount || '0') || 0),
//             0
//           );
//           const discountAmount = subtotal * (values.discountPercent / 100);
//           const vatAmount = (subtotal - discountAmount) * (values.vatPercent / 100);
//           const total = subtotal - discountAmount + vatAmount;

//           return (
//             <Form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//               <Dropdown
//                 label="Business"
//                 placeholder="Select or search..."
//                 options={businessOptions}
//                 selectedKey={values.businessId}
//                 onChange={(_, opt) => setFieldValue('businessId', opt?.key)}
//                 errorMessage={
//                   touched.businessId && typeof errors.businessId === 'string'
//                     ? errors.businessId
//                     : undefined
//                 }
//                 styles={{ dropdown: { width: '100%' } }}
//                 // Fluent UI searchable dropdown config
//                 calloutProps={{ doNotLayer: true }}
//                 onRenderCaretDown={() => null}
//               />

//               <Stack horizontal tokens={{ childrenGap: 16 }}>
//                 <DatePicker
//                   label="Date"
//                   value={values.date as Date}
//                   onSelectDate={(d) => setFieldValue('date', d)}
//                   styles={{ root: { width: 180 } }}
//                 />
//                 <Dropdown
//                   label="First response"
//                   options={firstResponseOptions}
//                   selectedKey={values.firstResponse}
//                   onChange={(_, opt) => setFieldValue('firstResponse', opt?.key)}
//                   styles={{ root: { width: 200 } }}
//                 />
//               </Stack>

//               <FieldArray name="rows">
//                 {({ remove, push }) => (
//                   <>
//                     {values.rows.map((row, index) => (
//                       <Stack horizontal tokens={{ childrenGap: 8 }} key={index}>
//                         <Dropdown
//                           placeholder="Select service"
//                           options={sampleServices}
//                           selectedKey={row.service}
//                           onChange={(_, opt) =>
//                             setFieldValue(`rows[${index}].service`, opt?.key)
//                           }
//                           styles={{ root: { width: 160 } }}
//                           errorMessage={
//                             touched.rows?.[index]?.service &&
//                             (errors.rows?.[index] as any)?.service
//                           }
//                         />
//                         <TextField
//                           placeholder="Description"
//                           value={row.description}
//                           onChange={(_, val) =>
//                             setFieldValue(`rows[${index}].description`, val)
//                           }
//                           styles={{ root: { flex: 1 } }}
//                           errorMessage={
//                             touched.rows?.[index]?.description &&
//                             (errors.rows?.[index] as any)?.description
//                           }
//                         />
//                         <TextField
//                           type="number"
//                           prefix="£"
//                           value={row.amount}
//                           onChange={(_, val) =>
//                             setFieldValue(`rows[${index}].amount`, val)
//                           }
//                           styles={{ root: { width: 120 } }}
//                           errorMessage={
//                             touched.rows?.[index]?.amount &&
//                             (errors.rows?.[index] as any)?.amount
//                           }
//                         />
//                         <IconButton
//                           iconProps={{ iconName: 'Delete' }}
//                           onClick={() => remove(index)}
//                         />
//                       </Stack>
//                     ))}
//                     <DefaultButton text="+ Add" onClick={() => push({})} />
//                   </>
//                 )}
//               </FieldArray>

//               <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
//                 <Label styles={{ root: { width: 120 } }}>Discount (%)</Label>
//                 <TextField
//                   type="number"
//                   suffix="%"
//                   value={values.discountPercent.toString()}
//                   onChange={(_, val) =>
//                     setFieldValue('discountPercent', parseFloat(val || '0') || 0)
//                   }
//                   styles={{ root: { width: 120 } }}
//                 />
//               </Stack>

//               <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
//                 <Dropdown
//                   label="VAT"
//                   options={vatOptions}
//                   selectedKey={values.vatPercent.toString()}
//                   onChange={(_, opt) =>
//                     setFieldValue('vatPercent', parseInt(opt?.key as string))
//                   }
//                   styles={{ root: { width: 140 } }}
//                 />
//                 <TextField
//                   readOnly
//                   value={`£${vatAmount.toFixed(2)}`}
//                   styles={{ root: { width: 120 } }}
//                 />
//               </Stack>

//               <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
//                 <Label styles={{ root: { width: 100 } }}>Total</Label>
//                 <TextField
//                   readOnly
//                   value={`£${total.toFixed(2)}`}
//                   styles={{ root: { width: 120 } }}
//                 />
//               </Stack>

//               <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="end">
//                 <DefaultButton text="Cancel" onClick={onDismiss} />
//                 <PrimaryButton
//                   text="Save"
//                   onClick={() => {
//                     alert("save clicked")
//                     handleSubmit()}}
//                   disabled={isSubmitting}
//                 />
//               </Stack>
//             </Form>
//           );
//         }}
//       </Formik>
//     </Panel>
//   );
// };



















// import {
//   Panel,
//   PanelType,
//   TextField,
//   Dropdown,
//   DatePicker,
//   Stack,
//   IconButton,
//   PrimaryButton,
//   DefaultButton,
//   Label,
//   type IDropdownOption,
// } from '@fluentui/react';
// import { useEffect, useState } from 'react';
// import { Formik, Form, FieldArray, type FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const vatOptions = [
//   { key: '0', text: 'VAT 0%' },
//   { key: '5', text: 'VAT 5%' },
//   { key: '20', text: 'VAT 20%' },
// ];

// const sampleServices = [
//   { key: 'Consultation', text: 'Consultation' },
//   { key: 'Filing', text: 'Filing' },
//   // { key: 'Training', text: 'Training' },
// ];


// const firstResponseOptions = [
//   { key: 'response1', text: 'Team A' },
//   { key: 'response2', text: 'Team B' },
// ];

// interface QuoteForm {
//   vatPercentage: number;
//   subtotal: number;
//   vatAmount: number;
//   total: number;
//   businessId: string;
//   date: Date | null;
//   firstResponse?: string;
//   rows: { service?: string; description?: string; amount?: string }[];
//   discountPercent: number;
//   vatPercent: number;
// }

// const validationSchema = Yup.object({
//   businessId: Yup.string().required('Business is required'),
//   date: Yup.date().required('Date is required'),
//   rows: Yup.array()
//     .of(
//       Yup.object({
//         service: Yup.string().required('Service is required'),
//         description: Yup.string().required('Description is required'),
//         amount: Yup.string()
//           .required('Amount is required')
//           .matches(/^\d+(\.\d{1,2})?$/, 'Invalid amount format'),
//       })
//     )
//     .min(1, 'At least one service is required'),
// });

// export const CreateQuotePanel = ({
//   isOpen,
//   onDismiss,
// }: {
//   isOpen: boolean;
//   onDismiss: () => void;
// }) => {
//   const [businessOptions, setBusinessOptions] = useState<IDropdownOption[]>([]);

//   const fetchBusinesses = async () => {
//     try {
//       const res = await axios.get('http://localhost:5153/api/businesses', {
//         params: { page: 1, pageSize: 100 },
//       });
//       const options = (res.data.businesses || []).map((b: any) => ({
//         key: b.id,
//         text: b.businesses?.[0]?.nameOrNumber ?? 'Unnamed',
//       }));
//       setBusinessOptions(options);
//     } catch (err) {
//       console.error('Failed to load businesses', err);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) fetchBusinesses();
//   }, [isOpen]);

//   const initialValues: QuoteForm = {
//     businessId: '',
//     date: new Date(),
//     firstResponse: undefined,
//     rows: [{ service: '', description: '', amount: '' }],
//     discountPercent: 0,
//     vatPercent: 20,
//     vatPercentage: 0,
//     subtotal: 0,
//     vatAmount: 0,
//     total: 0,
//   };

//   const handleSubmit = async (
//   values: QuoteForm,
//   helpers: FormikHelpers<QuoteForm>
// ) => {
//   const subtotal = values.rows.reduce(
//     (sum, row) => sum + (parseFloat(row.amount || '0') || 0),
//     0
//   );
//   const discountAmount = subtotal * (values.discountPercent / 100);
//   const vatAmount = (subtotal - discountAmount) * (values.vatPercent / 100);
//   const total = subtotal - discountAmount + vatAmount;

//   const dto = {
//     businessId: values.businessId,
//     date: values.date,
//     firstResponseTeam: values.firstResponse ?? '', // required
//     services: values.rows.map((row) => ({
//       service: row.service as string, // must match enum exactly
//       description: row.description ?? '',
//       amount: parseFloat(row.amount || '0'),
//     })),
//     discountPercentage: values.discountPercent,
//     vatPercentage: values.vatPercent,
//     subtotal,
//     vatAmount,
//     total,
//   };

//   console.log('Final Payload:', dto);

//   try {
//     await axios.post('http://localhost:5153/api/Quotes', dto); // NO dto wrapper
//     toast.success('Quote added successfully');
//     onDismiss();
//   } catch (error) {
//     console.error(error);
//     toast.error('Something went wrong');
//   }

//   helpers.setSubmitting(false);
// };


//   return (
//     <Panel
//       isOpen={isOpen}
//       onDismiss={onDismiss}
//       headerText="Create Invoice"
//       closeButtonAriaLabel="Close"
//       type={PanelType.medium}
//       isFooterAtBottom
//     >
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({
//           values,
//           setFieldValue,
//           errors,
//           touched,
//           isSubmitting,
//           handleSubmit,
//         }) => {
//           const subtotal = values.rows.reduce(
//             (sum, row) => sum + (parseFloat(row.amount || '0') || 0),
//             0
//           );
//           const discountAmount = subtotal * (values.discountPercent / 100);
//           const vatAmount = (subtotal - discountAmount) * (values.vatPercent / 100);
//           const total = subtotal - discountAmount + vatAmount;

//           return (
//             <Form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//               <Dropdown
//                 label="Business"
//                 placeholder="Select or search..."
//                 options={businessOptions}
//                 selectedKey={values.businessId}
//                 onChange={(_, opt) => setFieldValue('businessId', opt?.key)}
//                 errorMessage={
//                   touched.businessId && typeof errors.businessId === 'string'
//                     ? errors.businessId
//                     : undefined
//                 }
//                 styles={{ dropdown: { width: '100%' } }}
//               />

//               <Stack horizontal tokens={{ childrenGap: 16 }}>
//                 <DatePicker
//                   label="Date"
//                   value={values.date as Date}
//                   onSelectDate={(d) => setFieldValue('date', d)}
//                   styles={{ root: { width: 180 } }}
//                 />
//                 <Dropdown
//                   label="First response"
//                   options={firstResponseOptions}
//                   selectedKey={values.firstResponse}
//                   onChange={(_, opt) => setFieldValue('firstResponse', opt?.key)}
//                   styles={{ root: { width: 200 } }}
//                 />
//               </Stack>

//               <FieldArray name="rows">
//                 {({ remove, push }) => (
//                   <>
//                     {values.rows.map((row, index) => (
//                       <Stack horizontal tokens={{ childrenGap: 8 }} key={index}>
//                         <Dropdown
//                           placeholder="Select service"
//                           options={sampleServices}
//                           selectedKey={row.service}
//                           onChange={(_, opt) =>
//                             setFieldValue(`rows[${index}].service`, opt?.key)
//                           }
//                           styles={{ root: { width: 160 } }}
//                           errorMessage={
//                             touched.rows?.[index]?.service &&
//                             (errors.rows?.[index] as any)?.service
//                           }
//                         />
//                         <TextField
//                           placeholder="Description"
//                           value={row.description}
//                           onChange={(_, val) =>
//                             setFieldValue(`rows[${index}].description`, val)
//                           }
//                           styles={{ root: { flex: 1 } }}
//                           errorMessage={
//                             touched.rows?.[index]?.description &&
//                             (errors.rows?.[index] as any)?.description
//                           }
//                         />
//                         <TextField
//                           type="number"
//                           prefix="£"
//                           value={row.amount}
//                           onChange={(_, val) =>
//                             setFieldValue(`rows[${index}].amount`, val)
//                           }
//                           styles={{ root: { width: 120 } }}
//                           errorMessage={
//                             touched.rows?.[index]?.amount &&
//                             (errors.rows?.[index] as any)?.amount
//                           }
//                         />
//                         <IconButton
//                           iconProps={{ iconName: 'Delete' }}
//                           onClick={() => remove(index)}
//                         />
//                       </Stack>
//                     ))}
//                     <DefaultButton
//                       text="+ Add"
//                       onClick={() =>
//                         push({ service: '', description: '', amount: '' })
//                       }
//                     />
//                   </>
//                 )}
//               </FieldArray>

//               <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
//                 <Label styles={{ root: { width: 120 } }}>Discount (%)</Label>
//                 <TextField
//                   type="number"
//                   suffix="%"
//                   value={values.discountPercent.toString()}
//                   onChange={(_, val) =>
//                     setFieldValue('discountPercent', parseFloat(val || '0') || 0)
//                   }
//                   styles={{ root: { width: 120 } }}
//                 />
//               </Stack>

//               <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
//                 <Dropdown
//                   label="VAT"
//                   options={vatOptions}
//                   selectedKey={values.vatPercent.toString()}
//                   onChange={(_, opt) =>
//                     setFieldValue('vatPercent', parseInt(opt?.key as string))
//                   }
//                   styles={{ root: { width: 140 } }}
//                 />
//                 <TextField
//                   readOnly
//                   value={`£${vatAmount.toFixed(2)}`}
//                   styles={{ root: { width: 120 } }}
//                 />
//               </Stack>

//               <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
//                 <Label styles={{ root: { width: 100 } }}>Total</Label>
//                 <TextField
//                   readOnly
//                   value={`£${total.toFixed(2)}`}
//                   styles={{ root: { width: 120 } }}
//                 />
//               </Stack>

//               <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="end">

//                 <div
//           style={{
//             position: 'fixed',
//             bottom: '16px',
//             right: '16px',
//             background: 'white',
//             padding: '8px',
//             zIndex: 1000, // to be on top of other UI
//             // boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
//             // borderTop: '1px solid #eee',
//           }}
//         >
//                 <DefaultButton text="Cancel" onClick={onDismiss} style={{marginRight: "10px"}} />
//                 <PrimaryButton
//                   text="Save"
//                   onClick={() => handleSubmit()}
//                   disabled={isSubmitting}
//                 />

//                 </div>
//               </Stack>
//             </Form>
//           );
//         }}
//       </Formik>
//     </Panel>
//   );
// };


























import {
  Panel,
  PanelType,
  TextField,
  Dropdown,
  DatePicker,
  Stack,
  IconButton,
  PrimaryButton,
  DefaultButton,
  Label,
  type IDropdownOption,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { Formik, Form, FieldArray, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const vatOptions = [
  { key: '0', text: 'VAT 0%' },
  { key: '5', text: 'VAT 5%' },
  { key: '20', text: 'VAT 20%' },
];

const sampleServices = [
  { key: 'Consultation', text: 'Consultation' },
  { key: 'Filing', text: 'Filing' },
  // { key: 'Training', text: 'Training' },
];

const firstResponseOptions = [
  { key: 'response1', text: 'Team A' },
  { key: 'response2', text: 'Team B' },
];

interface QuoteForm {
  vatPercentage: number;
  subtotal: number;
  vatAmount: number;
  total: number;
  businessId: string;
  date: Date | null;
  firstResponse?: string;
  rows: { service?: string; description?: string; amount?: string }[];
  discountPercent: number;
  vatPercent: number;
}

interface CalculationResponse {
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  total: number;
}

const validationSchema = Yup.object({
  businessId: Yup.string().required('Business is required'),
  date: Yup.date().required('Date is required'),
  rows: Yup.array()
    .of(
      Yup.object({
        service: Yup.string().required('Service is required'),
        description: Yup.string().required('Description is required'),
        amount: Yup.string()
          .required('Amount is required')
          .matches(/^\d+(\.\d{1,2})?$/, 'Invalid amount format'),
      })
    )
    .min(1, 'At least one service is required'),
});

export const CreateQuotePanel = ({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean;
  onDismiss: () => void;
}) => {
  const [businessOptions, setBusinessOptions] = useState<IDropdownOption[]>([]);
  const [calculations, setCalculations] = useState<CalculationResponse>({
    subtotal: 0,
    discountAmount: 0,
    vatAmount: 0,
    total: 0,
  });

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('http://localhost:5153/api/businesses', {
        params: { page: 1, pageSize: 100 },
      });
      const options = (res.data.businesses || []).map((b: any) => ({
        key: b.id,
        text: b.businesses?.[0]?.nameOrNumber ?? 'Unnamed',
      }));
      setBusinessOptions(options);
    } catch (err) {
      console.error('Failed to load businesses', err);
    }
  };

  const calculateTotals = async (
    rows: { service?: string; description?: string; amount?: string }[],
    discountPercent: number,
    vatPercent: number
  ) => {
    try {
      const services = rows.map((row) => ({
        service: row.service || '',
        description: row.description || '',
        amount: parseFloat(row.amount || '0') || 0,
      }));

      console.log(services)

      const response = await axios.post('http://localhost:5153/api/quotes/calc', {
        services,
        discountPercentage: discountPercent,
        vatPercentage: vatPercent,
      });

      setCalculations(response.data);
    } catch (error) {
      console.error('Failed to calculate totals', error);
      // Fallback to frontend calculation in case of error
      const subtotal = rows.reduce(
        (sum, row) => sum + (parseFloat(row.amount || '0') || 0),
        0
      );
      const discountAmount = subtotal * (discountPercent / 100);
      const vatAmount = (subtotal - discountAmount) * (vatPercent / 100);
      const total = subtotal - discountAmount + vatAmount;
      
      setCalculations({
        subtotal,
        discountAmount,
        vatAmount,
        total,
      });
    }
  };

  useEffect(() => {
    if (isOpen) fetchBusinesses();
  }, [isOpen]);

  const initialValues: QuoteForm = {
    businessId: '',
    date: new Date(),
    firstResponse: undefined,
    rows: [{ service: '', description: '', amount: '' }],
    discountPercent: 0,
    vatPercent: 20,
    vatPercentage: 0,
    subtotal: 0,
    vatAmount: 0,
    total: 0,
  };

  const handleSubmit = async (
    values: QuoteForm,
    helpers: FormikHelpers<QuoteForm>
  ) => {
    const dto = {
      businessId: values.businessId,
      date: values.date,
      firstResponseTeam: values.firstResponse ?? '', // required
      services: values.rows.map((row) => ({
        service: row.service as string, // must match enum exactly
        description: row.description ?? '',
        amount: parseFloat(row.amount || '0'),
      })),
      discountPercentage: values.discountPercent,
      vatPercentage: values.vatPercent,
      subtotal: calculations.subtotal,
      vatAmount: calculations.vatAmount,
      total: calculations.total,
    };

    console.log('Final Payload:', dto);

    try {
      await axios.post('http://localhost:5153/api/Quotes', dto); // NO dto wrapper
      toast.success('Quote added successfully');
      onDismiss();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }

    helpers.setSubmitting(false);
  };

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Create Invoice"
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      isFooterAtBottom
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
        }) => {
          // Trigger calculation whenever rows, discount, or VAT changes
          useEffect(() => {
            if (values.rows.length > 0) {
              calculateTotals(values.rows, values.discountPercent, values.vatPercent);
            }
          }, [values.rows, values.discountPercent, values.vatPercent]);

          return (
            <Form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Dropdown
                label="Business"
                placeholder="Select or search..."
                options={businessOptions}
                selectedKey={values.businessId}
                onChange={(_, opt) => setFieldValue('businessId', opt?.key)}
                errorMessage={
                  touched.businessId && typeof errors.businessId === 'string'
                    ? errors.businessId
                    : undefined
                }
                styles={{ dropdown: { width: '100%' } }}
              />

              <Stack horizontal tokens={{ childrenGap: 16 }}>
                <DatePicker
                  label="Date"
                  value={values.date as Date}
                  onSelectDate={(d) => setFieldValue('date', d)}
                  styles={{ root: { width: 180 } }}
                />
                <Dropdown
                  label="First response"
                  options={firstResponseOptions}
                  selectedKey={values.firstResponse}
                  onChange={(_, opt) => setFieldValue('firstResponse', opt?.key)}
                  styles={{ root: { width: 200 } }}
                />
              </Stack>

              <FieldArray name="rows">
                {({ remove, push }) => (
                  <>
                    {values.rows.map((row, index) => (
                      <Stack horizontal tokens={{ childrenGap: 8 }} key={index}>
                        <Dropdown
                          placeholder="Select service"
                          options={sampleServices}
                          selectedKey={row.service}
                          onChange={(_, opt) =>
                            setFieldValue(`rows[${index}].service`, opt?.key)
                          }
                          styles={{ root: { width: 160 } }}
                          errorMessage={
                            touched.rows?.[index]?.service &&
                            (errors.rows?.[index] as any)?.service
                          }
                        />
                        <TextField
                          placeholder="Description"
                          value={row.description}
                          onChange={(_, val) =>
                            setFieldValue(`rows[${index}].description`, val)
                          }
                          styles={{ root: { flex: 1 } }}
                          errorMessage={
                            touched.rows?.[index]?.description &&
                            (errors.rows?.[index] as any)?.description
                          }
                        />
                        <TextField
                          type="number"
                          prefix="£"
                          value={row.amount}
                          onChange={(_, val) =>
                            setFieldValue(`rows[${index}].amount`, val)
                          }
                          styles={{ root: { width: 120 } }}
                          errorMessage={
                            touched.rows?.[index]?.amount &&
                            (errors.rows?.[index] as any)?.amount
                          }
                        />
                        <IconButton
                          iconProps={{ iconName: 'Delete' }}
                          onClick={() => remove(index)}
                        />
                      </Stack>
                    ))}
                    <DefaultButton
                      text="+ Add"
                      onClick={() =>
                        push({ service: '', description: '', amount: '' })
                      }
                    />
                  </>
                )}
              </FieldArray>

              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                <Label styles={{ root: { width: 120 } }}>Discount (%)</Label>
                <TextField
                  type="number"
                  suffix="%"
                  value={values.discountPercent.toString()}
                  onChange={(_, val) =>
                    setFieldValue('discountPercent', parseFloat(val || '0') || 0)
                  }
                  styles={{ root: { width: 120 } }}
                />
              </Stack>

              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                <Dropdown
                  label="VAT"
                  options={vatOptions}
                  selectedKey={values.vatPercent.toString()}
                  onChange={(_, opt) =>
                    setFieldValue('vatPercent', parseInt(opt?.key as string))
                  }
                  styles={{ root: { width: 140 } }}
                />
                <TextField
                  readOnly
                  value={`£${calculations.vatAmount.toFixed(2)}`}
                  styles={{ root: { width: 120 } }}
                />
              </Stack>

              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                <Label styles={{ root: { width: 100 } }}>Subtotal</Label>
                <TextField
                  readOnly
                  value={`£${calculations.subtotal.toFixed(2)}`}
                  styles={{ root: { width: 120 } }}
                />
              </Stack>

              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                <Label styles={{ root: { width: 100 } }}>Discount</Label>
                <TextField
                  readOnly
                  value={`£${calculations.discountAmount.toFixed(2)}`}
                  styles={{ root: { width: 120 } }}
                />
              </Stack>

              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                <Label styles={{ root: { width: 100 } }}>Total</Label>
                <TextField
                  readOnly
                  value={`£${calculations.total.toFixed(2)}`}
                  styles={{ root: { width: 120 } }}
                />
              </Stack>

              <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="end">
                <div
                  style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                    background: 'white',
                    padding: '8px',
                    zIndex: 1000, // to be on top of other UI
                    // boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
                    // borderTop: '1px solid #eee',
                  }}
                >
                  <DefaultButton text="Cancel" onClick={onDismiss} style={{marginRight: "10px"}} />
                  <PrimaryButton
                    text="Save"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                  />
                </div>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Panel>
  );
};