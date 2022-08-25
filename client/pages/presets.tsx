import { User } from "@entities";
import { Box, Stack, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { TopLayout } from "../components/top/top-layout";
import { withAuth } from "../ssr/auth";

const Presets: NextPage<{ auth: User | null }> = ({ auth }) => {
  return (
    <TopLayout auth={auth} value={2}>
      <Stack direction="row" spacing={2}>
        PRESET
      </Stack>
    </TopLayout>
  );
};

export default Presets;
export const getServerSideProps: GetServerSideProps = withAuth;
