import React from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField, Dropdown, type IDropdownOption } from '@fluentui/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  onSave: (data: any) => void;
};

const roles: IDropdownOption[] = [
  { key: 'staff', text: 'Staff' },
  { key: 'manager', text: 'Manager' },
  { key: 'admin', text: 'Admin' },
];

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string()
    .matches(/^[\d+\-()\s]{7,}$/, 'Invalid phone number')
    .required('Required'),
  nationality: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  role: Yup.string().required('Required'),
});

const CreateUserPanel: React.FC<Props> = ({ isOpen, onDismiss, onSave }) => {
  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      type={PanelType.custom}
      customWidth='400px'
      headerText="Create new user"
      closeButtonAriaLabel="Close"
      isFooterAtBottom={true}
      styles={{
        main: { width: '480px' },
        content: { padding: '24px' },
        footer: { padding: '16px 24px' },
      }}
    >
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          nationality: '',
          address: '',
          role: 'staff',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave(values);
          onDismiss();
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
          <Form style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              {[
                { label: 'First name', name: 'firstName' },
                { label: 'Last name', name: 'lastName' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Phone', name: 'phone' },
                { label: 'Nationality', name: 'nationality' },
              ].map(({ label, name, type }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <label style={{ width: 90, marginRight: 10 }}>{label}:</label>
                  <TextField
                    name={name}
                    value={(values as any)[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={type || 'text'}
                    errorMessage={touched[name as keyof typeof values] && errors[name as keyof typeof values] ? (errors[name as keyof typeof values] as string) : ''}
                    styles={{
                      root: { width: '80%' },
                      fieldGroup: { height: '30px', borderRadius: 5 },
                    }}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16 }}>
                <label style={{ width: 90, marginRight: 10 }}>Address:</label>
                <TextField
                  name="address"
                  multiline
                  rows={2}
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={touched.address && errors.address ? errors.address : ''}
                  styles={{
                    root: { width: '80%' },
                    fieldGroup: { borderRadius: 5 },
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 90, marginRight: 10 }}>Role:</label>
                <Dropdown
                  selectedKey={values.role}
                  onChange={(_, option) => option && setFieldValue('role', option.key)}
                  options={roles}
                  styles={{ root: { width: '80%' }, dropdown: { height: 'full' } }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
              <DefaultButton
                text="Cancel"
                onClick={onDismiss}
                styles={{ root: { minWidth: '80px', height: '36px' } }}
              />
              <PrimaryButton
                text="Save"
                type="submit"
                styles={{ root: { minWidth: '80px', height: '36px' } }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Panel>
  );
};

export default CreateUserPanel;
