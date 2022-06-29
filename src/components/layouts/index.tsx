import { AppShell, Navbar, Header } from "@mantine/core";
import NavbarMinimalColored from "./sidebar/SideBar";

export default function LayOut({ children }: any) {
  return (
    <AppShell
      navbar={<NavbarMinimalColored />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
