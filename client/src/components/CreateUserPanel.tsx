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
  role: Yup.string().required('Required'),
});

const CreateUserPanel: React.FC<Props> = ({ isOpen, onDismiss, onSave }) => {
  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      type={PanelType.custom}
      customWidth='320px'
      headerText="Create new user"
      closeButtonAriaLabel="Close"
      isFooterAtBottom={true}
      styles={{
        main: { width: '400px' },
        content: { padding: '24px' },
        footer: { padding: '16px 24px' }
      }}
    >
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
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
              <div className="mb-3">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                 <label style={{ width: 80, marginRight: 10 }}>First name:</label>
                    <TextField
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={touched.firstName && errors.firstName ? errors.firstName : ''}
                    styles={{
                        root: { width: '80%' },
                        fieldGroup: { height: '30px',  borderRadius: 5 }
                    }}
                    />
                    </div>
              </div>

              <div className="mb-3">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                 <label style={{ width: 80, marginRight: 10 }}>Last name:</label>
                    <TextField
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={touched.lastName && errors.lastName ? errors.lastName : ''}
                    styles={{
                        root: { width: '80%' },
                        fieldGroup: { height: '30px',  borderRadius: 5 }
                    }}
                 />
                </div>
              </div>

              <div className="mb-3">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                 <label style={{ width: 80, marginRight: 10 }}>Email:</label>
                    <TextField
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={touched.email && errors.email ? errors.email : ''}
                    type="email"
                    styles={{
                        root: { width: '80%' },
                        fieldGroup: { height: '30px',  borderRadius: 5 }
                    }}
                    />
                </div>
              </div>

              <div className="mb-4">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                 <label style={{ width: 80, marginRight: 10 }}>Role:</label>
                    <Dropdown
                    selectedKey={values.role}
                    onChange={(_, option) => {
                        if (option) setFieldValue('role', option.key);
                    }}
                    options={roles}
                    styles={{
                        root: { width: '80%' },
                        dropdown: { height: '40px' }
                    }}
                    />
                </div>
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