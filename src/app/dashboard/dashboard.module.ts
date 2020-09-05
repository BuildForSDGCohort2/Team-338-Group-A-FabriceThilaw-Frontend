import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ThemeConstantService} from "../shared/services/theme-constant.service";

import {DefaultDashboardComponent} from "./default/default-dashboard.component";
import {WithBreadcrumbDashboardComponent} from "./with-breadcrumb/with-breadcrumb-dashboard.component";
import {FarmingAdvisorsListComponent} from "./farming-advisors-list/farming-advisors-list.component";
import {NewFarmingAdvisorComponent} from "./new-farming-advisor/new-farming-advisor.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProducersListComponent} from "./producers-list/producers-list.component";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    DefaultDashboardComponent,
    WithBreadcrumbDashboardComponent,
    FarmingAdvisorsListComponent,
    NewFarmingAdvisorComponent,
    ProducersListComponent,
  ],
  providers: [
    ThemeConstantService
  ],
})
export class DashboardModule {
}
