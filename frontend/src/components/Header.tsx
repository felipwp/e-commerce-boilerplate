import React from "react";
import styles from "../../public/css/components/Header.module.css";
import NextLink from "next/link";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <img
            src="/assets/img/logo.png"
            width={70}
            height={70}
            className={styles.headerLogo}
          />
          <div className={styles.headerTextContainer}>
            <NextLink href="/">Home</NextLink>
            <NextLink href="/portfolio">Portfolio</NextLink>
            <NextLink href="/about">About Us</NextLink>
            <NextLink href="/shop">Shop</NextLink>
            <NextLink href="/contact">Contact</NextLink>
          </div>
        </div>
        <div className={styles.headerIcons}>
          {/* user svg */}
          <NextLink href="/login">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 2.5C11.5538 2.5 8.75 5.30375 8.75 8.75C8.75 12.1962 11.5538 15 15 15C18.4462 15 21.25 12.1962 21.25 8.75C21.25 5.30375 18.4462 2.5 15 2.5ZM15 12.5C12.9325 12.5 11.25 10.8175 11.25 8.75C11.25 6.6825 12.9325 5 15 5C17.0675 5 18.75 6.6825 18.75 8.75C18.75 10.8175 17.0675 12.5 15 12.5ZM26.25 26.25V25C26.25 20.1763 22.3237 16.25 17.5 16.25H12.5C7.675 16.25 3.75 20.1763 3.75 25V26.25H6.25V25C6.25 21.5538 9.05375 18.75 12.5 18.75H17.5C20.9462 18.75 23.75 21.5538 23.75 25V26.25H26.25Z"
                fill="white"
              />
            </svg>
          </NextLink>
          {/* cart svg */}
          <NextLink href="/cart">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.2775 9.28875C27.1625 9.12259 27.009 8.98678 26.83 8.89295C26.6511 8.79912 26.4521 8.75007 26.25 8.75H9.16625L7.72375 5.2875C7.53461 4.83153 7.21434 4.44199 6.80353 4.16827C6.39273 3.89454 5.90989 3.74897 5.41625 3.75H2.5V6.25H5.41625L11.3462 20.4813C11.4412 20.7089 11.6015 20.9034 11.8068 21.0402C12.0121 21.177 12.2533 21.25 12.5 21.25H22.5C23.0212 21.25 23.4875 20.9263 23.6712 20.44L27.4212 10.44C27.4921 10.2508 27.5161 10.0472 27.491 9.84669C27.466 9.64619 27.3927 9.45474 27.2775 9.28875ZM21.6337 18.75H13.3337L10.2087 11.25H24.4462L21.6337 18.75Z"
                fill="white"
              />
              <path
                d="M13.125 26.25C14.1605 26.25 15 25.4105 15 24.375C15 23.3395 14.1605 22.5 13.125 22.5C12.0895 22.5 11.25 23.3395 11.25 24.375C11.25 25.4105 12.0895 26.25 13.125 26.25Z"
                fill="white"
              />
              <path
                d="M21.875 26.25C22.9105 26.25 23.75 25.4105 23.75 24.375C23.75 23.3395 22.9105 22.5 21.875 22.5C20.8395 22.5 20 23.3395 20 24.375C20 25.4105 20.8395 26.25 21.875 26.25Z"
                fill="white"
              />
            </svg>
          </NextLink>
        </div>
      </header>
    </>
  );
};
