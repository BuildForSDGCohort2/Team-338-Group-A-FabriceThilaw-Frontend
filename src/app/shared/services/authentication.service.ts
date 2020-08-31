import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import * as firebase from "firebase";
import {AppUser} from "../interfaces/user.type";
import {AngularFireAuth} from "@angular/fire/auth";
import {ApiService} from "./api.service";
import {switchMap} from "rxjs/operators";
import {LogcatService} from "./logcat.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService implements OnInit {
  private currentUserSubject: BehaviorSubject<AppUser>;

  private authState: firebase.User;

  constructor(private http: HttpClient, private api: ApiService,
              private firebaseAuth: AngularFireAuth, public router: Router,
              private logcat: LogcatService
  ) {
    // initialize user value  provider
    this.currentUserSubject = new BehaviorSubject(null);

  }

  public get currentUser$(): Observable<any> {
    return this.observeAuthenticatedCurrentUser();
  }

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


  /*get isAuthenticated(): boolean {
    return this.authState !== null;
  }*/


  public logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  public requestForAValidUser(): Observable<any> {
    // Make a request to get the current & valid user
    return this.observeAuthenticatedCurrentUser();
  }

  ngOnInit(): void {
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
        this.logcat.consoleLog("user", JSON.stringify(authCredential));
        this.authState = authCredential;
        if (authCredential !== null) {
          return this.api.getCurrentUser$(authCredential);
        } else {
          return of(null);
        }
      }));
  }
}
