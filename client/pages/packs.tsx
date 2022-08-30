import { User } from "@entities";
import { Box, Stack, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { TopLayout } from "../components/layout/top/top-layout";
import { withAuth } from "../ssr/auth";

const Packs: NextPage<{ auth: User | null }> = ({ auth }) => {
  return (
    <TopLayout auth={auth} value={3}>
      <Stack direction="row" spacing={2}>
        Packs
      </Stack>
    </TopLayout>
  );
};

export default Packs;
export const getServerSideProps: GetServerSideProps = withAuth;
