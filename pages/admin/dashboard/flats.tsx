import ModalComponent from "@/components/common/Modal";
import {
  Button,
  Group,
  Header,
  Modal,
  NumberInput,
  Select,
  SelectItemProps,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import React, { forwardRef, useState } from "react";
import create from "zustand";

interface DrawerType {
  opened: boolean;
  name: string;
  noOfRooms: number;
  description: string;
  ownerId: string | any;
  residentId: string | any;
  setOpened: any;
  setName: any;
  setNoOfRoomse: any;
  setDescription: any;
  setOwnerId: any;
  setResidentId: any;
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
  setNoOfRoomse: (val: number) => set((state) => ({ noOfRooms: val })),
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
  const theme = useMantineTheme();
  const opened = useStore((state) => state.opened);
  const setOpened = useStore((state) => state.setOpened);
  const name = useStore((state) => state.name);
  const setName = useStore((state) => state.setName);
  const noOfRooms = useStore((state) => state.noOfRooms);
  const setNoOfRooms = useStore((state) => state.setNoOfRoomse);
  const description = useStore((state) => state.description);
  const setDescription = useStore((state) => state.setDescription);
  const ownerId = useStore((state) => state.ownerId);
  const setOwnerId = useStore((state) => state.setOwnerId);
  const residentId = useStore((state) => state.residentId);
  const setResidentId = useStore((state) => state.setResidentId);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ ownerId });
  };

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

      <ModalComponent open={opened} setOpen={setOpened}>
        <form onSubmit={handleSubmit}>
          <TextInput
            required
            label="name"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <NumberInput
            required
            label="No of rooms"
            placeholder="No of rooms"
            value={noOfRooms}
            onChange={setNoOfRooms}
          />
          <Textarea
            placeholder="Description"
            label="Description"
            required
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <Select
            searchable
            data={[
              { label: "React", value: "1" },
              { label: "Angular", value: "2" },
              { label: "Svelte", value: "3" },
              { label: "Vue", value: "4" },
            ]}
            itemComponent={AutoCompleteItem}
            label="Owner"
            placeholder="Owner name"
            value={ownerId}
            onChange={setOwnerId}
            required
            allowDeselect
          />
          <Select
            searchable
            allowDeselect
            data={[
              { label: "React", value: "1" },
              { label: "Angular", value: "2" },
              { label: "Svelte", value: "3" },
              { label: "Vue", value: "4" },
            ]}
            itemComponent={AutoCompleteItem}
            label="Resident"
            placeholder="Resident name"
            value={residentId}
            onChange={setResidentId}
            required
          />
          <Group position="right" mt="md">
            <Button type="submit">Add Flat</Button>
          </Group>
        </form>
      </ModalComponent>
    </>
  );
};

export default Flats;
