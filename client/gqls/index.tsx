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
        fileMapId
        duration
        bars
        bpm
        file {
          name
        }
        thumbnail {
          url
        }
      }
    }
  `,
  getProfile: gql`
    query {
      getProfile {
        email
        uploadedTracks {
          id
          title
          keyChord
          fileMapId
          duration
          bars
          bpm
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
  `,
};

export class QueryPublisher {
  constructor(private ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {}

  private getQuery(nodeKey: keyof typeof queries) {
    return queries[nodeKey];
  }

  private async query<T>(name: keyof typeof queries, params?: object) {
    const query = this.getQuery(name);
    const variables = params;
    const cl = getApolloClient(this.ctx);
    const raw = await cl.query({ query, variables });
    return (raw.data?.[name] as T) || null;
  }

  public async getTrackById(id: number) {
    return await this.query<Track>("getTrackById", { id });
  }

  public async getProfile() {
    return await this.query<Track[]>("getProfile");
  }
}
