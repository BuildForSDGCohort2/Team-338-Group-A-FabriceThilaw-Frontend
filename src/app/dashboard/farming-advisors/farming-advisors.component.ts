import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppUser, FarmingAdvisor} from "../../shared/interfaces/user.type";
import {ApiService} from "../../shared/services/api.service";

@Component({
  selector: "app-farming-advisors",
  templateUrl: "./farming-advisors.component.html",
  styleUrls: ["./farming-advisors.component.css"]
})
export class FarmingAdvisorsComponent implements OnInit {
  view = "cardView";

  formGroup: FormGroup;
  allFarmingAdvisor: FarmingAdvisor[] = [];

  // flags
  flagShowAdvisorListLoader = true;
  flagShowAdvisorList = true;
  flagShowAdvisorListEmpty = false;
  flagShowNewAdvisorForm = false;

  constructor(private formBuilder: FormBuilder, private  apiService: ApiService) {
  }

  ngOnInit() {
    this.initForm();
    const currentUser = this.apiService.currentUserValue;
    this.getAllAdvisors(currentUser);
  }

  /**
   *
   * @param $event
   */
  listenToCloseNewAdvisorForm($event: boolean) {
    // raise the flag
    this.flagShowNewAdvisorForm = false;
    this.flagShowAdvisorList = true;
  }

  /**
   *
   */
  initForm() {
    this.formGroup = this.formBuilder.group({
      // identity
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      photoUrl: [null, [Validators.required]],
      // contact
      personalEmail: [null, [Validators.required]],
      telephone1: [null, [Validators.required]],
      telephone2: [null, [Validators.required]],
      // address
      addressLine: [null, [Validators.required]],
      stateOrProvince: [null, [Validators.required]],
      city: [null, [Validators.required]],
      county: [null, [Validators.required]],
    });
  }

  /**
   *
   */
  onAddNewFarmingAdvisor() {
    this.flagShowNewAdvisorForm = true;
  }

  /**
   *
   * @param photoUrl
   */
  getAdvisorPicture(photoUrl: string) {
    if (photoUrl === null || photoUrl.trim().length === 0) {
      return "assets/images/avatars/thumb_farming_specialist.jpg";
    } else {
      return photoUrl;
    }
  }

  /**
   *
   * @private
   * @param manager
   */
  private getAllAdvisors(manager: AppUser) {
    this.flagShowAdvisorListLoader = true;
    this.flagShowNewAdvisorForm = false;

    if (manager !== null) {

      this.apiService.getFarmingAdvisors(manager.id).subscribe(
        (data) => {

          // rise a flag because data is loading
          this.flagShowAdvisorListLoader = false;

          // rise a flag to hide advisor forms
          this.flagShowNewAdvisorForm = false;

          // check the data that is found
          if (data !== null) {
            this.allFarmingAdvisor = data;
            this.flagShowAdvisorListEmpty = (data.length === 0);
          }
        }
      );
    }
  }
}
