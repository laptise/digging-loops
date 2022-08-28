import { gql } from "@apollo/client";
import { User } from "@entities";
import { ListItem, Paper, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { Layout } from "../components/layout";
import { getApolloClient } from "../networks/apollo";
import { withAuth } from "../ssr/auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

const Library: NextPage<{ auth: User | null; view: User }> = ({ auth, view }) => {
  return (
    <Layout pageTitle="라이브러리" mainId="22" auth={auth}>
      <Paper>
        <Typography variant="h4" sx={{ p: 2 }}>
          라이브러리
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>파일명</TableCell>
              <TableCell>등록일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {view.uploadedTracks?.map((x) => (
              <TableRow key={x.id}>
                <TableCell>{x.name}</TableCell>
                <TableCell>{format(new Date(x.createdAt as any), "yyyy-MM-dd hh:mm:ss")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Layout>
  );
};

export default Library;
export const getServerSideProps: GetServerSideProps = (ctx) =>
  withAuth(ctx, async () => {
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
      .then((x) => x.data.getProfile);
    return { props: { view } };
  });
