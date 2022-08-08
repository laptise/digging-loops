import Axios from "axios";
export const isBrowser = () => typeof window !== "undefined";
const getCsrToken = () => (isBrowser() ? sessionStorage.getItem("access_token")?.toString() : "");
export const serverSideAxios = Axios.create({
  baseURL: "http://localhost:13018",
  headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest", authorization: `Bearer ${getCsrToken()}` },
});
