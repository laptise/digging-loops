import { requireAuth } from "@auth";
import { TrackInfoLayout } from "@components/layout/uploaded-items/track-info/track-info-layout";
import { UploadedItemsLayout } from "@components/layout/uploaded-items/uploaded-item-layout";
import { Track, User } from "@entities";
import { faPen } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForceUpdate } from "@hooks/use-force-update";
import { useTextEditorModal } from "@hooks/edit-modals/use-text-editor-modal";
import { Box, Chip, IconButton, Paper, Stack, Table, TableCell, TableRow, Typography } from "@mui/material";
import { QueryPublisher, useGetTrackById } from "gqls";
import { mixinComponent } from "lib/mixin-component";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { FC } from "react";
import { useTagEditorModal } from "@hooks/edit-modals/use-tag-editor-modal";

type MyTrackInfoType = {
  auth: User;
  category: string;
  track: Track;
};

const Cell = mixinComponent(TableCell, { style: { border: "none" } });
const Header = mixinComponent(Cell, { component: "th", variant: "head", style: { color: "#777" } });

const MyTrackInfo: FC<MyTrackInfoType> = ({ auth, category, track }) => {
  const forceUpdate = useForceUpdate();
  const [TrackNameEditModal, trackNameEditOpen, isTrackNameUpdated] = useTextEditorModal({
    question: "트랙명 입력",
    placeholder: track.title,
    afterSubmit(value) {
      track.title = value;
      forceUpdate();
    },
  });

  const [TagEditModal, tagEditOpen, isTagEdited] = useTagEditorModal({
    afterSubmit(value) {
      track.tags = value;
      forceUpdate();
    },
  });
  return (
    <UploadedItemsLayout auth={auth} category={category} pageTitle={track?.title}>
      <Paper>
        <TrackNameEditModal />
        <TagEditModal />
        <TrackInfoLayout track={track} value={1}>
          <Stack direction="row">
            <Stack sx={{ p: 3 }} spacing={1}>
              <Table>
                <TableRow>
                  <Header>제목</Header>
                  <Cell style={{ color: isTrackNameUpdated ? "red" : undefined }}>{track.title}</Cell>
                  <Cell>
                    <IconButton onClick={() => trackNameEditOpen()}>
                      <FontAwesomeIcon fontSize={14} icon={faPen} />
                    </IconButton>
                  </Cell>
                  <Header rowSpan={4}>
                    <Image alt={track?.thumbnail?.name} src={track?.thumbnail?.url || ""} width={200} height={200} />
                    <Typography>아트웍</Typography>
                  </Header>
                </TableRow>
                <TableRow>
                  <Header>Tags</Header>
                  <Cell>
                    {track.tags?.map((x) => (
                      <Chip key={x.id} label={x.name} />
                    ))}
                  </Cell>
                  <Cell>
                    <IconButton onClick={() => tagEditOpen()}>
                      <FontAwesomeIcon fontSize={14} icon={faPen} />
                    </IconButton>
                  </Cell>
                </TableRow>
                <TableRow>
                  <Header>키</Header>
                  <Cell>{track.keyChord}</Cell>
                </TableRow>
                <TableRow>
                  <Header>템포</Header>
                  <Cell>{track.bpm}</Cell>
                </TableRow>
                <TableRow>
                  <Header>길이</Header>
                  <Cell>{track.duration}</Cell>
                </TableRow>
              </Table>
            </Stack>
            <Box style={{ width: 200, height: 200 }}></Box>
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
