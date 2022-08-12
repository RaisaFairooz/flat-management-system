import useNullFlat from "@/hooks/useNullFlat";
import {
  Button,
  Group,
  Select,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Check, Cross, Edit } from "tabler-icons-react";
import ModalComponent from "../common/Modal";
const dt = ["Available for renting", "Available for buying"];

const Outsider = ({ role }: any) => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const { data, isError, isLoading, error } = useNullFlat(query);

  return (
    <div>
      <Select
        value={value}
        placeholder="Browse by"
        onChange={(val) => {
          if (val === dt[0]) {
            setValue(val);
            setQuery("resident");
          } else {
            setValue(val);
            setQuery("owner");
          }
        }}
        data={dt}
      />
      {data && <Helper data={data} />}
    </div>
  );
};

export default Outsider;

const Helper = ({ data }: any) => {
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState({});
  console.log({ data });
  const rows = data.map((element: any) => (
    <tr key={element.flat_id}>
      <td>{element.flat_id}</td>
      <td>{element.description}</td>
      <td>
        <Text
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setEditing(true);
            setSelected({ element });
          }}
        >
          Request contact
        </Text>
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
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <ModalComponent
        open={editing}
        setOpen={setEditing}
        message={`Send request`}
      >
        {selected && <Form data={selected} />}
      </ModalComponent>
    </>
  );
};

const Form = ({ data: { element } }: any) => {
  const queryClient = useQueryClient();
  console.log(element);
  const [number, setNumber] = useState("01643089371");
  const [description, setDescription] = useState("new description");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    showNotification({
      id: "load-data",
      loading: true,
      title: "Requesting",
      message: "Please wait",
      autoClose: false,
      disallowClose: true,
    });
    const requests = {
      flat_id: element.flat_id,
      number,
      description,
      id: `${element.owner_id}`,
    };

    console.log(requests);

    const response = await axios.post("/api/request", requests);
    console.log(response);
    updateNotification({
      id: "load-data",
      color: response.data.affectedRows ? "teal" : "red",
      title: response.data.affectedRows ? "Request sent" : "Error",
      message: response.data.affectedRows
        ? "Request was sent"
        : response.data.error.sqlMessage,
      icon: response.data.affectedRows ? <Check /> : <Cross />,
      autoClose: 2000,
    });
    queryClient.invalidateQueries("owners");
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Phone number"
        placeholder="your phone number(11 digit)"
        value={number}
        onChange={(e) => setNumber(e.currentTarget.value)}
        required
      />
      <Textarea
        placeholder="Description"
        label="Description"
        required
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />
      <Group position="right" mt="md">
        <Button type="submit" disabled={number.length !== 11}>
          Request
        </Button>
      </Group>
    </form>
  );
};
