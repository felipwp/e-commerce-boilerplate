import React from "react";
import { Header } from "./Header";
import styles from "../../public/css/components/Layout.module.css";

interface LayoutProps {
  style?: string;
  css?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, style, css }) => {
  return (
    <>
      <Header />
      <div className={`${styles[`${style}`]} ${css} ${styles.defaultLayout}`}>
        {children}
      </div>
    </>
  );
};
