import {
  Stack,
  TextField,
  PrimaryButton,
  Checkbox,
  Link,
  Separator,
  DefaultButton,
} from '@fluentui/react';
import { Formik } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/useAuth';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{ root: { minHeight: '100vh', background: '#f3f3f3' } }}
    >
      <Stack
        tokens={{ childrenGap: 15 }}
        styles={{
          root: {
            width: 380,
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
          initialValues={{ email: '', password: '', rememberMe: false }}
          onSubmit={async (values) => {
            try {
              const res = await axios.post(
                'http://localhost:5153/api/aAuth/login',
                {
                  email: values.email,
                  password: values.password,
                }
              );
              login(res.data.token);
              toast.success('login successful');
              navigate('/profile');
            } catch (err) {
              console.log(err);
              toast.error(`${(err as any).response.data}`);
              // alert(`${(err as any).response.data}`);
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Stack tokens={{ childrenGap: 12 }}>
                <TextField
                  label="Username"
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
                <Stack horizontal horizontalAlign="space-between">
                  <Checkbox
                    label="Remember me"
                    checked={formik.values.rememberMe}
                    onChange={(_, checked) =>
                      formik.setFieldValue('rememberMe', checked)
                    }
                  />
                  <Link>Forgot password?</Link>
                </Stack>
                <PrimaryButton text="Log in" type="submit" />
              </Stack>
            </form>
          )}
        </Formik>

        <Stack horizontalAlign="center">
          <span>
            Don’t have an account?{' '}
            <RouterLink to="/register">
              <Link>Register</Link>
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

export default LoginPage;
