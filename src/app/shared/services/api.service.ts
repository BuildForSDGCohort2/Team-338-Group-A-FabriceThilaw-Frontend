import {Injectable} from "@angular/core";
import * as firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {AppUser} from "../interfaces/user.type";
import {Observable} from "rxjs";
import {LogcatService} from "./logcat.service";


@Injectable({
  providedIn: "root"
})
export class ApiService {

  public static readonly FARMERS = "farmers";
  public static readonly USERS = "users";
  public static readonly FARM_MONITORS = "agricultural_advisors";
  public static readonly FARMS = "farms";
  public static readonly FARM_INPUTS = "farm_inputs";
  public static readonly CULTURES = "cultures";
  public static readonly INPUT_SUPPLIERS = "input_suppliers";
  auth: any;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private logcat: LogcatService) {

  }

  /**
   * Make a request to get the app user that matches to the current firebase.User
   * @param authCredentials
   */
  public getCurrentUser(authCredentials: firebase.User): Observable<AppUser | any> {
    const path = ApiService.USERS + "/" + authCredentials.uid;
    this.logcat.consoleLog("path to get current user", path);
    return this.db.doc<AppUser>(path).valueChanges();
  }
}
