import axios, { AxiosInstance } from "axios";

export const citizensApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CITIZENS_URL,
});

export const citiesApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CITIES_URL,
});