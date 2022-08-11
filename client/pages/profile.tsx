import { User } from "@entities";
import { Paper, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { Layout } from "../components/layout";
import { withAuth } from "../ssr/auth";

const Profile: NextPage<{ auth: User | null }> = ({ auth }) => {
  return (
    <Layout pageTitle="프로필" mainId="22" auth={auth}>
      <Paper>
        <Typography variant="h4" sx={{ p: 2 }}>
          프로필
        </Typography>
      </Paper>
    </Layout>
  );
};
export default Profile;
export const getServerSideProps: GetServerSideProps = withAuth;
