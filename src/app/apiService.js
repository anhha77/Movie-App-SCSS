import axios from "axios";
import { BASE_URL, TMDB_TOKEN } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Bearer ${TMDB_TOKEN}`;
    console.log("Start Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default apiService;
