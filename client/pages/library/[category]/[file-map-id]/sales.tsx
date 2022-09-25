import { requireAuth } from "@auth";
import { TrackInfoLayout } from "@components/layout/uploaded-items/track-info/track-info-layout";
import { UploadedItemsLayout } from "@components/layout/uploaded-items/uploaded-item-layout";
import { Track, User } from "@entities";
import { Paper, Stack, Tab, Tabs } from "@mui/material";
import { QueryPublisher } from "gqls";
import { GetServerSideProps } from "next";
import { FC } from "react";

type MyTrackInfoType = {
  auth: User;
  category: string;
  track: Track;
};

const MyTrackSales: FC<MyTrackInfoType> = ({ auth, category, track }) => {
  return (
    <UploadedItemsLayout auth={auth} category={category} pageTitle={track?.title}>
      <Paper>
        <TrackInfoLayout track={track} value={2}>
          <Stack sx={{ p: 3 }} spacing={1}>
            통계
          </Stack>
        </TrackInfoLayout>
      </Paper>
    </UploadedItemsLayout>
  );
};

export default MyTrackSales;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async ({ query, params }) => {
    const fileMapId = params?.["file-map-id"]!;
    const category = params?.["category"]!;
    const qb = new QueryPublisher(ctx);
    const track = await qb.getTrackById(Number(fileMapId));
    return { props: { category, track } };
  });
