import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {DefaultDashboardComponent} from "./default/default-dashboard.component";
import {AuthGuard} from "../shared/guard/auth.guard";
import {UserResolver} from "../shared/resolvers/user.resolver";
import {FarmingAdvisorsListComponent} from "./farming-advisors-list/farming-advisors-list.component";

const routes: Routes = [

  {
    path: "overview",
    component: DefaultDashboardComponent,
    resolve: {data: UserResolver},
    data: { // for breadcrumbs
      title: "",
      headerDisplay: "none"
    },
    canActivate: [AuthGuard]
  },
  {
    path: "advisors",
    component: FarmingAdvisorsListComponent,
    resolve: {data: UserResolver},
    canActivate: [AuthGuard]
  }
  /*{
    path: 'with-breadcrumb',
    component: WithBreadcrumbDashboardComponent,
    data: {
      title: 'With Breadcrumb '
    }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
