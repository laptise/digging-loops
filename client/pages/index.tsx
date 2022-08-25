import { User } from "@entities";
import { Box, Stack, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { TopLayout } from "../components/top/top-layout";
import { withAuth } from "../ssr/auth";
const TopPreset = () => {
  return (
    <Box>
      <Typography variant="h4">Top Preset</Typography>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `main-tab-${index}`,
    "aria-controls": `main-tabpanel-${index}`,
  };
}

const TopSamples = () => {
  return (
    <Box>
      <Typography variant="h4">Top Samples</Typography>
    </Box>
  );
};

const Home: NextPage<{ auth: User | null }> = ({ auth }) => {
  const [value, setValue] = useState(0);
  return (
    <TopLayout auth={auth} value={0}>
      <Stack direction="row" spacing={2}>
        <TopSamples />
        <TopPreset />
      </Stack>
    </TopLayout>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = withAuth;
