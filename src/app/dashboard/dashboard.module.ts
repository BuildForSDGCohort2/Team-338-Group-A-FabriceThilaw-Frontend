import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ThemeConstantService} from "../shared/services/theme-constant.service";

import {DefaultDashboardComponent} from "./default/default-dashboard.component";
import {WithBreadcrumbDashboardComponent} from "./with-breadcrumb/with-breadcrumb-dashboard.component";
import {FarmingAdvisorsComponent} from "./farming-advisors/farming-advisors.component";
import {NewFarmingAdvisorComponent} from "./new-farming-advisor/new-farming-advisor.component";
import {ReactiveFormsModule} from "@angular/forms";


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
    FarmingAdvisorsComponent,
    NewFarmingAdvisorComponent
  ],
  providers: [
    ThemeConstantService
  ],
})
export class DashboardModule {
}
