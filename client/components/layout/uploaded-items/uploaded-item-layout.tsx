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
type UploadedItemsLayoutProps = { value: number; children: ReactNode; auth: User | null };
export const UploadedItemsLayout: FC<UploadedItemsLayoutProps> = ({ value, children, auth }) => {
  return (
    <Layout pageTitle="홈" mainId={styles.main} auth={auth}>
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
      <Link href="/" passHref={true}>
        <Tab label="SAMPLES" {...a11yProps(0, value)} />
      </Link>
      <Link href="/samples" passHref={true}>
        <Tab label="PACKS" {...a11yProps(1, value)} />
      </Link>
      <Link href="/presets" passHref={true}>
        <Tab label="MIDI" {...a11yProps(2, value)} />
      </Link>
    </Tabs>
  );
};
