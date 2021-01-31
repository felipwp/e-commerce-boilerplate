import React from "react";
import { Layout } from "../components/Layout";
import styles from "../../public/css/pages/login.module.css";
import commonStyles from "../../public/css/common.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Media } from "../components/Media";
import { useLoginMutation } from "../generated/graphql";


const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();


  return (
    <Layout style="indexWrapper" css="flex-cc">
      <Media />
      <main className={styles.loginMainContainer}>
        <div className={styles.loginTitleContainer}>
          <h2 className={styles.loginSubtitle}>MIA STUDIOS</h2>
          <h1 className={styles.loginTitle}>Hello, welcome back!</h1>
        </div>
        <Formik
          initialValues={{username: "", password: ""}}
          validationSchema={loginSchema}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);

            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              // conseguiu registrar o usuário
              router.push('/')
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

              <div className={styles.loginBottomContainer}>
                <NextLink href="/forgot-password">
                  Forgot your password?
                </NextLink>
                <button className={commonStyles.submitButton} type="submit">
                  Submit
                </button>
                <NextLink href="/register">Create an account</NextLink>
              </div>
            </Form>
          )}
        </Formik>
      </main>
      <Media align="right" />
    </Layout>
  );
};

export default Login;
