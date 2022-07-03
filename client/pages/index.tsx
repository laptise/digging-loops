import { Paper } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layout";
import styles from "../styles/Index.module.scss";

const Home: NextPage = () => {
  return (
    <Layout pageTitle="홈" mainId="22">
      <Paper id={styles.paper}>Digging Loops</Paper>
    </Layout>
  );
};

export default Home;
