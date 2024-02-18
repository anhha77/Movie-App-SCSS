import { useEffect, useState } from "react";
import apiService from "../app/apiService";

const useFetch = (url, page, with_genres, sort_by) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setData(null);
        setError(null);
        let response = "";
        if (page) {
          const params = { page, with_genres, sort_by };
          console.log(params);
          response = await apiService.get(url, { params });
        } else {
          response = await apiService.get(url);
        }

        setData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError("Something went wrong!");
      }
    };
    getData();
  }, [url, page, with_genres, sort_by]);
  return { data, loading, error };
};

export default useFetch;
