import { requireAuth } from "@auth";
import { HorizontalHeaderItem } from "@components/horizontal-header-item";
import { TrackInfoLayout } from "@components/layout/uploaded-items/track-info/track-info-layout";
import { UploadedItemsLayout } from "@components/layout/uploaded-items/uploaded-item-layout";
import { Track, User } from "@entities";
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import { QueryPublisher } from "gqls";
import { GetServerSideProps } from "next";
import { FC } from "react";
import Image from "next/image";

type MyTrackInfoType = {
  auth: User;
  category: string;
  track: Track;
};

const MyTrackInfo: FC<MyTrackInfoType> = ({ auth, category, track }) => {
  return (
    <UploadedItemsLayout auth={auth} category={category} pageTitle={track?.title}>
      <Paper>
        <TrackInfoLayout track={track} value={1}>
          <Stack direction="row">
            <Stack sx={{ p: 3 }} spacing={1}>
              <HorizontalHeaderItem label={"제목"} body={track.title}></HorizontalHeaderItem>
              <HorizontalHeaderItem label={"키 "} body={track.keyChord}></HorizontalHeaderItem>
            </Stack>
            <Box style={{ width: 200, height: 200 }}>
              <Image alt={track?.thumbnail?.name} src={track?.thumbnail?.url || ""} width={200} height={200} />
            </Box>
          </Stack>
        </TrackInfoLayout>
      </Paper>
    </UploadedItemsLayout>
  );
};

export default MyTrackInfo;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ query, params }) => {
    const fileMapId = params?.["file-map-id"]!;
    const category = params?.["category"]!;
    const qb = new QueryPublisher(ctx);
    const track = await qb.getTrackById(Number(fileMapId));
    return { props: { category, track } };
  });
