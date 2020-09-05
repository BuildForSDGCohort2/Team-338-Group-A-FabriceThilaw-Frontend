import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppUser, AppUserRoles, FarmingAdvisor} from "../../shared/interfaces/user.type";
import {AppService} from "../../shared/services/app.service";
import {ApiService} from "../../shared/services/api.service";
import {LogcatService} from "../../shared/services/logcat.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormDataWrapper} from "../FormDataWrapper";

@Component({
  selector: "app-new-farming-advisor",
  templateUrl: "./new-farming-advisor.component.html",
  styleUrls: ["./new-farming-advisor.component.css"]
})
export class NewFarmingAdvisorComponent implements OnInit {

  formGroup: FormGroup;
  // flags
  flagShowLoadingButton = false;
  @Output() eventCloseNewAdvisorForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private appService: AppService,
              private messageService: NzMessageService,
              private logcat: LogcatService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      // identity
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      // todo photoUrl: [null, [Validators.required]],
      // contact
      personalEmail: [null, [Validators.required]],
      telephone1: [null, [Validators.required]],
      telephone2: [null],
      // address
      addressLine: [null, [Validators.required]],
      // todo stateOrProvince: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      county: [null],
    });
  }

  closeNewAdvisorForm() {
    this.eventCloseNewAdvisorForm.emit(true);
  }

  /**
   *
   * @param formData
   */
  convertFormDataIntoFarmingAdvisorUser(formData: any): [AppUser, FarmingAdvisor] {
    // create a new user object
    const newId = this.apiService.randomUUID;
    const creator: AppUser = this.apiService.currentUserValue;
    const photoUrl = ""; // todo make function to get picture url
    const newUser: AppUser = FormDataWrapper.generateUserObject(formData, newId, creator.id, photoUrl);
    this.logcat.consoleLog("Build user", JSON.stringify(newUser));
    // create a new advisor object
    const newAdvisor: FarmingAdvisor = this.getNewFarmingAdvisor(newUser);
    this.logcat.consoleLog("Built FarmAdvisor object", JSON.stringify(newAdvisor));
    return [newUser, newAdvisor];
  }


  /**
   *
   */
  checkUserInput() {
    for (const i in this.formGroup.controls) {
      if (i !== null) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    }
    const formData: any = this.formGroup.value;
    this.logcat.consoleLog("Form data", JSON.stringify(formData));
    // Check if current user has the rights to operate
    if (this.apiService.currentUserValue.title === AppUserRoles.ROLE_OPERATION_MANAGER) {
      const dataMap: [AppUser, FarmingAdvisor] = this.convertFormDataIntoFarmingAdvisorUser(formData);
      if (dataMap[0] !== null && dataMap[1] !== null && dataMap.length > 0) {
        // send data on server
        this.flagShowLoadingButton = true;
        this.apiService.sendSaveRequestForNewAdvisorData(dataMap[0], dataMap[1]).then((_) => {
          // When operation completes
          this.flagShowLoadingButton = false;
          this.closeNewAdvisorForm();
        });
      }
    } else {
      this.messageService.error("You don't have the right to make this operation.");
    }

  }


  /**
   * Builds a FarmingAdvisor object out of a user object with AGRICULTURAL_ADVISOR title.
   *
   * Returns null object if the connected user does not have enough rights to create
   * a Farming Advisor object
   * @param userWithAdvisorTitle - user object that has the title "AGRICULTURAL_ADVISOR
   * @private
   */
  private getNewFarmingAdvisor(userWithAdvisorTitle: AppUser): FarmingAdvisor {
    let managerId: string = null;

    // Check if the currently connected user has the rights to make farming advisors
    if (this.apiService.currentUserValue.title === AppUserRoles.ROLE_OPERATION_MANAGER
    ) {
      managerId = this.apiService.currentUserValue.id;
    } else {
      // Returns null if connected user is not an operation manager
      return null;
    }
    // create object if current creator has the rights for this
    // otherwise return null
    if (userWithAdvisorTitle.title === AppUserRoles.ROLE_AGRICULTURAL_ADVISOR) {
      const uuid = this.apiService.randomUUID;
      const creatorId = this.apiService.currentUserValue.id;

      return FormDataWrapper.generateFarmingAdvisorObject(userWithAdvisorTitle
        , managerId, uuid, creatorId);
    } else {
      return null;
    }
  }

}
