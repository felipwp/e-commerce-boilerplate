import React from "react";

interface WrapperProps {
}

export const Wrapper: React.FC<WrapperProps> = ({
  children
}) => {
  return (
    <>
      {children}
    </>
  );
};
