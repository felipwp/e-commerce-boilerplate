import React from "react";
import { Wrapper } from "./Wrapper";
import { Header } from "./Header";

interface LayoutProps {

}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
};
