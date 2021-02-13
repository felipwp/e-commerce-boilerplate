import { Field } from "formik";
import React from "react";
import formStyles from "../../public/css/form.module.css";

interface InputProps {
  errors?: string;
  touched?: boolean;
  label?: string;
  as?: string;
  name?: string;
  type?: string;
  step?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  errors,
  touched,
  label,
  as,
  name,
  type,
  step,
  placeholder,
  autoComplete,
  className,
}) => {
  return (
    <>
      {label && name ? (
        <div className={formStyles.labelContainer}>
          <label htmlFor={name} className={formStyles.label}>
            {label}
          </label>
          {errors && touched ? (
            <div className={formStyles.errorMessage}>{errors}</div>
          ) : null}
        </div>
      ) : null}
      <Field
        className={className}
        as={as}
        name={name}
        type={type}
        step={step}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </>
  );
};
