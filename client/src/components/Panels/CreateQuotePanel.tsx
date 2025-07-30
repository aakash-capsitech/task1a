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
  type IDropdownStyles,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { Formik, Form, FieldArray, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import imge from '../../assets/image.png';
import { B_URL } from '../../configs';

const TextFieldStyles = {
  root: {
    margin: 0,
    padding: 0,
    maxWidth: 200,
  },
  fieldGroup: {
    height: 24,
    minHeight: 18,
    borderRadius: 4,
    padding: '0 0px',
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
    border: '1px solid #c8c6c9',
    borderRadius: 4,
  },
  title: {
    height: 'full',
    lineHeight: '20px',
    padding: '0 24px 0 6px',
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

const headerStyles = {
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
    border: `1px solid #c8c6c9`, 
    borderRadius: 4,
  },
  title: {
    height: 'full',
    lineHeight: '20px',
    fontSize: 12,
    borderRadius: 2,
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

const readOnlyTexts = {
  fieldGroup: {
    background: '#F8F8F8',
    border: '1px solid #EAEAEA',
    borderRadius: '6px',
  },
  root: {
    marginTop: '0px',
  },
};

const bottomReads = {
  root: {
    width: '115px',
    marginRight: '39px',
  },
  prefix: {
    borderRight: '1px solid rgba(0,0,0,0.2)',
    marginRight: '10px',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
  },
  fieldGroup: {
    height: '24px',
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: '4px',
  },
};

const vatOptions = [
  { key: '0', text: 'VAT 0%' },
  { key: '5', text: 'VAT 5%' },
  { key: '20', text: 'VAT 20%' },
];

const sampleServices = [
  { key: 'Consultation', text: 'Consultation' },
  { key: 'Filing', text: 'Filing' },
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
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get(`${B_URL}/api/businesses`, {
        params: { page: 1, pageSize: 100 },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(res.data);
      const options = (res.data.businesses || []).map((b: any) => ({
        key: b.id,
        text: b.businessE.nameOrNumber ?? 'Unnamed',
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

      console.log(services);

      const token = localStorage.getItem("token")

      const response = await axios.post(
        `${B_URL}/api/quotes/calc`,
        {
          services,
          discountPercentage: discountPercent,
          vatPercentage: vatPercent,
        },{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
      );

      setCalculations(response.data);
    } catch (error) {
      console.error('Failed to calculate totals', error);
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
      firstResponseTeam: values.firstResponse ?? '',
      services: values.rows.map((row) => ({
        service: row.service as string,
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

    const token = localStorage.getItem("token")

    try {
      await axios.post(`${B_URL}/api/Quotes`, dto, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
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
      type={PanelType.custom}
      customWidth="700px"
      isFooterAtBottom
      styles={{
        ...headerStyles,
        root: {
        },
      }}
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
          useEffect(() => {
            if (values.rows.length > 0) {
              calculateTotals(
                values.rows,
                values.discountPercent,
                values.vatPercent
              );
            }
          }, [values.rows, values.discountPercent, values.vatPercent]);

          return (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <span style={{ ...LabelStyles }}>Business Name</span>
                <Dropdown
                  placeholder="Select or search..."
                  options={businessOptions}
                  selectedKey={values.businessId}
                  onChange={(_, opt) => setFieldValue('businessId', opt?.key)}
                  errorMessage={
                    touched.businessId && typeof errors.businessId === 'string'
                      ? errors.businessId
                      : undefined
                  }
                  styles={{
                    ...dropdownStyles,
                    root: {
                      width: '450px',
                      marginTop: '10px',
                    },

                    dropdown: {
                      border: 'none',
                    },
                    title: {
                      border: '1px solid rgba(0,0,0,0.2)',
                      background: '#EAEAEA',
                      borderRadius: '6px',
                      height: '30px',
                    },
                  }}
                />
              </div>

              <Stack
                horizontal
                tokens={{ childrenGap: 16 }}
                styles={{
                  root: {
                    marginBottom: '20px',
                  },
                }}
              >
                <Stack
                  horizontal
                  verticalAlign="center"
                  tokens={{ childrenGap: 16 }}
                >
                  <span style={{ ...LabelStyles }}>Date</span>
                  <DatePicker
                    value={values.date as Date}
                    onSelectDate={(d) => setFieldValue('date', d)}
                    styles={{
                      root: {
                        width: 180,
                        height: '20px',
                        border: 'none',
                      },
                      textField: {
                        fieldGroup: {
                          border: 'none',
                          height: '20px',
                        },
                        field: {
                          height: '20px',
                          border: 'none',
                        },
                      },
                      icon: {
                      },
                      readOnlyTextField: {
                        height: '20px',
                        border: 'none',
                      },
                    }}
                  />
                </Stack>

                <Stack
                  horizontal
                  verticalAlign="center"
                  tokens={{ childrenGap: 16 }}
                >
                  <span style={{ ...LabelStyles }}>First Response</span>

                  <Dropdown
                    options={firstResponseOptions}
                    selectedKey={values.firstResponse}
                    placeholder="select"
                    onChange={(_, opt) =>
                      setFieldValue('firstResponse', opt?.key)
                    }
                    styles={{
                      ...dropdownStyles,
                      root: {
                        width: '180px',
                      },
                      dropdown: {
                        border: 'none',
                      },
                      title: {
                        border: '1px solid rgba(0,0,0,0.2)',
                        background: '#EAEAEA',
                        borderRadius: '6px',
                        height: '30px',
                      },
                    }}
                  />
                </Stack>
              </Stack>

              <hr
                style={{
                  height: '1px',
                  backgroundColor: 'black',
                  border: 'none',
                  padding: '0',
                  margin: '0',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '0',
                  margin: '0',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 750,
                  }}
                >
                  Service
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 750,
                  }}
                >
                  Description
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 750,
                  }}
                >
                  Amount
                </div>
              </div>
              <hr
                style={{
                  height: '2px',
                  backgroundColor: 'black',
                  border: 'none',
                  padding: '0',
                  margin: '0',
                  marginBottom: '12px',
                }}
              />

              <FieldArray name="rows">
                {({ remove, push }) => (
                  <>
                    {values.rows.map((row, index) => (
                      <Stack
                        horizontal
                        horizontalAlign="space-between"
                        tokens={{ childrenGap: 8 }}
                        key={index}
                      >
                        <img
                          src={imge}
                          style={{
                            paddingTop: '5px',
                            paddingBottom: '15px',
                          }}
                        />
                        <Dropdown
                          placeholder="Select"
                          options={sampleServices}
                          selectedKey={row.service}
                          onChange={(_, opt) =>
                            setFieldValue(`rows[${index}].service`, opt?.key)
                          }
                          styles={{
                            ...dropdownStyles,
                            root: {
                              width: '120px',
                              height: '40px',
                              flex: 4,
                            },
                            dropdown: {
                              border: 'none',
                            },
                            title: {
                              border: '1px solid #EAEAEA',
                              height: '25px',
                              alignItems: 'center',
                            },
                          }}
                          errorMessage={
                            touched.rows?.[index]?.service &&
                            (errors.rows?.[index] as any)?.service
                          }
                        />
                        <TextField
                          value={row.description}
                          onChange={(_, val) =>
                            setFieldValue(`rows[${index}].description`, val)
                          }
                          styles={{
                            ...TextFieldStyles,
                            root: {
                              flex: 4,
                            },
                          }}
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
                          styles={{
                            ...TextFieldStyles,
                            prefix: {
                              backgroundColor: 'white',
                              borderRight: '1px solid grey',
                            },
                            root: {
                              width: '150px',
                              flex: 2,
                            },
                          }}
                          errorMessage={
                            touched.rows?.[index]?.amount &&
                            (errors.rows?.[index] as any)?.amount
                          }
                        />
                        <IconButton
                          iconProps={{ iconName: 'Delete' }}
                          onClick={() => remove(index)}
                          styles={{
                            root: {
                              color: 'red',
                            },
                          }}
                        />
                      </Stack>
                    ))}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Stack
                        styles={{
                          root: {
                            width: '70px',
                          },
                        }}
                      >
                        <PrimaryButton
                          text="+ Add"
                          onClick={() =>
                            push({ service: '', description: '', amount: '' })
                          }
                          styles={{
                            root: {
                              padding: '2px 8px',
                              width: '100%',
                              minWidth: '100%',
                              borderRadius: '6px',
                              minHeight: '24px',
                            },
                            label: {
                              padding: '0px',
                              margin: '0px',
                            },
                            flexContainer: {
                              padding: 0,
                            },
                          }}
                        />
                      </Stack>
                      <Stack
                        horizontal
                        horizontalAlign="end"
                        verticalAlign="center"
                        tokens={{ childrenGap: 8 }}
                      >
                        <TextField
                          readOnly
                          prefix="£"
                          value={`£${calculations.subtotal.toFixed(2)}`}
                          styles={{
                            ...TextFieldStyles,
                            ...readOnlyTexts,
                            ...bottomReads,
                          }}
                        />
                      </Stack>
                    </div>
                  </>
                )}
              </FieldArray>

              <Stack tokens={{ childrenGap: 1 }}>
                <Stack
                  horizontal
                  horizontalAlign="end"
                  verticalAlign="center"
                  tokens={{ childrenGap: 4 }}
                >
                  <Label style={{ ...LabelStyles }}>Discount (%)</Label>
                  <TextField
                    type="number"
                    prefix="£"
                    suffix="%"
                    value={values.discountPercent.toString()}
                    onChange={(_, val) =>
                      setFieldValue(
                        'discountPercent',
                        parseFloat(val || '0') || 0
                      )
                    }
                    styles={{ ...TextFieldStyles, ...bottomReads }}
                  />
                </Stack>

                <Stack
                  horizontal
                  horizontalAlign="end"
                  verticalAlign="center"
                  tokens={{ childrenGap: 2 }}
                >
                  <Dropdown
                    options={vatOptions}
                    selectedKey={values.vatPercent.toString()}
                    onChange={(_, opt) =>
                      setFieldValue('vatPercent', parseInt(opt?.key as string))
                    }
                    styles={{
                      ...dropdownStyles,
                      root: {
                        marginTop: '0px',
                      },
                    }}
                  />
                  <TextField
                    readOnly
                    prefix="£"
                    value={`£${calculations.vatAmount.toFixed(2)}`}
                    styles={{
                      ...TextFieldStyles,
                      ...readOnlyTexts,
                      ...bottomReads,
                    }}
                  />
                </Stack>

                <Stack
                  horizontal
                  horizontalAlign="end"
                  verticalAlign="center"
                  tokens={{ childrenGap: 8 }}
                >
                  <Label style={LabelStyles}>Discount</Label>
                  <TextField
                    readOnly
                    prefix="£"
                    value={`£${calculations.discountAmount.toFixed(2)}`}
                    styles={{
                      ...TextFieldStyles,
                      ...readOnlyTexts,
                      ...bottomReads,
                    }}
                  />
                </Stack>

                <Stack
                  horizontal
                  horizontalAlign="end"
                  verticalAlign="center"
                  tokens={{ childrenGap: 8 }}
                >
                  <Label styles={{ root: {} }}>Total</Label>
                  <TextField
                    readOnly
                    prefix="£"
                    value={`£${calculations.total.toFixed(2)}`}
                    styles={{
                      ...TextFieldStyles,
                      ...readOnlyTexts,
                      ...bottomReads,
                    }}
                  />
                </Stack>
              </Stack>

              <Stack
                horizontal
                tokens={{ childrenGap: 8 }}
                horizontalAlign="end"
              >
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
                  <DefaultButton
                    text="Cancel"
                    onClick={onDismiss}
                    style={{ marginRight: '10px' }}
                  />
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
