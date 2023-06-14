import { useState, useEffect } from "react";
import axios from "axios";
import { LOCALSTORAGE_KEY } from "../constants";
import localStorageHooks from "../utils/localStorageHooks";

axios.defaults.baseURL = "API_BASE_URL";

// fn axios intercept request header
const axiosInterceptor = () => {
  const { getLocalStorage } = localStorageHooks();
  axios.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
      const plainToken = getLocalStorage(LOCALSTORAGE_KEY.TOKEN);
      const token = plainToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });
};

// Fetcher Hooks
const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axiosInterceptor();
        const result = await axios.request(axiosParams);
        setResponse(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);

  return { response, error, loading };
};

// Fetcher Utils
export const fetcher = async (url, config) => {

  let header = {
    ...config,
    url,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
  };

  try {
    axiosInterceptor();
    let res = await axios.request(header);
    return res;
  } catch (err) {
    throw err?.response;
  }
};

export default useAxios;
