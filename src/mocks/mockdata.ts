import {
  ReceiptRefund,
  Receipt,
  Report,
  Coin,
  Home2,
  Gauge,
  User,
  Settings,
  Home,
  Man,
  PlaylistAdd,
  Login,
  Logout,
} from "tabler-icons-react";
export const adminMockData = [
  // { title: "Credit cards", icon: CreditCard, color: "violet" },
  {
    title: "Flats",
    icon: Home,
    color: "indigo",
    href: "/admin/dashboard/flats",
  },
  // { title: "Transfers", icon: Repeat, color: "blue" },
  {
    title: "Utilities",
    icon: ReceiptRefund,
    color: "green",
    href: "/admin/dashboard/utilities",
  },
  {
    title: "Notices & Complaints",
    icon: Receipt,
    color: "teal",
    href: "/admin/dashboard/notices",
  },
  {
    title: "Staffs",
    icon: Man,
    color: "cyan",
    href: "/admin/dashboard/staffs",
  },
  {
    title: "Residents",
    icon: Man,
    color: "pink",
    href: "/admin/dashboard/residents",
  },
  {
    title: "Owners",
    icon: Coin,
    color: "red",
    href: "/admin/dashboard/owners",
  },
  // { title: "Cashback", icon: CashBanknote, color: "orange" },
];

export const sidebarMockData = [
  { icon: Home2, label: "Home", href: "/admin" },
  { icon: Gauge, label: "Dashboard", href: "/admin/dashboard" },
  { icon: User, label: "Account", href: "/admin/account" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: Settings, label: "Search", href: "/admin/dashboard/search" },
];

export const roles = ["Editor", "Owner", "Resident", "Staff"];

export const department = ["cleaning", "guard"];
