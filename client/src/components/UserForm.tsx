import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';

const initialValues = {
  name: '',
  email: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const UserForm = () => {
  return (
    <div className="container mt-5">
      <h2>Fluent UI + Bootstrap + Formik Form</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log('Submitted Data:', values);
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => (
          <Form>
            <div className="mb-3">
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={touched.name && errors.name ? errors.name : undefined}
              />
            </div>

            <div className="mb-3">
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={touched.email && errors.email ? errors.email : undefined}
              />
            </div>

            <PrimaryButton type="submit" text="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
