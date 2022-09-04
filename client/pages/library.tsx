import { gql } from "@apollo/client";
import { User } from "@entities";
import { faCloudArrowUp } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, IconButton, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components/layout";
import { UploadedItemsLayout } from "../components/layout/uploaded-items/uploaded-item-layout";
import { RadiusInput } from "../components/radius-input";
import { getApolloClient } from "../networks/apollo";
import { requireAuth, withAuth } from "../ssr/auth";

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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
              <TableRow key={x.id}>
                <TableCell>{x.title}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                {/* <TableCell>{format(new Date(x.createdAt as any), "yyyy-MM-dd hh:mm:ss")}</TableCell> */}
                <TableCell></TableCell>
              </TableRow>
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
            name
            createdAt
          }
        }
      }
    `;
    const view = await getApolloClient(ctx)
      .query({ query })
      .then((x) => x.data?.getProfile || null);
    return { props: { view } };
  });
