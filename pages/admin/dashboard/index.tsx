import React from "react";
import { Card, Text, SimpleGrid, UnstyledButton, Drawer } from "@mantine/core";
import { adminMockData as mockdata } from "src/mocks/mockdata";
import { useStyles } from "./styles";
import NavbarMinimalColored from "@/components/layouts/sidebar/SideBar";
import { SideDrawer } from "@/components/layouts/sidebar/Drawer";
import LayOut from "@/components/layouts";
import Link from "next/link";

export default function ActionsGrid() {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <Link key={item.title} href={item.href}>
      <UnstyledButton key={item.title} className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size={60} />

        <Text size="lg" mt={20}>
          <a href={item.href}>{item.title}</a>
        </Text>
      </UnstyledButton>
    </Link>
  ));

  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <SimpleGrid
          cols={2}
          mt="sm"
          spacing="xl"
          breakpoints={[
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {items}
        </SimpleGrid>
      </Card>
    </>
  );
}
