import { Stack, TextField, PrimaryButton, Separator, DefaultButton, Link } from '@fluentui/react';
import { Formik } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { minHeight: '100vh', background: '#f3f3f3' } }}>
      <Stack
        tokens={{ childrenGap: 15 }}
        styles={{
          root: {
            width: 380,
            padding: 32,
            background: 'white',
            borderRadius: 6,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }
        }}
      >
        <img src="/logo.png" alt="Logo" style={{ height: 48, alignSelf: 'center' }} />

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            try {
              await axios.post("http://localhost:5153/api/aAuth/register", values);
              alert("Registration successful");
              navigate("/login");
            } catch (err) {
              alert("Registration failed");
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Stack tokens={{ childrenGap: 12 }}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={(_, val) => formik.setFieldValue('email', val)}
                  required
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={(_, val) => formik.setFieldValue('password', val)}
                  canRevealPassword
                  required
                />
                <PrimaryButton text="Register" type="submit" />
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
          <DefaultButton text="Microsoft" iconProps={{ iconName: 'OfficeLogo' }} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RegisterPage;
