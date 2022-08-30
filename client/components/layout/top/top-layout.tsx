import { User } from "@entities";
import { Box, Paper } from "@mui/material";
import { FC, ReactNode } from "react";
import { Layout } from "..";
import { TopTabs } from "./tabs";
import styles from "../../../styles/Index.module.scss";

type TopLayoutProps = { value: number; children: ReactNode; auth: User | null };
export const TopLayout: FC<TopLayoutProps> = ({ value, children, auth }) => {
  return (
    <Layout pageTitle="홈" mainId={styles.main} auth={auth}>
      <Paper id={styles.paper} style={{ minWidth: "90%" }}>
        <TopTabs value={value} />
        <Box sx={{ p: 2 }}>{children}</Box>
      </Paper>
    </Layout>
  );
};
