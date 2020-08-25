import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DefaultDashboardComponent} from './default/default-dashboard.component';
import {WithBreadcrumbDashboardComponent} from './with-breadcrumb/with-breadcrumb-dashboard.component';
import {AuthGuard} from '../shared/guard/auth.guard';
import {UserResolver} from '../shared/resolvers/user.resolver';

const routes: Routes = [

  {
    path: 'dashboard',
    component: DefaultDashboardComponent,
    resolve: {data: UserResolver},
    canActivate: [AuthGuard]
  },
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
