// import {
//   Panel,
//   PanelType,
//   Dropdown,
//   TextField,
//   PrimaryButton,
//   DefaultButton,
//   Stack,
//   IconButton,
//   Label,
// } from '@fluentui/react';
// import { useState } from 'react';

// const businessTypes = [
//   { key: 'limited', text: 'Limited' },
//   { key: 'individual', text: 'Individual' },
// ];

// const modeOptions = [
//   { key: 'livechat', text: 'Live chat' },
//   { key: 'email', text: 'Email' },
//   { key: 'phone', text: 'Phone' },
// ];

// const typeOptions = [
//   { key: 'work', text: 'Work' },
//   { key: 'home', text: 'Home' },
//   { key: 'mobile', text: 'Mobile' },
// ];

// export const AddBusinessPanel = ({ isOpen, onDismiss }: { isOpen: boolean; onDismiss: () => void }) => {
//   const [businesses, setBusinesses] = useState([{ type: 'limited', nameOrNumber: '' }]);
//   const [showContact, setShowContact] = useState(false);
//   const [phoneFields, setPhoneFields] = useState([{ value: '', type: 'work' }]);
//   const [emailFields, setEmailFields] = useState([{ value: '', type: 'work' }]);

//   const [ isAliasOpen, setIsAliasOpen ] = useState(false)

//   const addBusiness = () => setBusinesses([...businesses, { type: 'limited', nameOrNumber: '' }]);
//   const removeBusiness = (index: number) => setBusinesses(businesses.filter((_, i) => i !== index));

//   const updatePhone = (index: number, field: string, value: string) => {
//     const updated = [...phoneFields];
//     (updated[index] as any)[field] = value;
//     setPhoneFields(updated);
//   };

//   const updateEmail = (index: number, field: string, value: string) => {
//     const updated = [...emailFields];
//     (updated[index] as any)[field] = value;
//     setEmailFields(updated);
//   };

//   return (
//     <Panel
//       isOpen={isOpen}
//       onDismiss={onDismiss}
//       headerText="Add business"
//       closeButtonAriaLabel="Close"
//       type={PanelType.medium}
//       onRenderFooterContent={() => (
//         <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}>
//           <DefaultButton text="Cancel" onClick={onDismiss} />
//           <PrimaryButton text="Save" onClick={() => {}} />
//         </Stack>
//       )}
//       isFooterAtBottom
//     >
//       <Stack tokens={{ childrenGap: 16 }}>
//         {businesses.map((b, idx) => (
//           <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="end" key={idx}>
//             <Dropdown
//               label="Type"
//               options={businessTypes}
//               selectedKey={b.type}
//               onChange={(_, option) => {
//                 const updated = [...businesses];
//                 updated[idx].type = option?.key as string;
//                 setBusinesses(updated);
//               }}
//               styles={{ root: { width: 180 } }}
//             />
//             <TextField
//               label="Business name or number"
//               value={b.nameOrNumber}
//               onChange={(_, val) => {
//                 const updated = [...businesses];
//                 updated[idx].nameOrNumber = val ?? '';
//                 setBusinesses(updated);
//               }}
//               styles={{ root: { flex: 1 } }}
//             />
//             {idx === businesses.length - 1 ? (
//               <IconButton iconProps={{ iconName: 'Add' }} onClick={addBusiness} />
//             ) : (
//               <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => removeBusiness(idx)} />
//             )}
//           </Stack>
//         ))}

//         <DefaultButton
//           text={showContact ? '− Contact' : '+ Contact'}
//           onClick={() => setShowContact(!showContact)}
//         />

//         {showContact && (
//           <>
//               <>
//                 <Stack horizontal tokens={{ childrenGap: 8 }}>
//                   <TextField label="First name" styles={{ root: { flex: 1 } }} />
//                   <TextField label="Last name" styles={{ root: { flex: 1 } }} />
//                   {!isAliasOpen && <DefaultButton text="+Alias" onClick={()=>{
//                     setIsAliasOpen(true)
//                   }} />}
//                   {isAliasOpen && <TextField label="Alias" styles={{ root: { flex: 1 } }} />}
//                 </Stack>

//                 <Stack horizontal tokens={{ childrenGap: 8 }}>
//                   <TextField label="Designation" styles={{ root: { flex: 1 } }} />
//                   <Dropdown label="Mode" options={modeOptions} selectedKey="livechat" styles={{ root: { width: 200 } }} />
//                 </Stack>

//                 <Label>Phone number</Label>
//                 {phoneFields.map((p, idx) => (
//                   <Stack horizontal tokens={{ childrenGap: 8 }} key={idx}>
//                     <TextField
//                       value={p.value}
//                       onChange={(_, val) => updatePhone(idx, 'value', val ?? '')}
//                       styles={{ root: { flex: 1 } }}
//                     />
//                     <Dropdown
//                       options={typeOptions}
//                       selectedKey={p.type}
//                       onChange={(_, opt) => updatePhone(idx, 'type', opt?.key as string)}
//                       styles={{ root: { width: 120 } }}
//                     />
//                     {idx === phoneFields.length - 1 ? (
//                       <IconButton iconProps={{ iconName: 'Add' }} onClick={() => setPhoneFields([...phoneFields, { value: '', type: 'work' }])} />
//                     ) : (
//                       <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => setPhoneFields(phoneFields.filter((_, i) => i !== idx))} />
//                     )}
//                   </Stack>
//                 ))}

//                 <Label>Email</Label>
//                 {emailFields.map((e, idx) => (
//                   <Stack horizontal tokens={{ childrenGap: 8 }} key={idx}>
//                     <TextField
//                       value={e.value}
//                       onChange={(_, val) => updateEmail(idx, 'value', val ?? '')}
//                       styles={{ root: { flex: 1 } }}
//                     />
//                     <Dropdown
//                       options={typeOptions}
//                       selectedKey={e.type}
//                       onChange={(_, opt) => updateEmail(idx, 'type', opt?.key as string)}
//                       styles={{ root: { width: 120 } }}
//                     />
//                     {idx === emailFields.length - 1 ? (
//                       <IconButton iconProps={{ iconName: 'Add' }} onClick={() => setEmailFields([...emailFields, { value: '', type: 'work' }])} />
//                     ) : (
//                       <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => setEmailFields(emailFields.filter((_, i) => i !== idx))} />
//                     )}
//                   </Stack>
//                 ))}

//                 <TextField label="Notes" multiline rows={3} />
//               </>
//           </>
//         )}
//       </Stack>
//     </Panel>
//   );
// };
















































import {
  Panel,
  PanelType,
  Dropdown,
  TextField,
  PrimaryButton,
  DefaultButton,
  Stack,
  IconButton,
  Label,
  type IDropdownOption,
} from '@fluentui/react';
import { Formik, Form, FieldArray, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const businessTypes: IDropdownOption[] = [
  { key: 'limited', text: 'Limited' },
  { key: 'individual', text: 'Individual' },
];

const modeOptions: IDropdownOption[] = [
  { key: 'livechat', text: 'Live chat' },
  { key: 'email', text: 'Email' },
  { key: 'phone', text: 'Phone' },
];

const typeOptions: IDropdownOption[] = [
  { key: 'work', text: 'Work' },
  { key: 'home', text: 'Home' },
  { key: 'mobile', text: 'Mobile' },
];

interface Address {
  building: string;
  street: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
}

interface Contact {
  firstName: string;
  lastName: string;
  alias: string;
  designation: string;
  mode: string;
  phoneNumbers: Array<{ value: string; type: string }>;
  emails: Array<{ value: string; type: string }>;
  notes: string;
}

interface BusinessEntry {
  type: 'limited' | 'individual';
  nameOrNumber: string;
  address?: Address;
}

interface FormValues {
  businesses: BusinessEntry[];
  contact?: Contact;
}

const getInitialValues = (): FormValues => ({
  businesses: [
    {
      type: 'limited',
      nameOrNumber: '',
    },
  ],
});

export const AddBusinessPanel = ({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean;
  onDismiss: () => void;
}) => {
  const [showContact, setShowContact] = useState(false);
  const [isAliasOpen, setIsAliasOpen] = useState(false);
  const [phoneFields, setPhoneFields] = useState([{ value: '', type: 'work' }]);
  const [emailFields, setEmailFields] = useState([{ value: '', type: 'work' }]);
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    alias: '',
    designation: '',
    mode: 'livechat',
    notes: '',
  });

  const handleFormSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const payload = {
        businesses: values.businesses,
        ...(showContact && {
          contact: {
            ...contactData,
            phoneNumbers: phoneFields.filter((p) => p.value.trim() !== ''),
            emails: emailFields.filter((e) => e.value.trim() !== ''),
          },
        }),
      };

      await axios.post('http://localhost:5153/api/businesses', payload);
      toast.success('Business added successfully');

      helpers.resetForm();
      setShowContact(false);
      setIsAliasOpen(false);
      setPhoneFields([{ value: '', type: 'work' }]);
      setEmailFields([{ value: '', type: 'work' }]);
      setContactData({
        firstName: '',
        lastName: '',
        alias: '',
        designation: '',
        mode: 'livechat',
        notes: '',
      });

      onDismiss();
    } catch (error) {
      console.error('Error adding business:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Add business"
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      isFooterAtBottom
    >
      <Formik
        initialValues={getInitialValues()}
        validationSchema={Yup.object({
          businesses: Yup.array()
            .of(
              Yup.object({
                type: Yup.string().required('Type is required'),
                nameOrNumber: Yup.string().required('Business name is required'),
                address: Yup.object({
                  building: Yup.string(),
                  street: Yup.string(),
                  city: Yup.string(),
                  county: Yup.string(),
                  postcode: Yup.string(),
                  country: Yup.string(),
                }).when('type', {
                  is: 'individual',
                  then: (schema) => schema.required(),
                  otherwise: (schema) => schema.notRequired(),
                }),
              })
            )
            .min(1, 'At least one business is required'),
        })}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
          handleSubmit,
        }) => (
          <div>
            
            {/* {Object.keys(errors).length > 0 && (
  <div style={{ color: 'red' }}>⛔ Validation errors present</div>
)} */}
          <Form
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
            <div style={{ flex: 1 }}>
              <FieldArray name="businesses">
                {({ push, remove }) => (
                  <Stack tokens={{ childrenGap: 16 }}>
                    {values.businesses.map((business, idx) => {
                      const businessError = errors.businesses?.[idx];
                      const businessTouched = touched.businesses?.[idx];

                      return (
                        <Stack key={idx} tokens={{ childrenGap: 8 }}>
                          <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="end">
                            <Dropdown
                              label="Type"
                              selectedKey={business.type}
                              options={businessTypes}
                              onChange={(_, option) => {
                                const newType = option?.key as 'limited' | 'individual';
                                setFieldValue(`businesses[${idx}].type`, newType);
                                if (newType === 'individual') {
                                  setFieldValue(`businesses[${idx}].address`, {
                                    building: '',
                                    street: '',
                                    city: '',
                                    county: '',
                                    postcode: '',
                                    country: 'United Kingdom',
                                  });
                                } else {
                                  setFieldValue(`businesses[${idx}].address`, undefined);
                                }
                              }}
                              errorMessage={
                                businessTouched &&
                                typeof businessError === 'object' &&
                                businessError &&
                                'type' in businessError
                                  ? String(businessError.type)
                                  : undefined
                              }
                              styles={{ root: { width: 180 } }}
                            />
                            <TextField
                              label="Business name"
                              value={business.nameOrNumber}
                              onChange={(_, val) =>
                                setFieldValue(`businesses[${idx}].nameOrNumber`, val || '')
                              }
                              errorMessage={
                                businessTouched &&
                                typeof businessError === 'object' &&
                                businessError &&
                                'nameOrNumber' in businessError
                                  ? String(businessError.nameOrNumber)
                                  : undefined
                              }
                              styles={{ root: { flex: 1 } }}
                            />
                            <IconButton
                              iconProps={{
                                iconName:
                                  idx === values.businesses.length - 1 ? 'Add' : 'Delete',
                              }}
                              onClick={() => {
                                if (idx === values.businesses.length - 1) {
                                  push({ type: 'limited', nameOrNumber: '' });
                                } else {
                                  remove(idx);
                                }
                              }}
                            />
                          </Stack>

                          {business.type === 'individual' && business.address && (
                            <Stack horizontal wrap tokens={{ childrenGap: 8 }}>
                              {(Object.keys(business.address) as (keyof Address)[]).map(
                                (field) => {
                                  const addrErr =
                                    businessTouched &&
                                    typeof businessError === 'object' &&
                                    businessError &&
                                    'address' in businessError &&
                                    businessError.address &&
                                    typeof businessError.address === 'object'
                                      ? (businessError.address as any)[field]
                                      : undefined;

                                  return (
                                    <TextField
                                      key={field}
                                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                                      value={business.address?.[field] ?? ''}
                                      onChange={(_, val) =>
                                        setFieldValue(
                                          `businesses[${idx}].address.${field}`,
                                          val || ''
                                        )
                                      }
                                      errorMessage={addrErr ? String(addrErr) : undefined}
                                      styles={{
                                        root: {
                                          width:
                                            field === 'postcode'
                                              ? 120
                                              : field === 'country'
                                              ? 180
                                              : 150,
                                        },
                                      }}
                                    />
                                  );
                                }
                              )}
                            </Stack>
                          )}
                        </Stack>
                      );
                    })}
                  </Stack>
                )}
              </FieldArray>

              <DefaultButton
                text={showContact ? '− Contact' : '+ Contact'}
                onClick={() => setShowContact(!showContact)}
                styles={{ root: { marginTop: 20 } }}
              />

              {showContact && (
                <>
                  <Stack horizontal tokens={{ childrenGap: 8 }}>
                    <TextField
                      label="First name"
                      value={contactData.firstName}
                      onChange={(_, val) =>
                        setContactData((prev) => ({ ...prev, firstName: val || '' }))
                      }
                      styles={{ root: { flex: 1 } }}
                    />
                    <TextField
                      label="Last name"
                      value={contactData.lastName}
                      onChange={(_, val) =>
                        setContactData((prev) => ({ ...prev, lastName: val || '' }))
                      }
                      styles={{ root: { flex: 1 } }}
                    />
                    {!isAliasOpen && !contactData.alias && (
                      <DefaultButton text="+Alias" onClick={() => setIsAliasOpen(true)} />
                    )}
                    {(isAliasOpen || contactData.alias) && (
                      <TextField
                        label="Alias"
                        value={contactData.alias}
                        onChange={(_, val) =>
                          setContactData((prev) => ({ ...prev, alias: val || '' }))
                        }
                        styles={{ root: { flex: 1 } }}
                      />
                    )}
                  </Stack>

                  <Stack horizontal tokens={{ childrenGap: 8 }}>
                    <TextField
                      label="Designation"
                      value={contactData.designation}
                      onChange={(_, val) =>
                        setContactData((prev) => ({ ...prev, designation: val || '' }))
                      }
                      styles={{ root: { flex: 1 } }}
                    />
                    <Dropdown
                      label="Mode"
                      options={modeOptions}
                      selectedKey={contactData.mode}
                      onChange={(_, option) =>
                        setContactData((prev) => ({
                          ...prev,
                          mode: option?.key as string,
                        }))
                      }
                      styles={{ root: { width: 200 } }}
                    />
                  </Stack>

                  <Label>Phone number</Label>
                  {phoneFields.map((phone, idx) => (
                    <Stack horizontal tokens={{ childrenGap: 8 }} key={idx}>
                      <TextField
                        value={phone.value}
                        onChange={(_, val) => {
                          const updated = [...phoneFields];
                          updated[idx].value = val || '';
                          setPhoneFields(updated);
                        }}
                        styles={{ root: { flex: 1 } }}
                      />
                      <Dropdown
                        options={typeOptions}
                        selectedKey={phone.type}
                        onChange={(_, opt) => {
                          const updated = [...phoneFields];
                          updated[idx].type = opt?.key as string || 'work';
                          setPhoneFields(updated);
                        }}
                        styles={{ root: { width: 120 } }}
                      />
                      {idx === phoneFields.length - 1 ? (
                        <IconButton
                          iconProps={{ iconName: 'Add' }}
                          onClick={() =>
                            setPhoneFields([...phoneFields, { value: '', type: 'work' }])
                          }
                        />
                      ) : (
                        <IconButton
                          iconProps={{ iconName: 'Delete' }}
                          onClick={() =>
                            setPhoneFields(phoneFields.filter((_, i) => i !== idx))
                          }
                        />
                      )}
                    </Stack>
                  ))}

                  <Label>Email</Label>
                  {emailFields.map((email, idx) => (
                    <Stack horizontal tokens={{ childrenGap: 8 }} key={idx}>
                      <TextField
                        value={email.value}
                        onChange={(_, val) => {
                          const updated = [...emailFields];
                          updated[idx].value = val || '';
                          setEmailFields(updated);
                        }}
                        styles={{ root: { flex: 1 } }}
                      />
                      <Dropdown
                        options={typeOptions}
                        selectedKey={email.type}
                        onChange={(_, opt) => {
                          const updated = [...emailFields];
                          updated[idx].type = opt?.key as string || 'work';
                          setEmailFields(updated);
                        }}
                        styles={{ root: { width: 120 } }}
                      />
                      {idx === emailFields.length - 1 ? (
                        <IconButton
                          iconProps={{ iconName: 'Add' }}
                          onClick={() =>
                            setEmailFields([...emailFields, { value: '', type: 'work' }])
                          }
                        />
                      ) : (
                        <IconButton
                          iconProps={{ iconName: 'Delete' }}
                          onClick={() =>
                            setEmailFields(emailFields.filter((_, i) => i !== idx))
                          }
                        />
                      )}
                    </Stack>
                  ))}

                  <TextField
                    label="Notes"
                    multiline
                    rows={3}
                    value={contactData.notes}
                    onChange={(_, val) =>
                      setContactData((prev) => ({ ...prev, notes: val || '' }))
                    }
                  />
                </>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 10,
                paddingTop: 16,
                borderTop: '1px solid #edebe9',
              }}
            >

              <div
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            background: 'white',
            padding: '8px',
            marginRight: "10px",
            zIndex: 1000, // to be on top of other UI
            // boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
            // borderTop: '1px solid #eee',
          }}
        >
              <DefaultButton text="Cancel" onClick={onDismiss} style={{
                marginRight: "10px"
              }} />
              <PrimaryButton
                text="Save"
                onClick={(e) => {
                  e.preventDefault(); // optional but safe
                  handleSubmit();     // no type conflict now
                }}
                disabled={isSubmitting}
              />
</div>

            </div>
          </Form>
          </div>
        )}
      </Formik>
    </Panel>
  );
};
