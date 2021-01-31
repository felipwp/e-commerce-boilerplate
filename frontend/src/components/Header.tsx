import React from "react";
import styles from "../../public/css/components/Header.module.css";
import NextLink from "next/link";
import Icon from "./Icon";
import { useMeQuery } from "../generated/graphql";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  // dados carregando
  if (fetching) {
    body = null;

    // usuário não está logado
  } else if (!data?.me) {
    body = (
      <div className={styles.signUpContainer}>
        <NextLink href="/register">
          <a>Sign up</a>
        </NextLink>
        <NextLink href="/login">
          <a>Log in</a>
        </NextLink>
      </div>
    );
    // usuário logado
  } else {
    body = (
      <div className={styles.loggedUserContainer}>
        <NextLink href="/profile">
          <a> <Icon name="user" /> </a>
        </NextLink>
        <NextLink href="/cart">
          <a> <Icon name="cart" /> </a>
        </NextLink>
        <NextLink href="/logout">
          <a> <Icon name="logout" /> </a>
        </NextLink>
      </div>
    );
  }

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
        <div className={styles.headerIcons}>{body}</div>
      </header>
    </>
  );
};
