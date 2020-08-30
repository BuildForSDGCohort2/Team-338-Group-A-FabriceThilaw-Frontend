import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AppService} from "../services/app.service";
import {LogcatService} from "../services/logcat.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthenticationService, private  logcat: LogcatService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.requestForAValidUser();
    this.authService.currentUserValue.subscribe(user => {
      if (user !== null) {
        return true;
      } else {
        AppService.navigateTo(AppService.ROUTE_TO_LOGIN, this.authService.router, {});
        return false;
      }
    });
    return true;
  }

}
