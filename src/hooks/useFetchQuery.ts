import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetcher = async ({ queryKey }: any) => {
  const tableName = queryKey[0];

  return tableName === "flat"
    ? await axios.get("/api/fetch_flat")
    :tableName === "posts"?  await axios.get("/api/get_posts"):await axios.post("/api/fetcher", { tableName });
};
const useFetchQuery = (tableName = "flat") => {
  const { data, isError, isLoading, error } = useQuery([tableName], fetcher);
  return {
    isError,
    isLoading,
    error,
    data: data?.data,
  };
};

export default useFetchQuery;
