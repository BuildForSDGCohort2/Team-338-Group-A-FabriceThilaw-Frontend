import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppUser, AppUserRoles, FarmingAdvisor} from "../../shared/interfaces/user.type";
import {AppService} from "../../shared/services/app.service";
import {ApiService} from "../../shared/services/api.service";
import {LogcatService} from "../../shared/services/logcat.service";
import {NzMessageService} from "ng-zorro-antd";

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

  collectNewAdvisorData(formData: any) {
    // create a new user object
    const newUser: AppUser = this.buildAppFarmAdvisorUserObject(formData);
    this.logcat.consoleLog("Build user", JSON.stringify(newUser));
    // create a new advisor object
    const newAdvisor: FarmingAdvisor = this.buildFarmingAdvisorObject(newUser);
    this.logcat.consoleLog("Built FarmAdvisor object", JSON.stringify(newAdvisor));
    // send data on server
    const ev = this.eventCloseNewAdvisorForm;
    const msg = this.messageService;
    this.apiService.saveNewFarmAdvisor(newUser, newAdvisor).then(function () {
      // when request is successful show a message
      // and trigger a close form event
      msg.success(newAdvisor.userFullName + " is registered.");
      ev.emit(true);
    });

  }

  checkUserInput() {
    for (const i in this.formGroup.controls) {
      if (i !== null) {
        this.formGroup.controls[i].markAsDirty();
        this.formGroup.controls[i].updateValueAndValidity();
      }
    }
    const formData: any = this.formGroup.value;
    this.logcat.consoleLog("Form data", JSON.stringify(formData));
    if (this.apiService.currentUserValue.title === AppUserRoles.OPERATION_MANAGER) {
      this.collectNewAdvisorData(formData);
    } else {
      this.messageService.error("You don't have the right to make this operation.");
    }

  }

  /**
   *
   * Builds a AppUser object from form's data
   * @param formData
   * @private
   */
  private buildAppFarmAdvisorUserObject(formData: any): AppUser {
    const newId = this.apiService.randomUUID;
    const creator: AppUser = this.apiService.currentUserValue;
    return {
      address: AppService.buildAddressObject(formData, newId, creator.id),
      createdBy: creator.id,
      createdOn: AppService.time,
      firstName: formData.firstName,
      fullName: AppService.getFullName(formData),
      id: newId,
      isDisabled: false,
      lastName: formData.lastName,
      modifiedBy: creator.id,
      modifiedOn: AppService.time,
      personalEmail: formData.personalEmail,
      photoUrl: "",
      title: AppUserRoles.AGRICULTURAL_ADVISOR
    };
  }


  /**
   * Builds a FarmingAdvisor object out of a user object with AGRICULTURAL_ADVISOR title.
   *
   * Returns null object if the connected user does not have enough rights to create
   * a Farming Advisor object
   * @param userWithAdvisorTitle - user object that has the title "AGRICULTURAL_ADVISOR
   * @private
   */
  private buildFarmingAdvisorObject(userWithAdvisorTitle: AppUser): FarmingAdvisor {
    let managerId: string = null;

    // Check if the currently connected user has the rights to make farming advisors
    if (this.apiService.currentUserValue.title === AppUserRoles.OPERATION_MANAGER
    ) {
      managerId = this.apiService.currentUserValue.id;
    } else {
      // Returns null if connected user is not an operation manager
      return null;
    }
    // create object if current creator has the rights for this
    // otherwise return null
    if (userWithAdvisorTitle.title === AppUserRoles.AGRICULTURAL_ADVISOR) {

      return {
        areaPerCoachedFarmer: null, supervisedAreaPerCrop: null,
        id: this.apiService.randomUUID,
        isDisabled: false,
        photoUrl: "",
        userId: userWithAdvisorTitle.id,
        managerId: managerId,
        userFullName: userWithAdvisorTitle.fullName,

        createdBy: this.apiService.currentUserValue.id,
        createdOn: AppService.time,
        modifiedBy: this.apiService.currentUserValue.id,
        modifiedOn: AppService.time
      };
    } else {
      return null;
    }
  }

}
