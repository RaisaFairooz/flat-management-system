import React, { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
} from "@mantine/core";
import { Login, Logout, SwitchHorizontal } from "tabler-icons-react";

import { sidebarMockData as mockdata } from "src/mocks/mockdata";
import { useStyles } from "./styles";
import { NavbarLinkProps } from "src/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserStore } from "src/global/user";

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  href,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Link href={href} passHref>
      <Tooltip label={label} position="right" withArrow transitionDuration={0}>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <Icon />
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
}

const useNavbarStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

export default function NavbarMinimalColored({ children }: any) {
  const router = useRouter();
  const { classes } = useNavbarStyles();
  const user = useUserStore((state) => state.user);
  const setData = useUserStore((state) => state.setData);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={router.pathname === link.href}
      href={link.href}
    />
  ));

  return (
    <Navbar height={780} width={{ base: 80 }} p="md" className={classes.navbar}>
      <Center>A</Center>
      <Navbar.Section grow mt={50}>
        <Group direction="column" align="center" spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction="column" align="center" spacing={0}>
          {user?.role!==""? <NavbarLink
            icon={Logout}
            label="Logout"
            href="/signin"
            onClick={() => {
              setData({

                  role:"",
                  id:"",
                  phone_number:""
                }
              )
            }}
          />:<NavbarLink
          icon={Login}
          label="Login"
          href="/signin"
          onClick={() => console.log("clicked")}
        />}
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}
