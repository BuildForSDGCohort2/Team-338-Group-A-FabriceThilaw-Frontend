import {SideNavInterface} from "../../interfaces/side-nav.type";

export const ROUTES: SideNavInterface[] = [
  {
    path: "overview",
    title: "Overview",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "dashboard",
    submenu: []
  },
  {
    path: "advisors",
    title: "Plot Supervisors",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "appstore",
    submenu: []
  },
  {
    path: "farmers",
    title: "Farmers",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "appstore",
    submenu: []
  },
  {
    path: "inputs",
    title: "Agricultural Inputs",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "appstore",
    submenu: []
  },
  {
    path: "statistics",
    title: "Cost Statistics",
    iconType: "nzIcon",
    iconTheme: "outline",
    icon: "appstore",
    submenu: []
  }
];
