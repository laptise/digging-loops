import { DocumentNode, gql } from "@apollo/client";
import { Track } from "@entities";
import { getApolloClient } from "@networks/apollo";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

const queries = {
  getTrackById: gql`
    query getTrackById($id: Float!) {
      getTrackById(id: $id) {
        id
        title
        keyChord
        file {
          name
        }
        thumbnail {
          url
        }
      }
    }
  `,
};

function getQuery(nodeKey: keyof typeof queries) {
  return queries[nodeKey];
}

type Query<R, N extends string, P extends {}> = {
  name: N;
  resType?: R;
} & P;

type QueryType = Query<Track, "getTrackById", { id: number }>;

export class QueryPublisher {
  constructor(private ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {}

  private async query<T>(key: QueryType) {
    const { name: queryName, ...variables } = key;
    const node = getQuery(queryName) as DocumentNode;
    const cl = getApolloClient(this.ctx);
    const raw = await cl.query({ query: node, variables });
    return (raw.data?.[queryName] as T) || null;
  }

  public async getTrackById(id: number) {
    return await this.query<Track[]>({ name: "getTrackById", id });
  }
}
