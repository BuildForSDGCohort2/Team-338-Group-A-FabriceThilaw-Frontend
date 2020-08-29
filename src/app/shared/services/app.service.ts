import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LogcatService} from "./logcat.service";

@Injectable({
  providedIn: "root"
})
export class AppService {
  static ROUTE_TO_DASHBOARD = "piloting-module/overview";

  constructor(public router: Router, private logcat: LogcatService) {
  }

  /**
   * Helps for navigation routing
   * @param route navigation target
   */
  navigateTo(route: string, breadCrumbData: any) {
    // redirect user to dashboard
    this.router.navigate([route], breadCrumbData)
      .then(_ => {
      });
  }


}
