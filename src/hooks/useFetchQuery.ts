import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetcherFunction = async ({ queryKey }: any) => {
  const tableName = queryKey[0];

  return tableName === "flat"
    ? await axios.get("/api/fetch_flat")
    : await axios.post("/api/fetcher", { tableName });
};
const useFetchQuery = (tableName = "flat") => {
  const { data, isError, isLoading, error } = useQuery(
    [tableName],
    fetcherFunction
  );
  return {
    data: data?.data,
    isError,
    isLoading,
    error,
  };
};

export default useFetchQuery;
