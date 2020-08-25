import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class UserResolver implements Resolve<any> {

  /*public userService: UserService,*/
  constructor(private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return undefined;
  }

  /*resolve(route: ActivatedRouteSnapshot): Promise<ItajaUser> {

    const user = new ItajaUser();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentFirebaseUser()
        .then(res => {
          if (res.providerData[0].providerId == 'password') {
            user.photoURL = 'https://via.placeholder.com/150x150';
            user.displayName = res.displayName;
            user.provider = res.providerData[0].providerId;
            user.uid = localStorage.getItem('uid');
            return resolve(user);
          } else {
            user.photoURL = res.photoURL;
            user.displayName = res.displayName;
            user.provider = res.providerData[0].providerId;
            return resolve(user);
          }
        }, err => {
          this.router.navigate(['/login']);
          return reject(err);
        });
    });
  }*/
}
