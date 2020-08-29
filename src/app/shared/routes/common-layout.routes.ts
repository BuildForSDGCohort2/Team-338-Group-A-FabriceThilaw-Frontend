import {Routes} from "@angular/router";

export const CommonLayout_ROUTES: Routes = [
  {
    path: "piloting-module",
    loadChildren: () => import("../../dashboard/dashboard.module").then(m => m.DashboardModule)
  }
];
