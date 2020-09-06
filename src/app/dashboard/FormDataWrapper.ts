import {Address} from "../shared/interfaces/address.type";
import {AppService} from "../shared/services/app.service";
import {AppUser, AppUserRoles, Farmer, FarmingAdvisor} from "../shared/interfaces/user.type";

export class FormDataWrapper {
  constructor() {
  }

  /**
   *
   * @param userWithFarmerTitle
   * @param manager
   * @param uuid
   * @param creatorId
   */
  static generateFarmerObject(userWithFarmerTitle: AppUser, manager: string,
                              uuid: string, creatorId: string): Farmer {
    return {
      addressLine: null,
      advisorFullName: null,
      advisorId: null, areaPerCrop: null,
      id: uuid,
      userId: userWithFarmerTitle.id,
      photoUrl: userWithFarmerTitle.photoUrl,
      userFullName: userWithFarmerTitle.fullName,
      isDisabled: false,
      managerId: manager,
      telephone1: userWithFarmerTitle.address.telephone1,
      telephone2: userWithFarmerTitle.address.telephone2,
      createdBy: creatorId,
      createdOn: AppService.time,
      modifiedBy: creatorId,
      modifiedOn: AppService.time
    };
  }


  /**
   *
   * @param userWithAdvisorTitle
   * @param manager
   * @param uuid
   * @param creatorId
   */
  static generateFarmingAdvisorObject(userWithAdvisorTitle: AppUser, manager: string,
                                      uuid: string, creatorId: string): FarmingAdvisor {
    return {
      areaPerCoachedFarmer: null, supervisedAreaPerCrop: null,
      id: uuid,
      userId: userWithAdvisorTitle.id,
      photoUrl: userWithAdvisorTitle.photoUrl,
      userFullName: userWithAdvisorTitle.fullName,
      isDisabled: false,
      managerId: manager,
      farmersCount: 0,
      email: userWithAdvisorTitle.personalEmail,
      telephone1: userWithAdvisorTitle.address.telephone1,
      telephone2: userWithAdvisorTitle.address.telephone2,
      createdBy: creatorId,
      createdOn: AppService.time,
      modifiedBy: creatorId,
      modifiedOn: AppService.time
    };
  }


  /**
   *
   * Builds a AppUser object from form's data
   * @param formData
   * @param uuid
   * @param creatorId
   * @param photo
   * @param role
   * @private
   */
  static generateUserObject(formData: any, uuid: string, creatorId: string, photo: string, role: AppUserRoles): AppUser {
    return {
      address: FormDataWrapper.buildAddressObject(formData, uuid, creatorId),
      createdBy: creatorId,
      createdOn: AppService.time,
      firstName: formData.firstName,
      fullName: FormDataWrapper.getFullName(formData),
      id: uuid,
      isDisabled: false,
      lastName: formData.lastName,
      modifiedBy: creatorId,
      modifiedOn: AppService.time,
      personalEmail: formData.personalEmail,
      photoUrl: photo,
      title: role
    };
  }

  static buildAddressObject(formData: any, owner: string, creatorId: string): Address {

    return {
      city: formData.city,
      county: formData.county,
      createdBy: creatorId,
      createdOn: AppService.time,
      personalEmail: formData.personalEmail,
      modifiedBy: creatorId,
      modifiedOn: AppService.time,
      addressLine: formData.addressLine,
      ownerId: owner,
      owningUser: formData.firstName + " " + formData.lastName,
      stateOrProvince: formData.state,
      telephone1: formData.telephone1,
      telephone2: formData.telephone2,
    };
  }

  /**
   * Returns a full name from a form
   * @param formData
   * @private
   */
  static getFullName(formData: any): string {
    return formData.firstName + " " + formData.lastName;
  }

}
