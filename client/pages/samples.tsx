import { User } from "@entities";
import { Box, Stack, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { TopLayout } from "../components/top/top-layout";
import { withAuth } from "../ssr/auth";

const Samples: NextPage<{ auth: User | null }> = ({ auth }) => {
  return (
    <TopLayout auth={auth} value={1}>
      <Stack direction="row" spacing={2}>
        SAMPLE
      </Stack>
    </TopLayout>
  );
};

export default Samples;
export const getServerSideProps: GetServerSideProps = withAuth;
