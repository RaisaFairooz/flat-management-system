import useFetchQuery from "@/hooks/useFetchQuery";
import { Button, Loader, Table } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useModalStore } from "src/global/modal";
import { Edit, Trash } from "tabler-icons-react";
import EditUserByRole from "../add-edit/editUser";
import ModalComponent from "./Modal";
import { handleDelete } from "./Residents";
import Search from "./Search";

const Owners = ({ type = "owners" }) => {
  const { data, isError, isLoading, error } = useFetchQuery(type);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h3>error</h3>;
  }

  console.log("search ", searchData);
  console.log("o", data);

  if (data?.length < 1) {
    return;
  }
  return (
    <>
      <Button>
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
      {data && <Helper data={data} type={type} />}
    </>
  );
};

export const Helper = ({ data, type }: any) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState({});
  const rows = data.map((element: any) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{element.nid}</td>
      <td>{element.phone_number}</td>
      <td>{element.address_id}</td>
      <td>
        <Edit
          onClick={() => {
            setSelected({
              id: element.id,
              address_id: element.address_id,
              name: element.name,
              phoneNumber: element.phone_number,
              villageOrStreet: "demo",
              postOffice: "demo",
              district: "demo",
              familyMembers: 1,
              occupation: "demo",
              department: type === "owners" ? "demo" : element.department,
              salary: 0,
            });
            setEditing(true);
          }}
          style={{
            cursor: "pointer",
          }}
        />
      </td>
      <td>
        <Trash
          onClick={() =>
            handleDelete(
              `/api/deleteRow?tableName=${type}&id=${element.id}`,
              type,
              queryClient
            )
          }
          style={{
            cursor: "pointer",
          }}
        />
      </td>
    </tr>
  ));

  return (
    <>
      {" "}
      <Table horizontalSpacing="xl" verticalSpacing="xl" fontSize="lg">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Nid</th>
            <th>Phone Number</th>
            <th>Address Id</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <ModalComponent
        open={editing}
        setOpen={setEditing}
        message={`Edit owner`}
      >
        {selected && (
          <EditUserByRole
            role={type.slice(0, -1)}
            type="edit"
            data={selected}
          />
        )}
      </ModalComponent>
    </>
  );
};

export default Owners;
