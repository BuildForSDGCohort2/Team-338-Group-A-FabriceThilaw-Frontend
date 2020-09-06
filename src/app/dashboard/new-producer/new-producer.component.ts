import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../shared/services/api.service";
import {AppService} from "../../shared/services/app.service";
import {NzMessageService} from "ng-zorro-antd";
import {LogcatService} from "../../shared/services/logcat.service";
import {AppUser, AppUserRoles, Farmer} from "../../shared/interfaces/user.type";
import {FormDataWrapper} from "../FormDataWrapper";

@Component({
  selector: "app-add-new-producer",
  templateUrl: "./add-new-producer.component.html",
  styleUrls: ["./new-producer.component.css"]
})
export class NewProducerComponent implements OnInit {
  formGroup: FormGroup;
  // flags
  flagShowLoadingButton = false;
  @Output() eventCloseNewProduceurForm: EventEmitter<boolean> = new EventEmitter<boolean>();

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
      personalEmail: [null],
      telephone1: [null, [Validators.required]],
      telephone2: [null],
      // address
      addressLine: [null],
      // todo stateOrProvince: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null],
      county: [null],
    });
  }

  /**
   *
   * @param formData
   */
  convertFormDataIntoFarmerUser(formData: any): [AppUser, Farmer] {
    // create a new user object
    const newId = this.apiService.randomUUID;
    const creator: AppUser = this.apiService.currentUserValue;
    const photoUrl = ""; // todo make function to get picture url
    const newUser: AppUser = FormDataWrapper.generateUserObject(formData, newId, creator.id, photoUrl, AppUserRoles.FARMER);
    this.logcat.consoleLog("Build user", JSON.stringify(newUser));
    // create a new farmer object
    const newFarmer: Farmer = this.getNewFarmer(newUser);
    this.logcat.consoleLog("Built Farmer object", JSON.stringify(newFarmer));
    return [newUser, newFarmer];
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
      const dataMap: [AppUser, Farmer] = this.convertFormDataIntoFarmerUser(formData);
      if (dataMap[0] !== null && dataMap[1] !== null && dataMap.length > 0) {
        // send data on server
        this.flagShowLoadingButton = true;
        this.apiService.sendSaveRequestForNewFarmerData(dataMap[0], dataMap[1]).then((_) => {
          // When operation completes
          this.flagShowLoadingButton = false;
          this.closeNewFarmForm();
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
   * @private
   * @param userWithFarmerTitle
   */
  private getNewFarmer(userWithFarmerTitle: AppUser): Farmer {
    let managerId: string = null;

    // Check if the currently connected user has the rights to make farmers
    if (this.apiService.currentUserValue.title === AppUserRoles.ROLE_OPERATION_MANAGER
    ) {
      managerId = this.apiService.currentUserValue.id;
    } else {
      // Returns null if connected user is not an operation manager
      return null;
    }
    // create object if current creator has the rights for this
    // otherwise return null
    if (userWithFarmerTitle.title === AppUserRoles.FARMER) {
      const uuid = this.apiService.randomUUID;
      const creatorId = this.apiService.currentUserValue.id;

      return FormDataWrapper.generateFarmerObject(userWithFarmerTitle
        , managerId, uuid, creatorId);
    } else {
      return null;
    }
  }


  private closeNewFarmForm() {
    this.eventCloseNewProduceurForm.emit(true);
  }
}
