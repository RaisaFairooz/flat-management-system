import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetcher = async ({ queryKey }: any) => {
  const tableName = queryKey[0];

  return await axios.post("/api/fetcher", { tableName });
};
const useFetchQuery = (tableName: string) => {
  const { data, isError, isLoading, error } = useQuery([tableName], fetcher);
  return {
    data: data?.data,
    isError,
    isLoading,
    error,
  };
};

export default useFetchQuery;
