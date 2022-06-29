import React, { useState } from "react";
import { Drawer, Button, Group } from "@mantine/core";
import create from "zustand";

interface DrawerType {
  opened: boolean;
  setOpened: any;
}

export const useStore = create<DrawerType>((set) => ({
  opened: true,
  setOpened: () => set((state) => ({ opened: !state.opened })),
}));

export const SideDrawer = ({ children }: any) => {
  const opened = useStore((state) => state.opened);
  const setOpened = useStore((state) => state.setOpened);

  return (
    <Drawer
      opened={opened}
      onClose={setOpened}
      title="Register"
      padding="xl"
      size="lg"
      withOverlay={false}
    >
      {children}
    </Drawer>
  );
};

export default SideDrawer;
