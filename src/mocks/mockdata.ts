import {
  CreditCard,
  BuildingBank,
  Repeat,
  ReceiptRefund,
  Receipt,
  ReceiptTax,
  Report,
  CashBanknote,
  Coin,
  Home2,
  Gauge,
  DeviceDesktopAnalytics,
  Fingerprint,
  CalendarStats,
  User,
  Settings,
  Home,
  Man,
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
    title: "Notices",
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
    title: "Complaints",
    icon: Report,
    color: "pink",
    href: "/admin/dashboard/complaints",
  },
  {
    title: "Owners and Residents",
    icon: Coin,
    color: "red",
    href: "/admin/dashboard/owners&residents",
  },
  // { title: "Cashback", icon: CashBanknote, color: "orange" },
];

export const sidebarMockData = [
  { icon: Home2, label: "Home", href: "/admin" },
  { icon: Gauge, label: "Dashboard", href: "/admin/dashboard" },
  { icon: User, label: "Account", href: "/admin/account" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];
