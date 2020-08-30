import {Injectable} from "@angular/core";
import * as firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {AppUser, Farmer, FarmingAdvisor} from "../interfaces/user.type";
import {Observable} from "rxjs";
import {LogcatService} from "./logcat.service";


@Injectable({
  providedIn: "root"
})
export class ApiService {

  public static readonly FARMERS = "farmers";
  public static readonly USERS = "users";
  public static readonly FARMING_ADVISORS = "agricultural_advisors";
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

  /**
   * Returns a list of farming advisors for a given manager
   * @param managerId
   */
  public getFarmingAdvisors(managerId: string): Observable<FarmingAdvisor[]> {
    const path = ApiService.FARMING_ADVISORS;
    return this.db.collection<FarmingAdvisor>(path, ref => {
      return ref.where("managerId", "==", managerId);
    }).valueChanges();
  }

  /**
   * Returns a list of farmers for a given advisor
   * @param advisorId
   */
  public getFarmersCoachedBy(advisorId: string): Observable<Farmer[]> {
    const path = ApiService.FARMERS;
    return this.db.collection<Farmer>(path, ref => {
      return ref.where("advisorId", "==", advisorId);
    }).valueChanges();
  }

  /**
   * Returns a list of farmers for a given operation manager
   * @param advisorsId
   */
  public getFarmersCoachedByManagerTeam(advisorsId: string[]): Observable<Farmer[]> {
    const path = ApiService.FARMERS;
    return this.db.collection<Farmer>(path, ref => {
      return ref.where("advisorId", "in", advisorsId);
    }).valueChanges();
  }

}
