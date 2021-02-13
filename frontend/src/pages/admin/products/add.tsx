import { Field, FieldArray, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import formStyles from "../../../../public/css/form.module.css";
import adminPageStyles from "../../../../public/css/pages/admin/common.module.css";
import productStyles from "../../../../public/css/pages/admin/products.module.css";
import { Input } from "../../../components/Input";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { isValidURL } from "../../../utils/isValidURL";

const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  size: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  description: Yup.string(),
  price: Yup.number().required("Required"),
});

export const CreateProducts: React.FC<{}> = ({}) => {
  const [files, setFiles] = useState([{ url: "" }]);

  const addFileInput = () => {
    if (files.length < 4) setFiles([...files, { url: "" }]);
  };

  const handleInputChange = (e: any, index: number) => {
    const url = e.target.value;
    if (isValidURL(url)) e.target.nextSibling.src = url;
    else e.target.nextSibling.src = "https://i.imgur.com/qINhlNV.png";

    const filesList = [...files];
    filesList[index] = url;
    setFiles(filesList);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const filesList = [...files];
    filesList.splice(index, 1);
    setFiles(filesList);
  };

  return (
    <Layout style="indexWrapper">
      <div className={adminPageStyles.adminPageContainer}>
        <div className={adminPageStyles.adminPageTitleContainer}>
          <h1>Add a new Product.</h1>
          <div>
            <NextLink href="/admin/products/">
              <a className={adminPageStyles.newItemButton}>ALL ITEMS</a>
            </NextLink>
          </div>
        </div>
        <div
          className={`${adminPageStyles.mainContainer} ${productStyles.mainContainer}`}
        >
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: 0,
              size: "",
              images: [""],
            }}
            validationSchema={productSchema}
            onSubmit={async (values, { setErrors }) => {
              alert(JSON.stringify(values));
            }}
          >
            {({ errors, touched, values }) => (
              <Form
                className={`${formStyles.form} ${productStyles.productForm}`}
              >
                <div>
                  <div className={productStyles.topInputContainer}>
                    <div className={productStyles.buildName}>
                      <Input
                        errors={errors.name}
                        touched={touched.name}
                        label="Name"
                        name="name"
                        placeholder="Example: Greek Circular Spawn | Hub"
                      />
                    </div>

                    <div className={productStyles.buildPrice}>
                      <Input
                        errors={errors.price}
                        touched={touched.price}
                        label="Price"
                        name="price"
                        type="number"
                        step="0.01"
                      />
                    </div>

                    <div className={productStyles.buildSize}>
                      <Input
                        errors={errors.size}
                        touched={touched.size}
                        label="Size"
                        name="size"
                        placeholder="Example: 300x300"
                      />
                    </div>
                  </div>

                  <Input
                    errors={errors.description}
                    touched={touched.description}
                    className={formStyles.textArea}
                    label="Description"
                    as="textarea"
                    name="description"
                    type="description"
                    placeholder="Build description"
                  />
                  <FieldArray
                    name="images"
                    render={(arrayHelpers) =>
                      values.images.map((url, index) => {
                        return (
                          <div
                            className={productStyles.imageUrlContainer}
                            key={index}
                          >
                            <Field
                              className={productStyles.imageUrl}
                              name={`image.${index}`}
                              type={`image.${index}`}
                              placeholder="URL"
                            />
                            <div>
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })
                    }
                  />
                </div>

                <button className={formStyles.submitButton} type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateProducts);
