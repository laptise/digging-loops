import Axios from "axios";

export const serverSideAxios = Axios.create({
  baseURL: "http://localhost:13018",
});
