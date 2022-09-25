import { DocumentNode, gql, useQuery } from "@apollo/client";
import { SearchTrackPayload } from "@dtos";
import { Tag, Track } from "@entities";
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
  searchTracks: gql`
    query searchTracks($condition: TrackSearchInput!) {
      searchTracks(condition: $condition) {
        duration
        title
        bars
        id
        playedCount
        purchasedCount
        keyChord
        bpm
        file {
          createdAt
          url
          name
        }
        thumbnail {
          url
        }
      }
    }
  `,
  searchTag: gql`
    query searchTag($name: String!) {
      searchTag(name: $name) {
        id
        name
      }
    }
  `,
} as const;

function makeHook<R extends any, V extends {}, K extends keyof typeof queries>(nodeKey: K) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (variables: V) => useQuery<{ [key in K]: R }, V>(queries[nodeKey], { variables });
}

export const useGetTrackById = makeHook<Track, { id: number }, "getTrackById">("getTrackById");
export const useSearchTag = makeHook<Tag[], { name: string }, "searchTag">("searchTag");

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

  public async searchTracks(condition: SearchTrackPayload) {
    return await this.query<Track[]>("searchTracks", { condition });
  }
}
