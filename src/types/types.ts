import {
  Icon as TablerIcon,
  Logout,
  SwitchHorizontal,
} from "tabler-icons-react";
export interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
  href: string;
}
