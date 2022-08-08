import { AxiosError } from "axios";
import { errorDictionary } from "./dictionary";

export class ErrorHandler {
  public static parse(err: AxiosError<any>) {
    const e = err.response?.data.message as string;
    const dict = errorDictionary[e];
    if (dict) return dict;
    else throw err;
  }
}
