import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";

const ModalComponent = ({ open, setOpen, message = "", children }: any) => {
  const theme = useMantineTheme();
  return (
    <Modal
      opened={open}
      onClose={setOpen}
      title={message}
      centered
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
