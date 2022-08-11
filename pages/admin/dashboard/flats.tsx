import ModalComponent from "@/components/common/Modal";
import useFetchQuery from "@/hooks/useFetchQuery";
import {
  Button,
  Group,
  Header,
  Modal,
  NumberInput,
  Select,
  SelectItemProps,
  Table,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Check, Cross, Edit } from "tabler-icons-react";
import create from "zustand";

interface DrawerType {
  opened: boolean;
  name: string;
  description: string;
  ownerId?: string | any;
  residentId?: string | any;
  setOpened: any;
  setName: any;
  setDescription: any;
  setOwnerId?: any;
  setResidentId?: any;
}

export const useStore = create<DrawerType>((set) => ({
  opened: false,
  name: "",
  noOfRooms: 0,
  description: "",
  ownerId: "",
  residentId: "",
  setOpened: () => set((state) => ({ opened: !state.opened })),
  setName: (val: string) => set((state) => ({ name: val })),
  // setNoOfRoomse: (val: number) => set((state) => ({ noOfRooms: val })),
  setDescription: (val: string) => set((state) => ({ description: val })),
  setOwnerId: (val: any) => set((state) => ({ ownerId: val })),
  setResidentId: (val: any) => set((state) => ({ residentId: val })),
}));

interface ItemProps extends SelectItemProps {
  label: string;
  value: string;
}

// eslint-disable-next-line react/display-name
const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, label, ...others }: any, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{label}</Text>
        </div>
      </Group>
    </div>
  )
);

const Flats = () => {
  const opened = useStore((state) => state.opened);
  const setOpened = useStore((state) => state.setOpened);
  const { data, isError, isLoading, error } = useFetchQuery();

  return (
    <>
      <Header height={60} mb={120} className="flex">
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          size="xl"
          weight={700}
        >
          Flats
        </Text>
        <Button onClick={() => setOpened(true)}>Add Flat</Button>
      </Header>
      {data && <Helper data={data} />}

      <ModalComponent open={opened} setOpen={setOpened}>
        <Form />
      </ModalComponent>
    </>
  );
};

export default Flats;

export const Helper = ({ data }: any) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState("");
  const ownerId = useStore((state) => state.ownerId);
  const setOwnerId = useStore((state) => state.setOwnerId);
  const residentId = useStore((state) => state.residentId);
  const setResidentId = useStore((state) => state.setResidentId);
  console.log({ data });
  const rows = data.map((element: any) => (
    <tr key={element.flat_id}>
      <td>{element.flat_id}</td>
      <td>{element.description}</td>
      <td>{element.owner_id}</td>
      <td>{element.resident_id}</td>
      <td>
        <Edit
          onClick={() => {
            setOwnerId(element.owner_id?.toString()??"");
            setResidentId(element.resident_id?.toString()??"");
            setSelected(element.flat_id);
            setEditing(true);
          }}
          style={{
            cursor: "pointer",
          }}
        />
      </td>
      {/* <td>
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
      </td> */}
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
            <th>Owner</th>
            <th>Resident</th>
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
          <Form
            type="edit"
            data={selected}
            ownerId={ownerId}
            setOwnerId={setOwnerId}
            residentId={residentId}
            setResidentId={setResidentId}
          />
        )}
      </ModalComponent>
    </>
  );
};

export const Form = ({
  type = "add",
  data = "",
  ownerId,
  setOwnerId,
  residentId,
  setResidentId,
}: any) => {
  const name = useStore((state) => state.name);
  const setName = useStore((state) => state.setName);
  const description = useStore((state) => state.description);
  const setDescription = useStore((state) => state.setDescription);
  const { data: owners } = useFetchQuery("owners");
  const { data: residents } = useFetchQuery("residents");
  const queryClient = useQueryClient();

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const response = await axios.post("/api/update_flat", {
      owner_id: ownerId,
      resident_id: residentId,
      id: data,
    });
    console.log({ response });
    queryClient.invalidateQueries("flat");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    showNotification({
      id: "load-data",
      loading: true,
      title: "Loading your data",
      message: "Data will be loaded in 3 seconds, you cannot close this yet",
      autoClose: false,
      disallowClose: true,
    });
    const response = await axios.post("/api/add_flat", {
      id: name,
      description,
    });
    console.log(response);
    updateNotification({
      id: "load-data",
      color: response.data.affectedRows ? "teal" : "red",
      title: response.data.affectedRows ? "Data was added" : "Error",
      message: response.data.affectedRows
        ? "Data was added"
        : response.data.error.sqlMessage,
      icon: response.data.affectedRows ? <Check /> : <Cross />,
      autoClose: 2000,
    });
    queryClient.invalidateQueries("flat");
  };
  console.log(owners);
  return (
    <form onSubmit={type === "edit" ? handleEdit : handleSubmit}>
      {type === "add" && (
        <>
          {" "}
          <TextInput
            required
            label="name"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <Textarea
            placeholder="Description"
            label="Description"
            required
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </>
      )}
      {type === "edit" && owners && residents && (
        <>
          {" "}
          <Select
            searchable
            data={owners.map((o) => o.id.toString())}
            itemComponent={AutoCompleteItem}
            label="Owner"
            placeholder="Owner name"
            value={ownerId}
            onChange={setOwnerId}
            allowDeselect
          />
          <Select
            searchable
            allowDeselect
            data={residents.map((o) => o.id.toString())}
            itemComponent={AutoCompleteItem}
            label="Resident"
            placeholder="Resident name"
            value={residentId}
            onChange={setResidentId}
          />{" "}
        </>
      )}
      <Group position="right" mt="md">
        <Button type="submit">
          {" "}
          {type === "edit" ? "Edit flat" : "Add flat"}
        </Button>
      </Group>
    </form>
  );
};
