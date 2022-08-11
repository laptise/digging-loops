import { User } from "@entities";
import { Paper, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { Layout } from "../components/layout";
import { withAuth } from "../ssr/auth";

const Upload: NextPage<{ auth: User | null }> = ({ auth }) => {
  return (
    <Layout pageTitle="업로드" mainId="22" auth={auth}>
      <Paper>
        <Typography variant="h4" sx={{ p: 2 }}>
          파일 업로드
        </Typography>
      </Paper>
    </Layout>
  );
};
export default Upload;
export const getServerSideProps: GetServerSideProps = withAuth;
