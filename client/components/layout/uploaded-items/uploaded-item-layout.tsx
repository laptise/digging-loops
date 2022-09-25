import { User } from "@entities";
import { Box, Paper, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { Layout } from "..";
import styles from "../../../styles/Index.module.scss";
import commonStyles from "../../../styles/Common.module.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";

function a11yProps(index: number, value: number) {
  return {
    id: `main-tab-${index}`,
    "aria-controls": `main-tabpanel-${index}`,
    style: { color: index === value ? "#5d408f" : undefined, fontWeight: "bold" },
  };
}
type UploadedItemsLayoutProps = { category: string; children: ReactNode; auth: User | null; pageTitle: string };

export const UploadedItemsLayout: FC<UploadedItemsLayoutProps> = ({ category, children, auth, pageTitle }) => {
  const value = (() => {
    switch (category) {
      case "samples":
        return 0;
      case "packs":
        return 1;
      case "midis":
        return 2;
      default:
        return 9;
    }
  })();
  return (
    <Layout pageTitle={pageTitle} mainId={styles.main} auth={auth}>
      <Paper id={commonStyles.paper} style={{ minWidth: "90%" }}>
        <Typography variant="h4" sx={{ p: 2 }}>
          Uploaded Items
        </Typography>
        <LayoutTabs value={value} />
        <Box sx={{ p: 2 }}>{children}</Box>
      </Paper>
    </Layout>
  );
};

export const LayoutTabs: FC<{ value: number }> = ({ value }) => {
  return (
    <Tabs value={value} aria-label="basic tabs example">
      <Link href="/library/samples" passHref={true}>
        <Tab label="SAMPLES" {...a11yProps(0, value)} />
      </Link>
      <Link href="/library/packs" passHref={true}>
        <Tab label="PACKS" {...a11yProps(1, value)} />
      </Link>
      <Link href="/library/midis" passHref={true}>
        <Tab label="MIDI" {...a11yProps(2, value)} />
      </Link>
    </Tabs>
  );
};
