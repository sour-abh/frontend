import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { store } from "../redux/store";

const HOST_URL = import.meta.env.VITE_API_URL;

const headers = {
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};

const instance: AxiosInstance = axios.create({
  baseURL: HOST_URL,
  headers: headers,
});

instance.interceptors.request.use(
  async function (conf: InternalAxiosRequestConfig) {
    const state = store?.getState();
    const userToken = state.auth?.token;
    let params = conf.params || {};
    const preservedParams = {};
    const fullQueryStringArr: string[] = [];

    if (conf.params) {
      params = conf.params;
    }
    if (userToken && conf.headers) {
      conf.headers.Authorization = `Bearer ${userToken}`;
    }
    conf.params = params;

    if (Object.keys(preservedParams).length > 0) {
      fullQueryStringArr.push(
        new URLSearchParams(preservedParams as Record<string, string>).toString()
      );
    }

    if (conf.url?.split("?")[1]) {
      fullQueryStringArr.push(conf.url.split("?")[1]);
    }

    if (conf.url) {
      conf.url =
        conf.url.split("?")[0] +
        (fullQueryStringArr.length > 0 ? "?" + fullQueryStringArr.join("&") : "");
    }

    return conf;
  },
  function (error) {
    console.error("Request error ", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    switch (status) {
      case 400:
        console.error("400 error", error);
        break;
      case 401:
        console.error("401 error", error);
        break;
      case 404:
        console.error("404 error", error);
        break;
      case 422:
        console.error("422 error", error);
        console.error(error.response.data.message);
        break;
      case 500:
        console.error("500 error", error);
        break;
      default:
        console.error("unknown error", error);
        break;
    }
    return Promise.reject(error);
  }
);

export default instance;