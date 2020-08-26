import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {en_US, NgZorroAntdModule, NZ_I18N} from "ng-zorro-antd";
import {registerLocaleData} from "@angular/common";
import en from "@angular/common/locales/en";

import {AppRoutingModule} from "./app-routing.module";
import {TemplateModule} from "./shared/template/template.module";
import {SharedModule} from "./shared/shared.module";

import {AppComponent} from "./app.component";
import {CommonLayoutComponent} from "./layouts/common-layout/common-layout.component";
import {FullLayoutComponent} from "./layouts/full-layout/full-layout.component";

import {NgChartjsModule} from "ng-chartjs";
import {ThemeConstantService} from "./shared/services/theme-constant.service";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthenticationModule} from "./authentication/authentication.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import * as firebase from "firebase";
import {environment} from "../environments/environment.prod";

registerLocaleData(en);
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    AppRoutingModule,
    TemplateModule,
    ReactiveFormsModule,
    AuthenticationModule,
    DashboardModule,
    SharedModule,
    NgChartjsModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    ThemeConstantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
