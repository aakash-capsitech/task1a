import {
  Stack,
  TextField,
  PrimaryButton,
  Separator,
  DefaultButton,
  Link,
  Dropdown,
  type IDropdownOption,
} from '@fluentui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const roleOptions: IDropdownOption[] = [
  { key: 'admin', text: 'Admin' },
  { key: 'staff', text: 'Staff' },
  { key: 'manager', text: 'Manager' },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  role: Yup.string().required('Please select a role'),
  phone: Yup.string().matches(
    /^[0-9]{10,15}$/,
    'Phone number must be 10-15 digits'
  ),
  nationality: Yup.string().required('Please add a nationality'),
  address: Yup.string().required('Please add your address'),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{ root: { minHeight: '100vh', background: '#f3f3f3' } }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Stack
        tokens={{ childrenGap: 15 }}
        styles={{
          root: {
            width: 420,
            padding: 32,
            background: 'white',
            borderRadius: 6,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{ height: 48, alignSelf: 'center' }}
        />

        <Formik
          initialValues={{
            name: '',
            email: '',
            role: '',
            phone: '',
            nationality: '',
            address: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post('http://localhost:5153/api/users', values);
              toast.success('Registration successful');
              navigate('/login');
            } catch (err: any) {
              toast.error(
                err?.response?.data?.message || 'Registration failed'
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Stack tokens={{ childrenGap: 12 }}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={formik.values.name}
                  onChange={(_, val) => formik.setFieldValue('name', val)}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ''
                  }
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={(_, val) => formik.setFieldValue('email', val)}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ''
                  }
                  required
                />
                <Dropdown
                  label="Role"
                  options={roleOptions}
                  selectedKey={formik.values.role}
                  onChange={(_, option) =>
                    formik.setFieldValue('role', option?.key)
                  }
                  onBlur={() => formik.setFieldTouched('role', true)}
                  errorMessage={
                    formik.touched.role && formik.errors.role
                      ? formik.errors.role
                      : ''
                  }
                  required
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={(_, val) => formik.setFieldValue('phone', val)}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched.phone && formik.errors.phone
                      ? formik.errors.phone
                      : ''
                  }
                />
                <TextField
                  label="Nationality"
                  name="nationality"
                  value={formik.values.nationality}
                  onChange={(_, val) =>
                    formik.setFieldValue('nationality', val)
                  }
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched.nationality && formik.errors.nationality
                      ? formik.errors.nationality
                      : ''
                  }
                />
                <TextField
                  label="Address"
                  name="address"
                  multiline
                  value={formik.values.address}
                  onChange={(_, val) => formik.setFieldValue('address', val)}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched.address && formik.errors.address
                      ? formik.errors.address
                      : ''
                  }
                />

                <PrimaryButton
                  text="Register"
                  type="submit"
                  disabled={formik.isSubmitting}
                />
              </Stack>
            </form>
          )}
        </Formik>

        <Stack horizontalAlign="center">
          <span>
            Already have an account?{' '}
            <RouterLink to="/login">
              <Link>Log in</Link>
            </RouterLink>
          </span>
        </Stack>

        <Separator>OR</Separator>

        <Stack horizontal tokens={{ childrenGap: 12 }}>
          <DefaultButton text="Google" iconProps={{ iconName: 'GoogleLogo' }} />
          <DefaultButton
            text="Microsoft"
            iconProps={{ iconName: 'OfficeLogo' }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RegisterPage;
