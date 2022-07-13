import { Button, Select, TextInput } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { SearchOff, UserSearch } from "tabler-icons-react";

const Search = ({ type }: any) => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const handleSearch = async () => {
    const response = await axios.get(
      `/api/search?tableName=${type}&searchColumn=${
        value === "name" ? value : "Phone_number"
      }&searchParam=${search}`
    );
    setSearchData(response?.data);
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <Select
        value={value}
        placeholder="Search by"
        onChange={setValue}
        data={["name", "phone number"]}
      />
      <TextInput
        sx={{
          flex: 2,
        }}
        placeholder="Search"
        variant="filled"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      {value && search && (
        <Button onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>{" "}
          Search
        </Button>
      )}
    </div>
  );
};

export default Search;
