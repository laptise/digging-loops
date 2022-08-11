import { User } from "@entities";
import { Paper, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { Layout } from "../components/layout";
import { withAuth } from "../ssr/auth";

const Library: NextPage<{ auth: User | null }> = ({ auth }) => {
  return (
    <Layout pageTitle="라이브러리" mainId="22" auth={auth}>
      <Paper>
        <Typography variant="h4" sx={{ p: 2 }}>
          라이브러리
        </Typography>
      </Paper>
    </Layout>
  );
};
export default Library;
export const getServerSideProps: GetServerSideProps = withAuth;
