import { gql } from "@apollo/client";
import { Track, User } from "@entities";
import { faCloudArrowUp } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Link as MLink, Paper, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import { UploadedItemsLayout } from "@components/layout/uploaded-items/uploaded-item-layout";
import { RadiusInput } from "@components/radius-input";
import { usePlayerControl } from "@hooks/use-dl-player";
import { getApolloClient } from "@networks/apollo";
import { requireAuth } from "@auth";

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

const _appendBuffer = function (buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

const UploadedItem: FC<{ track: Track }> = ({ track }) => {
  const auRef = useRef<HTMLAudioElement | null>(null);
  const { play, testPlay } = usePlayerControl();
  const [ctx, setCtx] = useState<AudioContext | null>(null);
  const playMusic = async () => {
    console.log(track);
    const info = {
      targetUrl: `http://${process.env.NEXT_PUBLIC_DOMAIN_NAME}:13018/track/stream/10/${track.fileMapId}/${track.file?.name}`,
      trackName: track.file?.name || "",
      bpm: 0,
    };
    testPlay(info);
  };
  return (
    <Link href={`library/${track.fileMapId}`}>
      <TableRow
        key={track.id}
        sx={{
          transition: "all 50ms",
          cursor: "pointer",
          ":hover": { backgroundColor: "rgba(0,0,0,0.1)" },
          ":active": { backgroundColor: "rgba(0,0,0,0.05)" },
        }}
      >
        <TableCell>{track.title}</TableCell>
        <TableCell>
          <MLink download={track.file?.name} href={track.file?.url}>
            {track.file?.name}
          </MLink>
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>{track.keyChord}</TableCell>
        <TableCell>{format(new Date(track?.file?.createdAt as any), "yyyy-MM-dd hh:mm:ss")}</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </Link>
  );
};

const Library: NextPage<{ auth: User | null; view: User }> = ({ auth, view }) => {
  return (
    <UploadedItemsLayout auth={auth} value={0}>
      <Paper style={{ padding: 20 }}>
        <Stack direction={"row"} alignItems="center" justifyContent={"space-between"} sx={{ width: "100%", height: 40, boxSizing: "border-box" }}>
          <RadiusInput placeholder="제목으로 트랙을 검색합니다." style={{ minWidth: 160 }} />
          <Link href="/upload" passHref={true}>
            <Button variant="contained">
              <FontAwesomeIcon icon={faCloudArrowUp} style={{ marginRight: 10 }} /> 새 파일 업로드
            </Button>
          </Link>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>파일명</TableCell>
              <TableCell>태그</TableCell>
              <TableCell>길이</TableCell>
              <TableCell>마디</TableCell>
              <TableCell>템포</TableCell>
              <TableCell>키</TableCell>
              <TableCell>등록일</TableCell>
              <TableCell>다운로드 횟수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {view?.uploadedTracks?.map((x) => (
              <UploadedItem key={x.id} track={x} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </UploadedItemsLayout>
  );
};

export default Library;
export const getServerSideProps: GetServerSideProps = (ctx) =>
  requireAuth(ctx, async () => {
    const query = gql`
      query {
        getProfile {
          email
          uploadedTracks {
            id
            title
            keyChord
            fileMapId
            file {
              url
              createdAt
              name
            }
            thumbnail {
              url
              createdAt
            }
          }
        }
      }
    `;
    const view = await getApolloClient(ctx)
      .query({ query })
      .then((x) => x.data?.getProfile || null);
    return { props: { view } };
  });
