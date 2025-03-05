import { AxiosResponse } from "axios";
import { citiesApi } from "./api";
import { ICity } from "../types";

export const getCities = (): Promise<AxiosResponse<ICity[]>> => {
  return citiesApi.get("cities");
}