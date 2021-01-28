import React from "react";
import { Header } from "./Header";

interface LayoutProps {
  style?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, style }) => {
  return (
    <>
      <Header />
      <div className={style}>
        {children}
      </div>
    </>
  );
};
