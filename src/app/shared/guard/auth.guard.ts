import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AppService} from "../services/app.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.requestForAValidUser();
    this.authService.currentUser$.subscribe(user => {
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
