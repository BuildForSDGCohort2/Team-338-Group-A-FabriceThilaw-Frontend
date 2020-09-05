import {SideNavInterface} from "../../interfaces/side-nav.type";

export const ROUTES: SideNavInterface[] = [
  {
    path: "/management/overview",
    title: "Overview",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "dashboard",
    submenu: []
  },
  {
    path: "/management/advisors",
    title: "Plot Supervisors",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "appstore",
    submenu: []
  },
  {
    path: "/management/producers",
    title: "Producers",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "appstore",
    submenu: []
  },
  {
    path: "/management/inputs",
    title: "Agricultural Inputs",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "appstore",
    submenu: []
  },
  {
    path: "/management/statistics",
    title: "Cost Statistics",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "appstore",
    submenu: []
  }
];
