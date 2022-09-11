import { User } from "@entities";
import { faBars, faChevronLeft, faCloudArrowUp, faCloudCheck, faMagnifyingGlass, faRightFromBracket } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Divider, Drawer, ListItemAvatar, ListItemButton, ListItemIcon, Modal, ModalProps, Stack, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { DlPlayer } from "../../hooks/use-player";
import styles from "../../styles/Common.module.scss";
import SearchPanel from "./search-panel";
type LayoutProps = {
  children: ReactNode;
  pageTitle: string;
  mainId: string;
  auth?: User | null;
};

export interface SimpleDialogProps {
  open: boolean;
  close(): void;
}

export const Layout: FC<LayoutProps> = ({ children, pageTitle, mainId, auth }) => {
  const drawerOpenState = useState(true);
  return (
    <>
      <Stack direction="row">
        {auth && <DrawerMenu drawerOpenState={drawerOpenState} width={70} auth={auth} />}
        <div className={styles.container} style={{ flex: 1 }}>
          <AppBarr auth={auth} drawerOpenState={drawerOpenState} />
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
      </Stack>
    </>
  );
};

const DrawerMenu: FC<{ drawerOpenState: [boolean, Dispatch<SetStateAction<boolean>>]; width: number; auth: User | null }> = ({
  drawerOpenState,
  width,
  auth,
}) => {
  const [drawerOpen, setDrawerOpen] = drawerOpenState;
  const router = useRouter();
  const logout = async () => {
    sessionStorage.removeItem("access_token");
    destroyCookie(null, "access_token");
    router.reload();
  };
  return (
    <Drawer
      open={drawerOpen}
      PaperProps={{ style: { position: "fixed", top: 0, width, backgroundColor: "#5d408f" } }}
      variant="persistent"
      style={{ width: drawerOpen ? width : 0, transition: "all 300ms", fontSize: 16 }}
    >
      <DlPlayer />
      <Stack style={{ color: "white", alignItems: "center" }} spacing={1}>
        <Stack style={{ minHeight: 64 }} justifyContent="center">
          <Button onClick={() => setDrawerOpen(false)} style={{ width: 60, marginLeft: "auto", height: "100%" }}>
            <FontAwesomeIcon icon={faChevronLeft} size="lg" color="white" style={{ margin: "auto" }} />
          </Button>
        </Stack>
        <Divider />
        <Link passHref={true} href="/profile">
          <ListItemButton component="a" href="#customized-list">
            <Tooltip title="My profile" placement="right" enterDelay={50}>
              <ListItemAvatar>
                <Avatar alt={auth?.name} style={{ margin: "auto" }} />
              </ListItemAvatar>
            </Tooltip>
          </ListItemButton>
        </Link>
        <Divider />
        <Link passHref={true} href="/library">
          <ListItemButton component="a">
            <Tooltip title="My uploads" placement="right" enterDelay={50}>
              <ListItemIcon style={{ minWidth: 30 }}>
                <FontAwesomeIcon icon={faCloudCheck} color="white" size="lg" style={{ margin: "auto" }} />
              </ListItemIcon>
            </Tooltip>
          </ListItemButton>
        </Link>
        <Link passHref={true} href="/upload">
          <ListItemButton component="a">
            <Tooltip title="Upload new file" placement="right" enterDelay={50}>
              <ListItemIcon style={{ minWidth: 30 }}>
                <FontAwesomeIcon icon={faCloudArrowUp} color="white" size="lg" style={{ margin: "auto" }} />
              </ListItemIcon>
            </Tooltip>
          </ListItemButton>
        </Link>
        <Divider />
        <ListItemButton component="a" onClick={logout}>
          <Tooltip title="Signout" placement="right" enterDelay={50}>
            <ListItemIcon style={{ minWidth: 30 }}>
              <FontAwesomeIcon icon={faRightFromBracket} color="white" size="lg" style={{ margin: "auto" }} />
            </ListItemIcon>
          </Tooltip>
        </ListItemButton>
      </Stack>
    </Drawer>
  );
};
const SimpleDialog: FC<SimpleDialogProps> = ({ open, close }) => {
  const handleClose: ModalProps["onClose"] = (_, reason) => {
    close();
  };

  const handleListItemClick = (value: string) => {};

  return (
    <Modal onClose={handleClose} open={open} keepMounted>
      <SearchPanel />
    </Modal>
  );
};

const LoginButton = () => (
  <Link passHref={true} href="/login">
    <Button sx={{ color: "white", marginLeft: "auto" }}>LOGIN</Button>
  </Link>
);

const UserButton: FC<{ auth: User }> = ({ auth }) => {
  return <Button>{auth.name}</Button>;
};

const Header: FC<{ auth?: User | null }> = ({ auth }) => {
  return (
    <>
      <header className={styles.header}>
        <Stack direction="row">{auth ? <UserButton auth={auth} /> : <LoginButton />}</Stack>
      </header>
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
      DIGGING LOOPS
    </a>
  </footer>
);

const AppBarr: FC<{ auth?: User | null; drawerOpenState: [boolean, Dispatch<SetStateAction<boolean>>] }> = ({ auth, drawerOpenState }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [viewSearchBox, setViewSearchBox] = useState(false);
  const [drawerOpen, setDrawerOpen] = drawerOpenState;
  const searchBoxClose = () => setViewSearchBox(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    console.log(1199);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={styles.header}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex" }}>
            {drawerOpen === false && (
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setDrawerOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
              </IconButton>
            )}
            <Link passHref={true} href="/">
              Digging Loops
            </Link>
            <Button onClick={() => setViewSearchBox(true)}>
              <FontAwesomeIcon fontSize={20} icon={faMagnifyingGlass} color="white" />
            </Button>
            {auth ? <></> : <LoginButton />}
          </Toolbar>
        </AppBar>
      </Box>
      <SimpleDialog open={viewSearchBox} close={searchBoxClose} />
    </>
  );
};
