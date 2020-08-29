import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import * as firebase from "firebase";
import {AppUser} from "../interfaces/user.type";
import {AngularFireAuth} from "@angular/fire/auth";

const USER_AUTH_API_URL = "/api-url";

@Injectable()
export class AuthenticationService {
  public currentUser: Observable<AppUser>;
  private currentUserSubject: BehaviorSubject<AppUser>;

  private authState: firebase.User;

  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe(authState => {
      this.authState = authState;
    });

    this.currentUserSubject = new BehaviorSubject<AppUser>(JSON.parse(localStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AppUser {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
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

  public logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
