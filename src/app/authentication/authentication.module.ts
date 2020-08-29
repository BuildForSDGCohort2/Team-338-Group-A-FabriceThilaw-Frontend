import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {LoginComponent} from "./login/login.component";
import {AuthenticationService} from "../shared/services/authentication.service";
import {UserResolver} from "../shared/resolvers/user.resolver";
import {AngularFireAnalyticsModule} from "@angular/fire/analytics";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {environment} from "../../environments/environment.prod";
import {AngularFireModule} from "@angular/fire";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule, // dynamically imports firebase/analytics
    AngularFirestoreModule,     // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,      // imports firebase/auth, only needed for auth features,
  ],
  providers: [
    AuthenticationService, UserResolver
  ],
  declarations: [LoginComponent]
})

export class AuthenticationModule {
}
