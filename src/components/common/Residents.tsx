import useFetchQuery from "@/hooks/useFetchQuery";
import { Loader, Table } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useState } from "react";
import { QueryClient, useQueryClient } from "react-query";
import { useModalStore } from "src/global/modal";
import { Check, Cross, Edit, Trash } from "tabler-icons-react";
import EditUserByRole from "../add-edit/editUser";
import ModalComponent from "./Modal";
import Search from "./Search";

export const handleDelete = async (
  url: string,
  name: string,
  queryClient: any
) => {
  showNotification({
    id: "load-data",
    loading: true,
    title: "Loading your data",
    message: "Data will be loaded in 3 seconds, you cannot close this yet",
    autoClose: false,
    disallowClose: true,
  });
  const response = await axios.delete(url);
  updateNotification({
    id: "load-data",
    color: response.statusText === "OK" ? "teal" : "red",
    title: response.statusText === "OK" ? "Data was deleted" : "Error",
    message:
      response.statusText === "OK" ? "Data was deleted successfully" : "Error",
    icon: response.statusText === "OK" ? <Check /> : <Cross />,
    autoClose: 2000,
  });
  queryClient.invalidateQueries([`${name}`]);
  console.log("handle delete", response);
};

const Residents = () => {
  const { data, isError, isLoading, error } = useFetchQuery("residents");
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(null);
  const queryClient = useQueryClient();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h3>error</h3>;
  }
  if (data?.length < 1) {
    return;
  }

  console.log("r", data);
  const rows = data.map((element: any) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{element.nid}</td>
      <td>{element.phone_number}</td>
      <td>{element.family_member}</td>
      <td>{element.occupation}</td>
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
              familyMembers: element.family_member,
              occupation: element.occupation,
              department: "demo",
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
              `/api/deleteRow?tableName=residents&id=${element.id}`,
              "residents",
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
      <Table horizontalSpacing="xl" verticalSpacing="xl" fontSize="lg">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Nid</th>
            <th>Phone Number</th>
            <th>Family member</th>
            <th>Occupation</th>
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
          <EditUserByRole role="resident" type="edit" data={selected} />
        )}
      </ModalComponent>
    </>
  );
};

export default Residents;
