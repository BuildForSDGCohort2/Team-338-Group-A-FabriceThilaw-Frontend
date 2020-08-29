import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AppService {
  static ROUTE_TO_DASHBOARD = "piloting-module/overview";

  constructor(public router: Router) {
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

  /**
   * A simple function that helps to print easily readable output to console
   * @param title
   * @param body
   */
  public consoleLog(title: string, body: string) {
    console.log(title + ":");
    console.log(body);

  }

}
