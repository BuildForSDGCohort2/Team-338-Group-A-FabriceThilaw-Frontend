import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from '../shared/services/authentication.service';
import {UserResolver} from '../shared/resolvers/user.resolver';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ],
  providers: [
    AuthenticationService, UserResolver
  ],
  declarations: [LoginComponent]
})

export class AuthenticationModule {
}
