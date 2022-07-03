import { FC, ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Common.module.scss";
import { Button } from "@mui/material";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
  pageTitle: string;
  mainId: string;
};

export const Layout: FC<LayoutProps> = ({ children, pageTitle, mainId }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main id={mainId} className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

const Header = () => {
  return (
    <header className={styles.header}>
      <Link passHref={true} href="/">
        Digging Loops
      </Link>
      <Link passHref={true} href="/login">
        <Button>LOGIN</Button>
      </Link>
    </header>
  );
};

const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{" "}
      <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>
  </footer>
);