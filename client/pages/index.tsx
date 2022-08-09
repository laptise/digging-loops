import { User } from "@entities";
import { Box, Paper, Stack, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { clientAxios, ssrAxios } from "../axios/server";
import { Layout } from "../components/layout";
import { withAuth } from "../ssr/auth";
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

const Home: NextPage<{ auth: User | null }> = ({ auth }) => {
  return (
    <Layout pageTitle="홈" mainId="22" auth={auth}>
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
export const getServerSideProps: GetServerSideProps = withAuth;
