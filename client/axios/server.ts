import Axios from "axios";
export const isBrowser = () => typeof window !== "undefined";
const getCsrToken = () => (isBrowser() ? sessionStorage.getItem("access_token")?.toString() : "");
export const clientAxios = Axios.create({
  baseURL: `http://${process.env.DOMAIN_NAME}:13018`,
  headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest", authorization: `Bearer ${getCsrToken()}` },
});

export const ssrAxios = Axios.create({
  baseURL: "http://dl_server:3000",
  headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest", authorization: `Bearer ${getCsrToken()}` },
});
