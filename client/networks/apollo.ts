import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache, NormalizedCacheObject, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { isBrowser } from "./axios";
import { EndPoints } from "./url";
import nookies from "nookies";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const cache = new InMemoryCache({ addTypename: false });

let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

export function getApolloClient(ctx?: { req: any }) {
  const isSSR = !isBrowser();

  const token = (() => {
    if (isSSR && ctx) {
      return nookies.get(ctx)["access_token"];
    } else if (isSSR === false) {
      return sessionStorage.getItem("access_token");
    } else {
      return "";
    }
  })();

  /**ウェブソケットリンク*/
  const wsLink = isBrowser()
    ? new GraphQLWsLink(
        createClient({
          url: EndPoints.getSubscriptionEndPoint(),
        })
      )
    : null;

  /**httpリンク*/
  const httpLink = new HttpLink({
    uri: EndPoints.getQueryEndPoint(),
  });

  /**認証情報の付与*/
  const authLink = setContext((_, { headers }) => {
    //ヘッダーにマージ
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  /**実行環境とクエリ内容によってエンドポイントを切替*/
  const splitLink =
    isBrowser() && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === "OperationDefinition" && definition.operation === "subscription";
          },
          wsLink,
          httpLink
        )
      : httpLink;

  const link = authLink.concat(splitLink);

  if (!isSSR && !ctx) {
    if (clientInstance) return clientInstance;
    else {
      clientInstance = new ApolloClient({
        ssrMode: false,
        link,
        credentials: "include",
        cache,
        defaultOptions,
      });
      return clientInstance;
    }
  } else {
    return new ApolloClient({
      ssrMode: true,
      link,
      credentials: "include",
      cache,
      defaultOptions,
    });
  }
}
