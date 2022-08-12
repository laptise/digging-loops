import { User } from "@entities";
import {
  faAlbumCollection,
  faBars,
  faChevronLeft,
  faCloudArrowUp,
  faIdCard,
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  ModalProps,
  Stack,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import styles from "../../styles/Common.module.scss";
import SearchPanel from "./search-panel";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
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
        {auth && <DrawerMenu drawerOpenState={drawerOpenState} width={200} auth={auth} />}
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
      PaperProps={{ style: { position: "fixed", top: 0, width } }}
      variant="persistent"
      style={{ width: drawerOpen ? width : 0, transition: "all 300ms", fontSize: 16 }}
    >
      <Stack>
        <Stack style={{ minHeight: 64 }} justifyContent="center">
          <Button onClick={() => setDrawerOpen(false)} style={{ width: 60, marginLeft: "auto", height: "100%" }}>
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </Button>
        </Stack>
        <Divider />
        <ListItemButton component="a" href="#customized-list">
          <ListItemAvatar>
            <Avatar alt={auth?.name} />
          </ListItemAvatar>
          <ListItemText
            sx={{ my: 0 }}
            primary={auth?.name}
            primaryTypographyProps={{
              fontSize: 20,
              fontWeight: "medium",
              letterSpacing: 0,
            }}
          />
        </ListItemButton>
        <Divider />
        <Link passHref={true} href="/profile">
          <ListItemButton component="a" href="#customized-list">
            <ListItemIcon style={{ minWidth: 30, marginRight: 10 }}>
              <FontAwesomeIcon icon={faIdCard} size="lg" style={{ margin: "auto" }} />
            </ListItemIcon>
            <Typography style={{ fontWeight: "medium", fontSize: 18 }}>내 프로필</Typography>
          </ListItemButton>
        </Link>
        <Link passHref={true} href="/library">
          <ListItemButton component="a">
            <ListItemIcon style={{ minWidth: 30, marginRight: 10 }}>
              <FontAwesomeIcon icon={faAlbumCollection} size="lg" style={{ margin: "auto" }} />
            </ListItemIcon>
            <Typography style={{ fontWeight: "medium", fontSize: 18 }}>내 라이브러리</Typography>
          </ListItemButton>
        </Link>
        <Link passHref={true} href="/upload">
          <ListItemButton component="a">
            <ListItemIcon style={{ minWidth: 30, marginRight: 10 }}>
              <FontAwesomeIcon icon={faCloudArrowUp} size="lg" style={{ margin: "auto" }} />
            </ListItemIcon>
            <Typography style={{ fontWeight: "medium", fontSize: 18 }}>업로드</Typography>
          </ListItemButton>
        </Link>
        <Divider />
        <ListItemButton component="a" onClick={logout}>
          <ListItemIcon style={{ minWidth: 30, marginRight: 10 }}>
            <FontAwesomeIcon icon={faRightFromBracket} size="lg" style={{ margin: "auto" }} />
          </ListItemIcon>
          <Typography style={{ fontWeight: "medium", fontSize: 18 }}>로그아웃</Typography>
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
      Powered by{" "}
      <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
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
