import { Box, Paper, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { serverSideAxios } from "../axios/server";
import { Layout } from "../components/layout";
import styles from "../styles/Index.module.scss";

const TopPreset = () => {
  return (
    <Box>
      <Typography variant="h4">Top Preset</Typography>
    </Box>
  );
};

const TopSamples = () => {
  return (
    <Box>
      <Typography variant="h4">Top Samples</Typography>
    </Box>
  );
};

const Home: NextPage = () => {
  useEffect(() => {
    serverSideAxios.get("auth/test");
  }, []);
  return (
    <Layout pageTitle="홈" mainId="22">
      <Paper id={styles.paper}>
        Digging Loops
        <Stack direction="row" spacing={2}>
          <TopSamples />
          <TopPreset />
        </Stack>
      </Paper>
    </Layout>
  );
};

export default Home;
