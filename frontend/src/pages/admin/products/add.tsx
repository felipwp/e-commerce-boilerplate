import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import * as Yup from "yup";
import commonStyles from "../../../../public/css/pages/admin/common.module.css";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const productSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
});

export const CreateProducts: React.FC<{}> = ({}) => {
  return (
    <Layout style="indexWrapper">
      <div className={commonStyles.adminPageContainer}>
        <div className={commonStyles.adminPageTitleContainer}>
          <h1>Add a new Product.</h1>
          <div>
            <NextLink href="/admin/products/">
              <a className={commonStyles.newItemButton}>ALL ITEMS</a>
            </NextLink>
          </div>
        </div>
        <div className={commonStyles.mainContainer}>
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            validationSchema={productSchema}
            onSubmit={async (values, { setErrors }) => {
              // if (response.data?.login.errors) {
              //   setErrors(toErrorMap(response.data.login.errors));
              // } else if (response.data?.login.user) {
              //   // conseguiu registrar o usuário
              //   router.push("/");
              // }
            }}
          >
            {({ errors, touched }) => (
              <Form className={commonStyles.form}>
                <div className={commonStyles.labelContainer}>
                  <label
                    htmlFor="usernameOrEmail"
                    className={commonStyles.label}
                  >
                    Username
                  </label>
                  {errors.usernameOrEmail && touched.usernameOrEmail ? (
                    <div className={commonStyles.errorMessage}>
                      {errors.usernameOrEmail}
                    </div>
                  ) : null}
                </div>
                <Field
                  name="usernameOrEmail"
                  placeholder="Your username or email"
                  autoComplete="email"
                />

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
                  autoComplete="password"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateProducts);
