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
  type IDropdownStyles,
} from '@fluentui/react';
import { Formik, Form, FieldArray, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ukBusinessOptions: IDropdownOption[] = [
  { key: 'Barclays', text: 'Barclays' },
  { key: 'HSBC', text: 'HSBC' },
  { key: 'Tesco', text: 'Tesco' },
  { key: "Sainsbury's", text: "Sainsbury's" },
  { key: 'Marks & Spencer', text: 'Marks & Spencer' },
  { key: 'BT Group', text: 'BT Group' },
  { key: 'Unilever', text: 'Unilever' },
  { key: 'Rolls-Royce', text: 'Rolls-Royce' },
  { key: 'AstraZeneca', text: 'AstraZeneca' },
  { key: 'GlaxoSmithKline', text: 'GlaxoSmithKline' },
];

const TextFieldStyles = {
  root: {
    margin: 0,
    padding: 0,
    maxWidth: 200,
  },
  fieldGroup: {
    height: 24,
    minHeight: 24,
    borderRadius: 4,
    padding: '0 6px',
    borderColor: '#c8c6c9',
  },
  field: {
    fontSize: 12,
    padding: '2px 0',
  },
};

const LabelStyles = {
  fontSize: 11,
  fontWeight: 400,
  color: '#323130',
  lineHeight: '1',
  marginBottom: '10px',
  display: 'block',
  marginTop: '20px',
};

const compactDropdownStyles: Partial<IDropdownStyles> = {
  root: {
    width: 120,
    margin: 0,
    padding: 0,
  },
  dropdown: {
    height: 24,
    minHeight: 24,
    fontSize: 12,
    border: 'none',
    borderRadius: 4,
  },
  title: {
    height: 'full',
    lineHeight: '20px',
    padding: '0 24px 0 6px', // avoids overlap with icon
    border: '1px solid #c8c6c9',
    outline: 'none',
    fontSize: 12,
    borderRadius: 2,
  },
  caretDownWrapper: {
    height: 24,
    lineHeight: '20px',
    width: 20,
    right: 4,
  },
  dropdownItem: {
    fontSize: 12,
    height: 28,
    lineHeight: '28px',
  },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  root: {
    margin: 0,
    padding: 0,
    maxWidth: 200,
    border: 'none',
  },
  dropdown: {
    height: 24,
    minHeight: 24,
    fontSize: 12,
    lineHeight: '20px',
    padding: 0,
    border: 'none', // lighter border
    outline: 'none',
    borderRadius: 2,
  },
  title: {
    height: 'full',
    lineHeight: '20px',
    // padding: '0 24px 0 6px', // ⬅️ add right padding for chevron
    border: '1px solid #c8c6c9',
    outline: 'none',
    fontSize: 12,
    borderRadius: 2,
  },
  caretDownWrapper: {
    height: 24,
    lineHeight: '20px',
    width: 20,
    right: 4, // ⬅️ keeps chevron aligned
    border: 'none',
  },
  dropdownItem: {
    fontSize: 12,
    height: 28,
    lineHeight: '28px',
    border: 'none',
  },
};

const dropdownStyles2: Partial<IDropdownStyles> = {
  root: {
    margin: 0,
    padding: 0,
    maxWidth: 480, // optional: restrict container width
    border: 'none',
    width: 300, // ⬅️ set desired width
  },
  dropdown: {
    height: 24,
    minHeight: 24,
    fontSize: 12,
    lineHeight: '20px',
    padding: 0,
    border: `none`,
    borderRadius: 2,
    width: 300, // ⬅️ set dropdown visible box width
  },
  callout: {
    width: 300, // ⬅️ this controls the width of the options list popup
  },
  title: {
    height: '100%',
    lineHeight: '20px',
    fontSize: 12,
    borderRadius: 2,
    border: '1px solid #c8c6c9',
    outline: 'none',
  },
  caretDownWrapper: {
    height: 24,
    lineHeight: '20px',
    width: 20,
    right: 4,
    border: 'none',
  },
  dropdownItem: {
    fontSize: 12,
    height: 28,
    lineHeight: '28px',
    border: 'none',
  },
};

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
      styles={{
        headerText: {
          fontSize: '15px',
          fontWeight: '20px',
        },
        header: {
          paddingTop: '0px',
        },
        root: {
          fontSize: '5px',
        },
        commands: {
          paddingTop: '0px',
          borderBottom: '1px solid #EAEAEA',
        },
      }}
    >
      <Formik
        initialValues={getInitialValues()}
        validationSchema={Yup.object({
          businesses: Yup.array()
            .of(
              Yup.object({
                type: Yup.string().required('Type is required'),
                nameOrNumber: Yup.string().required(
                  'Business name is required'
                ),
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
            <Form
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ flex: 1 }}>
                <FieldArray name="businesses">
                  {({ push, remove }) => (
                    <Stack tokens={{ childrenGap: 16 }}>
                      {values.businesses.map((business, idx) => {
                        const businessError = errors.businesses?.[idx];
                        const businessTouched = touched.businesses?.[idx];

                        return (
                          <Stack key={idx} tokens={{ childrenGap: 8 }}>
                            <Stack
                              horizontal
                              tokens={{ childrenGap: 8 }}
                              verticalAlign="end"
                            >
                              <Dropdown
                                // className='drop'
                                onRenderLabel={() => (
                                  <span style={LabelStyles}>Type</span>
                                )}
                                selectedKey={business.type}
                                options={businessTypes}
                                onChange={(_, option) => {
                                  const newType = option?.key as
                                    | 'limited'
                                    | 'individual';
                                  setFieldValue(
                                    `businesses[${idx}].type`,
                                    newType
                                  );
                                  if (newType === 'individual') {
                                    setFieldValue(
                                      `businesses[${idx}].address`,
                                      {
                                        building: '',
                                        street: '',
                                        city: '',
                                        county: '',
                                        postcode: '',
                                        country: 'United Kingdom',
                                      }
                                    );
                                  } else {
                                    setFieldValue(
                                      `businesses[${idx}].address`,
                                      undefined
                                    );
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
                                styles={{
                                  ...dropdownStyles,
                                  root: {
                                    width: '200px',
                                  },
                                }}
                              />

                              <Dropdown
                                onRenderLabel={() => (
                                  <span style={LabelStyles}>Business Name</span>
                                )}
                                selectedKey={business.nameOrNumber}
                                onChange={(_, option) =>
                                  setFieldValue(
                                    `businesses[${idx}].nameOrNumber`,
                                    option?.key ?? ''
                                  )
                                }
                                options={ukBusinessOptions}
                                errorMessage={
                                  businessTouched &&
                                  typeof businessError === 'object' &&
                                  businessError &&
                                  'nameOrNumber' in businessError
                                    ? String(businessError.nameOrNumber)
                                    : undefined
                                }
                                styles={dropdownStyles2}
                              />

                              <IconButton
                                iconProps={{
                                  iconName:
                                    idx === values.businesses.length - 1
                                      ? 'Add'
                                      : 'Delete',
                                  styles:
                                    idx !== values.businesses.length - 1
                                      ? { root: { color: 'red' } }
                                      : undefined,
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

                            {business.type === 'individual' &&
                              business.address && (
                                <Stack
                                  horizontal
                                  wrap
                                  tokens={{ childrenGap: 8 }}
                                >
                                  {(
                                    Object.keys(
                                      business.address
                                    ) as (keyof Address)[]
                                  ).map((field) => {
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
                                        // label={field.charAt(0).toUpperCase() + field.slice(1)}
                                        onRenderLabel={() => (
                                          <span style={LabelStyles}>
                                            {field.charAt(0).toUpperCase() +
                                              field.slice(1)}
                                          </span>
                                        )}
                                        value={business.address?.[field] ?? ''}
                                        onChange={(_, val) =>
                                          setFieldValue(
                                            `businesses[${idx}].address.${field}`,
                                            val || ''
                                          )
                                        }
                                        errorMessage={
                                          addrErr ? String(addrErr) : undefined
                                        }
                                        styles={{
                                          ...TextFieldStyles,
                                          // root: {
                                          //   width:
                                          //     field === 'postcode'
                                          //       ? 120
                                          //       : field === 'country'
                                          //       ? 180
                                          //       : 150,
                                          // },
                                        }}
                                      />
                                    );
                                  })}
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
                  styles={{
                    root: {
                      marginTop: 20,
                      height: 24,
                      minHeight: 24,
                      padding: '0 8px',
                      fontSize: 12,
                      lineHeight: '16px',
                      background: '#EAEAEA',
                      border: 'none',
                    },
                    label: {
                      fontWeight: 'normal',
                    },
                  }}
                />

                {showContact && (
                  <>
                    <Stack horizontal tokens={{ childrenGap: 8 }}>
                      <TextField
                        onRenderLabel={() => (
                          <span style={LabelStyles}>First name</span>
                        )}
                        placeholder="Enter first name"
                        value={contactData.firstName}
                        onChange={(_, val) =>
                          setContactData((prev) => ({
                            ...prev,
                            firstName: val || '',
                          }))
                        }
                        styles={TextFieldStyles}
                      />
                      <TextField
                        onRenderLabel={() => (
                          <span style={LabelStyles}>Last name</span>
                        )}
                        value={contactData.lastName}
                        onChange={(_, val) =>
                          setContactData((prev) => ({
                            ...prev,
                            lastName: val || '',
                          }))
                        }
                        styles={TextFieldStyles}
                      />
                      {!isAliasOpen && !contactData.alias && (
                        <DefaultButton
                          text="+Alias"
                          onClick={() => setIsAliasOpen(true)}
                          styles={{
                            root: {
                              marginTop: 40,
                              height: 24,
                              minHeight: 24,
                              padding: '0 8px',
                              fontSize: 12,
                              lineHeight: '16px',
                            },
                          }}
                        />
                      )}
                      {(isAliasOpen || contactData.alias) && (
                        <TextField
                          onRenderLabel={() => (
                            <span style={LabelStyles}>Alias</span>
                          )}
                          value={contactData.alias}
                          onChange={(_, val) =>
                            setContactData((prev) => ({
                              ...prev,
                              alias: val || '',
                            }))
                          }
                          styles={TextFieldStyles}
                        />
                      )}
                    </Stack>

                    <Stack horizontal tokens={{ childrenGap: 8 }}>
                      <TextField
                        onRenderLabel={() => (
                          <span style={LabelStyles}>Designation</span>
                        )}
                        value={contactData.designation}
                        onChange={(_, val) =>
                          setContactData((prev) => ({
                            ...prev,
                            designation: val || '',
                          }))
                        }
                        styles={TextFieldStyles}
                      />
                      <Dropdown
                        onRenderLabel={() => (
                          <span style={LabelStyles}>Mode</span>
                        )}
                        options={modeOptions}
                        selectedKey={contactData.mode}
                        onChange={(_, option) =>
                          setContactData((prev) => ({
                            ...prev,
                            mode: option?.key as string,
                          }))
                        }
                        styles={dropdownStyles}
                      />
                    </Stack>

                    {/* <Label>Phone number</Label> */}

                    <span style={LabelStyles}>Phone Number</span>

                    {phoneFields.map((phone, idx) => (
                      <Stack horizontal tokens={{ childrenGap: 8 }} key={idx}>
                        <TextField
                          value={phone.value}
                          onChange={(_, val) => {
                            const updated = [...phoneFields];
                            updated[idx].value = val || '';
                            setPhoneFields(updated);
                          }}
                          styles={{
                            ...TextFieldStyles,
                            root: {
                              width: '300px',
                            },
                          }}
                        />
                        <Dropdown
                          options={typeOptions}
                          selectedKey={phone.type}
                          onChange={(_, opt) => {
                            const updated = [...phoneFields];
                            updated[idx].type = (opt?.key as string) || 'work';
                            setPhoneFields(updated);
                          }}
                          styles={compactDropdownStyles}
                        />

                        {idx === phoneFields.length - 1 ? (
                          <IconButton
                            iconProps={{ iconName: 'Add' }}
                            onClick={() =>
                              setPhoneFields([
                                ...phoneFields,
                                { value: '', type: 'work' },
                              ])
                            }
                          />
                        ) : (
                          <IconButton
                            iconProps={{ iconName: 'Delete' }}
                            style={{ color: 'red' }}
                            onClick={() =>
                              setPhoneFields(
                                phoneFields.filter((_, i) => i !== idx)
                              )
                            }
                          />
                        )}
                      </Stack>
                    ))}

                    {/* <Label>Email</Label> */}
                    {/* onRenderLabel={() => ( */}
                    <span style={LabelStyles}>Email</span>
                    {/* )} */}
                    {emailFields.map((email, idx) => (
                      <Stack horizontal tokens={{ childrenGap: 8 }} key={idx}>
                        <TextField
                          value={email.value}
                          onChange={(_, val) => {
                            const updated = [...emailFields];
                            updated[idx].value = val || '';
                            setEmailFields(updated);
                          }}
                          styles={{
                            ...TextFieldStyles,
                            root: {
                              width: '300px',
                            },
                          }}
                        />

                        <Dropdown
                          options={typeOptions}
                          selectedKey={email.type}
                          onChange={(_, opt) => {
                            const updated = [...emailFields];
                            updated[idx].type = (opt?.key as string) || 'work';
                            setEmailFields(updated);
                          }}
                          styles={compactDropdownStyles}
                        />

                        {idx === emailFields.length - 1 ? (
                          <IconButton
                            iconProps={{ iconName: 'Add' }}
                            onClick={() =>
                              setEmailFields([
                                ...emailFields,
                                { value: '', type: 'work' },
                              ])
                            }
                          />
                        ) : (
                          <IconButton
                            iconProps={{ iconName: 'Delete' }}
                            style={{ color: 'red' }}
                            onClick={() =>
                              setEmailFields(
                                emailFields.filter((_, i) => i !== idx)
                              )
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
                        setContactData((prev) => ({
                          ...prev,
                          notes: val || '',
                        }))
                      }
                      styles={{
                        fieldGroup: {
                          border: '1px solid #EAEAEA',
                        },
                      }}
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
                    marginRight: '10px',
                    zIndex: 1000,
                  }}
                >
                  <DefaultButton
                    text="Cancel"
                    onClick={onDismiss}
                    style={{
                      marginRight: '10px',
                    }}
                  />
                  <PrimaryButton
                    text="Save"
                    onClick={(e) => {
                      e.preventDefault(); // optional but safe
                      handleSubmit(); // no type conflict now
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
