import React from "react";
import { Layout } from "../components/Layout";
import styles from "./register.module.css";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  return (
    <Layout style={styles.registerWrapper}>
      <aside className={styles.loginForm}>

      </aside>
      <main></main>
    </Layout>
  );
};

export default Register;
