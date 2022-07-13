import ModalComponent from "@/components/common/Modal";
import OwnersTable from "@/components/common/Owners";
import AddUserByRole from "@/components/add-edit/addUser";
import { Header, Button, Loader, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useModalStore } from "src/global/modal";

const Owners = () => {
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
          All Owners
        </Text>
        <Button onClick={setOpen}>Add Owner</Button>
      </Header>
      <OwnersTable />
      <ModalComponent open={open} setOpen={setOpen} message={`Add a new owner`}>
        <AddUserByRole role="owner" />
      </ModalComponent>
    </>
  );
};

export default Owners;
