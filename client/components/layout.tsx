import { FC, ReactNode, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, Dialog, DialogTitle, ModalProps, Stack } from "@mui/material";
import Link from "next/link";
import styles from "../styles/Common.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import { User } from "@entities";
type LayoutProps = {
  children: ReactNode;
  pageTitle: string;
  mainId: string;
  auth?: User | null;
};

export const Layout: FC<LayoutProps> = ({ children, pageTitle, mainId, auth }) => {
  return (
    <>
      <Header auth={auth} />
      <div className={styles.container}>
        <Head>
          <title>{`${pageTitle} | Digging Loops`}</title>
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
export interface SimpleDialogProps {
  open: boolean;
  close(): void;
}

const SimpleDialog: FC<SimpleDialogProps> = ({ open, close }) => {
  const handleClose: ModalProps["onClose"] = (_, reason) => {
    close();
  };

  const handleListItemClick = (value: string) => {};

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
  );
};

const LoginButton = () => (
  <Link passHref={true} href="/login">
    <Button>LOGIN</Button>
  </Link>
);

const UserButton: FC<{ auth: User }> = ({ auth }) => {
  return <Button>{auth.name}</Button>;
};

const Header: FC<{ auth?: User | null }> = ({ auth }) => {
  const [viewSearchBox, setViewSearchBox] = useState(false);
  const searchBoxClose = () => setViewSearchBox(false);
  return (
    <>
      <header className={styles.header}>
        <Link passHref={true} href="/">
          Digging Loops
        </Link>
        <Stack direction="row">
          <Button onClick={() => setViewSearchBox(true)}>
            <FontAwesomeIcon fontSize={20} icon={faMagnifyingGlass} />
          </Button>
          {auth ? <UserButton auth={auth} /> : <LoginButton />}
        </Stack>
      </header>
      <SimpleDialog open={viewSearchBox} close={searchBoxClose} />
    </>
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
