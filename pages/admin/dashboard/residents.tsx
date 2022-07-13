import ModalComponent from "@/components/common/Modal";
import ResidentsTable from "@/components/common/Residents";
import AddUserByRole from "@/components/add-edit/addUser";
import { Header, Button, Loader, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useModalStore } from "src/global/modal";

const Residents = () => {
  const open = useModalStore((state) => state.open);
  const setOpen = useModalStore((state) => state.setOpen);
  return (
    <>
      <Header height={60} mb={30} className="flex">
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          size="xl"
          weight={700}
        >
          All Residents
        </Text>

        <Button onClick={setOpen}>Add Resident</Button>
      </Header>
      <ResidentsTable />
      <ModalComponent
        open={open}
        setOpen={setOpen}
        message={`Add a new resident`}
      >
        <AddUserByRole role="resident" />
      </ModalComponent>
    </>
  );
};

export default Residents;
