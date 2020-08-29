import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {AppService} from "../../shared/services/app.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public isButtonLoading = false;

  constructor(private appService: AppService,
              private authService: AuthenticationService,
              private  messageService: NzMessageService,
              private formBuilder: FormBuilder) {
  }

  /**
   * Submits the user input email and password for login.
   * Checks input validity before sending client request
   * */
  submitForm(): void {
    this.checkUserInput();
    const formData = this.loginForm.value;
    const email = formData.userEmail;
    const password = formData.password;

    // send client request to firebase server
    const promise: Promise<any> = this.authService.loginWithEmailAndPassword(email, password);
    this.startLoadingAnimation();
    // handle server response
    this.handleEmailSignInResult(promise);
  }

  ngOnInit(): void {
    this.initForm();
    // redirect to dashboard if user is authenticated
    if (this.authService.isAuthenticated) {
      const extra = {title: "Overview"};
      this.appService.navigateTo(AppService.ROUTE_TO_DASHBOARD, extra);
    }
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      userEmail: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  /**
   * Processes a response from the firebase server to a sign-in request
   * @param promise
   * @private
   */
  private handleEmailSignInResult(promise: Promise<any>) {
    promise.then(credentials => {
      this.stopLoadingAnimation();
      if (credentials) {
        const firebaseUser = credentials.user;
        this.appService.consoleLog("connected user", firebaseUser);
        this.appService.navigateTo(AppService.ROUTE_TO_DASHBOARD, {title: "Overview"});
      } else {
        this.appService.consoleLog("User not connected", "Unable to resolve");
      }
    }, error => {
      this.stopLoadingAnimation();
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // when sign-in fails due to invalid email or password
      if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
        this.messageService.error("Wrong email or password. Please try again.");
      } else {
        // when sign-in fails due to any other reason
        // Todo check for internet connexion
        // Todo report unknown error
        this.messageService.error("Something went wrong. Please try again.");
      }
      this.isButtonLoading = false;
      this.appService.consoleLog("Login failed", errorMessage);
      this.appService.consoleLog("Login failed, code", errorCode);
    });
  }


  /**
   * Animates sign-in button
   * @private
   */
  private startLoadingAnimation() {
    this.isButtonLoading = true;
  }

  /**
   * Stop  animation on sign-in button
   * @private
   */
  private stopLoadingAnimation() {
    this.isButtonLoading = false;
  }

  private checkUserInput() {
    for (const i in this.loginForm.controls) {
      if (i !== null) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
