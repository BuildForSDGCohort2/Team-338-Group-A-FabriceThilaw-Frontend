import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LogcatService {

  constructor() {
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
