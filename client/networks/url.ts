import { isBrowser } from "./axios";
import constants from "../const.json";
const Containers = {} as const;
export namespace EndPoints {
  export const hostName = process.env.NEXT_PUBLIC_DOMAIN_NAME;

  function getServerPort() {
    return isBrowser() ? constants.serverEntryPort : constants.serverEndPort;
  }

  function getServerName() {
    return isBrowser() ? hostName : constants.serverContainerName;
  }

  function getServerEndPoint() {
    return `${getServerName()}:${getServerPort()}`;
  }
  export function getServerUrl() {
    return `http://${getServerEndPoint()}`;
  }

  export function getQueryEndPoint() {
    return `http://${getServerEndPoint()}/graphql`;
  }

  export function getSubscriptionEndPoint() {
    return `ws://${getServerEndPoint()}/graphql`;
  }
}
