import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetcher = async ({ queryKey }: any) => {
  const columnName = queryKey[0];

  return await axios.get(`/api/fetch_null_flat?columnName=${columnName}`);
};
const useNullFlat = (columnName:string) => {
  const { data, isError, isLoading, error } = useQuery([columnName], fetcher,{

    enabled:columnName!==""
  });
  return {
    isError,
    isLoading,
    error,
    data: data?.data,
  };
};

export default useNullFlat;
