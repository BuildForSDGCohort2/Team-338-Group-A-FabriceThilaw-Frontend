import {Address} from "../shared/interfaces/address.type";
import {AppService} from "../shared/services/app.service";
import {AppUser, AppUserRoles, FarmingAdvisor} from "../shared/interfaces/user.type";

export class FormDataWrapper {
  constructor() {
  }

  static generateFarmingAdvisorObject(userWithAdvisorTitle: AppUser, managerId: string,
                                      uuid: string, creatorId: string): FarmingAdvisor {
    return {
      areaPerCoachedFarmer: null, supervisedAreaPerCrop: null,
      id: uuid,
      userId: userWithAdvisorTitle.id,
      photoUrl: userWithAdvisorTitle.photoUrl,
      userFullName: userWithAdvisorTitle.fullName,
      isDisabled: false,
      managerId: managerId,
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
   * @param photoUrl
   * @private
   */
  static generateUserObject(formData: any, uuid: string, creatorId: string, photoUrl: string): AppUser {
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
      photoUrl: photoUrl,
      title: AppUserRoles.ROLE_AGRICULTURAL_ADVISOR
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
