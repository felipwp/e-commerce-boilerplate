import React from "react";
import { Layout } from "../components/Layout";
import styles from "./register.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface registerProps {
  username: string;
  password: string;
  email: string;
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const Register: React.FC<registerProps> = ({}) => {
  const initialValues: registerProps = {
    username: "",
    password: "",
    email: "",
  };

  return (
    <Layout style={styles.registerWrapper}>
      <aside className={styles.registrationContainer}>
        <div className="mlmr">
          <h1 className={styles.registerTitle}>Register.</h1>
          <h2 className={styles.registerSubtitle}>
            Create your account to use our website
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles.form}>
                <div className={styles.labelContainer}>
                  <label htmlFor="username" className={styles.label}>
                    Username
                  </label>
                  {errors.username && touched.username ? (
                    <div className={styles.errorMessage}>{errors.username}</div>
                  ) : null}
                </div>
                <Field name="username" placeholder="Your username" />

                <div className={styles.labelContainer}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  {errors.password && touched.password ? (
                    <div className={styles.errorMessage}>{errors.password}</div>
                  ) : null}
                </div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Your password"
                />

                <div className={styles.labelContainer}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  {errors.email && touched.email ? (
                    <div className={styles.errorMessage}>{errors.email}</div>
                  ) : null}
                </div>
                <Field name="email" type="email" placeholder="Your email" />

                <button className={styles.submitButton} type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </aside>
      <main></main>
    </Layout>
  );
};

export default Register;
