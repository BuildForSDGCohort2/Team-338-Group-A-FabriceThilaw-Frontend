import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import * as firebase from "firebase";
import {AppUser} from "../interfaces/user.type";
import {AngularFireAuth} from "@angular/fire/auth";
import {ApiService} from "./api.service";
import {switchMap} from "rxjs/operators";
import {LogcatService} from "./logcat.service";

const USER_AUTH_API_URL = "/api-url";

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AppUser>;

  private authState: firebase.User;

  constructor(private http: HttpClient, private api: ApiService,
              private firebaseAuth: AngularFireAuth,
              private logcat: LogcatService
  ) {
    // initialize user value  provider
    this.currentUserSubject = new BehaviorSubject(null);
    // Make a request to get the current & valid user
    const currentUserObservable = this.observeAuthenticatedCurrentUser();
    currentUserObservable.subscribe(result => {
      this.currentUserSubject.next(result);
    });
  }

  public get currentUserValue(): AppUser {
    return this.currentUserSubject.value;
  }


  /*get isAuthenticated(): boolean {
    return this.authState !== null;
  }*/

  public loginWithEmailAndPassword(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  public logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  /**
   * Make a request to get the currently authenticated user,
   * that also has a title (a.k.a role) on the platform
   * @private
   */
  private observeAuthenticatedCurrentUser(): Observable<any> {
    return this.firebaseAuth.authState
      .pipe(switchMap(authCredential => {
        //
        this.authState = authCredential;
        if (authCredential !== null) {
          return this.api.getCurrentUser(authCredential);
        }
      }));
  }
}
