import ModalComponent from "@/components/common/Modal";
import Owners from "@/components/common/Owners";
import AddUserByRole from "@/components/add-edit/addUser";
import useFormData from "@/hooks/useForm";
import { Header, Button, Text } from "@mantine/core";
import React, { useState } from "react";
import { useModalStore } from "src/global/modal";

const Staffs = () => {
  const opened = useModalStore((state) => state.open);
  const setOpened = useModalStore((state) => state.setOpen);
  return (
    <div>
      <Header height={60} mb={30} className="flex">
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          size="xl"
          weight={700}
        >
          Staffs
        </Text>
        <Button onClick={() => setOpened(true)}>Add Staffs</Button>
      </Header>
      <Owners type="staffs" />
      <ModalComponent
        open={opened}
        setOpen={setOpened}
        message={`Add a new staff`}
      >
        <AddUserByRole role="staff" />
      </ModalComponent>
    </div>
  );
};

export default Staffs;
