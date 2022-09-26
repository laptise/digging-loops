import { Track, User } from "@entities";
import { Box, Stack, Typography } from "@mui/material";
import { QueryPublisher } from "gqls";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { TopLayout } from "../components/layout/top/top-layout";
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

const Home: NextPage<{ auth: User | null; topSounds: Track[] }> = ({ auth, topSounds }) => {
  console.log(topSounds);
  const [value, setValue] = useState(0);
  return (
    <TopLayout auth={auth} value={0}>
      <Stack>
        <Box sx={{ p: 3, pl: 4 }}>
          <Typography variant="h3" color={"#EEA2A2"} fontWeight="bold">
            Welcome
          </Typography>
        </Box>
        <Box sx={{ backgroundColor: "#EEA2A2", padding: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h3" color={"white"} fontWeight="bold">
              Make you music
            </Typography>
            <Typography color="white">Learn about Digging loops..</Typography>
          </Stack>
        </Box>
        <Box sx={{ p: 3, pl: 4 }}>
          <Typography variant="h3" color={"#EEA2A2"} fontWeight="bold">
            TOP SOUNDS
          </Typography>
        </Box>
        <Stack direction="row" flexWrap={"wrap"} sx={{ pl: 8, pr: 8, pb: 4 }}>
          {topSounds?.map((s) => (
            <Box sx={{ flex: 1, minWidth: "30%", maxWidth: "33%", boxSizing: "border-box" }} key={s.id}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box style={{ minWidth: 50, minHeight: 50 }}>
                  <Image alt={s.thumbnail?.name || ""} src={s.thumbnail?.url || ""} width={50} height={50} />
                </Box>
                <Stack>
                  <Typography fontSize={20} fontWeight="bold">
                    {s.title}
                  </Typography>
                  <Typography style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#999999" }}>{s.file?.name}</Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
      {/* <Stack direction="row" spacing={2}>
        <TopSamples />
        <TopPreset />
      </Stack> */}
    </TopLayout>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = (ctx) =>
  withAuth(ctx, async (ctx) => {
    const topSounds = await new QueryPublisher(ctx).getTopSounds();
    return { props: { topSounds } };
  });
