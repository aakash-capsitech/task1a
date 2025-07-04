import React from 'react';
import {
  Stack,
  TextField,
  PrimaryButton,
  Checkbox,
  Link,
  Label,
  Image,
  FontWeights,
} from '@fluentui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const styles = {
  container: {
    width: 380,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: FontWeights.semibold,
    color: '#1d2c4d',
    marginTop: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  futureBadge: {
    backgroundColor: '#0f8df0',
    color: 'white',
    fontSize: 12,
    padding: '2px 8px',
    borderRadius: 4,
    marginLeft: 4,
  },
  input: {
    root: { marginBottom: 16 },
  },
  loginButton: {
    root: {
      marginTop: 10,
      backgroundColor: '#0078D4',
      border: 'none',
      height: 36,
      fontSize: 16,
    },
    rootHovered: {
      backgroundColor: '#106EBE',
    },
  },
  checkbox: {
    root: { marginTop: 10 },
  },
};

const LoginForm: React.FC = () => {
  return (
    <Stack
      verticalAlign="center"
      horizontalAlign="center"
      styles={{ root: { height: '100vh', backgroundColor: '#f2f4f8' } }}
    >
      <Stack style={styles.container} tokens={{ childrenGap: 12 }}>
        {/* Logo and Heading */}
        <Stack horizontalAlign="center">
          <img
            src="https://accounts.actingoffice.com/logo_full.svg"
            alt="Logo"
            style={{ height: 50, marginBottom: 10 }}
          />
          <Stack horizontalAlign="center">
            <span style={styles.headerText}>
              acting <strong>office</strong>
            </span>
            <Stack horizontal tokens={{ childrenGap: 6 }} verticalAlign="center">
              <span style={styles.subText}>Welcome to the</span>
              <span style={styles.futureBadge}>Future</span>
            </Stack>
          </Stack>
        </Stack>

        {/* Form */}
        <Formik
          initialValues={{ username: '', password: '', remember: false }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            console.log('Login:', values);
          }}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Field name="username">
                {() => (
                  <TextField
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={touched.username && errors.username ? errors.username : ''}
                    styles={styles.input}
                  />
                )}
              </Field>

              <Field name="password">
                {() => (
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    canRevealPassword
                    revealPasswordAriaLabel="Show password"
                    errorMessage={touched.password && errors.password ? errors.password : ''}
                    styles={styles.input}
                  />
                )}
              </Field>

              <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Field name="remember">
                  {({ field }: any) => (
                    <Checkbox
                      label="Remember me?"
                      {...field}
                      styles={styles.checkbox}
                    />
                  )}
                </Field>
                <Link href="#" underline>
                  Forgot password?
                </Link>
              </Stack>

              <PrimaryButton
                type="submit"
                text="Log in"
                styles={styles.loginButton}
              />
            </Form>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
