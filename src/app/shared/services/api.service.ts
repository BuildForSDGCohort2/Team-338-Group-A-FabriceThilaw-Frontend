import {Injectable} from "@angular/core";
import * as firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {AppUser, Farmer, FarmingAdvisor} from "../interfaces/user.type";
import {Observable, of} from "rxjs";
import {LogcatService} from "./logcat.service";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  public static readonly FARMERS = "farmers";
  public static readonly USERS = "users";
  public static readonly FARMING_ADVISORS = "farming_advisors";
  public static readonly FARMS = "farms";
  public static readonly FARM_INPUTS = "farm_inputs";
  public static readonly CULTURES = "crops";
  public static readonly INPUT_SUPPLIERS = "input_suppliers";
  auth: any;
  private currentAppUser: AppUser;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private logcat: LogcatService) {

  }

  get randomUUID(): string {
    return this.db.createId();
  }

  public get currentUserValue(): AppUser {
    return this.currentAppUser;
  }

  /**
   * Registers a new farming advisor
   * @param newUser - the user object to register
   * @param farmAdvisorRoleObject the details of the user role
   */
  saveNewFarmAdvisor(newUser: AppUser, farmAdvisorRoleObject: FarmingAdvisor): Promise<void> {
    // Going to perform multiple writes as a single atomic operation.
    const bulkWriter = this.db.firestore.batch();

    if (newUser.id === farmAdvisorRoleObject.userId
      && newUser.title === ApiService.FARMING_ADVISORS) {

      // Set the value of the new AppUser
      const userRef = this.db.firestore.collection(ApiService.USERS).doc(newUser.id);
      bulkWriter.set(userRef, {...newUser});

      // Set the value of the farming advisor role object
      const farmAdvisorRef = this.db.firestore.collection(ApiService.FARMING_ADVISORS).doc(farmAdvisorRoleObject.id);
      bulkWriter.update(farmAdvisorRef, {...farmAdvisorRoleObject});

      // Commit the bulk
      return bulkWriter.commit();
    }
  }

  /**
   * Make a request to get the app user that matches to the current firebase.User
   * @param authCredentials
   */
  public getCurrentUser$(authCredentials: firebase.User): Observable<AppUser | any> {
    const path = ApiService.USERS + "/" + authCredentials.uid;
    this.logcat.consoleLog("path to get current user", path);
    return this.db.doc<AppUser>(path).valueChanges().pipe(switchMap(data => {
      this.currentAppUser = data;
      return of(data);
    }));
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
