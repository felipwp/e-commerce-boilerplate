import React from "react";
import { Layout } from "../components/Layout";
import styles from "../../public/css/pages/register.module.css";
import commonStyles from "../../public/css/common.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";

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
  const router = useRouter();
  const [, register] = useRegisterMutation();

  const initialValues: registerProps = {
    username: "",
    password: "",
    email: "",
  };

  return (
    <Layout style="registerWrapper">
      <aside className={styles.registrationContainer}>
        <div className={styles.registrationTitlesContainer}>
          <h1 className={styles.registerTitle}>Register.</h1>
          <h2 className={styles.registerSubtitle}>
            Create your account to use our website
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setErrors }) => {
            console.log({ values });
            const response = await register(values);

            console.log("response: ", response);

            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              // conseguiu registrar o usuário
              router.push("/");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className={commonStyles.form}>
              <div className={commonStyles.labelContainer}>
                <label htmlFor="username" className={commonStyles.label}>
                  Username
                </label>
                {errors.username && touched.username ? (
                  <div className={commonStyles.errorMessage}>
                    {errors.username}
                  </div>
                ) : null}
              </div>
              <Field name="username" placeholder="Your username" />

              <div className={commonStyles.labelContainer}>
                <label htmlFor="password" className={commonStyles.label}>
                  Password
                </label>
                {errors.password && touched.password ? (
                  <div className={commonStyles.errorMessage}>
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <Field
                name="password"
                type="password"
                placeholder="Your password"
              />

              <div className={commonStyles.labelContainer}>
                <label htmlFor="email" className={commonStyles.label}>
                  Email
                </label>
                {errors.email && touched.email ? (
                  <div className={commonStyles.errorMessage}>
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <Field name="email" type="email" placeholder="Your email" />

              <NextLink href="/login">Already have an account?</NextLink>

              <button className={commonStyles.submitButton} type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </aside>
      <main></main>
    </Layout>
  );
};

export default Register;
