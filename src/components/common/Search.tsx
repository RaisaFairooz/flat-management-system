import { Button, Select, TextInput } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { SearchOff, UserSearch } from "tabler-icons-react";
import { Helper } from "./Owners";

const Search = ({ type }: any) => {
  const [value, setValue] = useState("");
  const [table, setTable] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleSearch = async () => {
    const response = await axios.get(
      `/api/search?tableName=${table}&searchColumn=${
        value === "name" ? value : "Phone_number"
      }&searchParam=${search}`
    );
    setSearchData(response?.data);
  };
  return (
    <>
      <Select
        value={table}
        placeholder="Search Table"
        onChange={setTable}
        data={["owners", "residents", "staffs"]}
        sx={{
          width: "200px",
          marginBottom: "5px",
        }}
      />
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
        {table && value && search && (
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
      {searchData.length > 0 && ["staffs", "owners"].includes(table) && (
        <Helper
          type={table}
          data={searchData}
          setOpen={setEditing}
          setSelected={setSelected}
        />
      )}
    </>
  );
};

export default Search;
