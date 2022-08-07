import { Box, Paper, Typography } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layout";
import styles from "../styles/Index.module.scss";

const TopPreset = () => {
  return (
    <Box>
      <Typography variant="h4">Top Preset</Typography>
    </Box>
  );
};

const Home: NextPage = () => {
  return (
    <Layout pageTitle="홈" mainId="22">
      <Paper id={styles.paper}>
        Digging Loops
        <TopPreset />
      </Paper>
    </Layout>
  );
};

export default Home;
