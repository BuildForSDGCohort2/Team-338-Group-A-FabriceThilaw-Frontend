import {Address} from "./address.type";

export const AppUser_ROLES: string[] = ["GREENUP_ADMIN", "OPERATION_MANAGER", "AGRICULTURAL_ADVISOR", "FARMER"];

export interface AppUser {
  address: Address;
  createdBy: string;
  createdOn: string;
  firstName: string;
  fullName: string;
  id: string;
  isDisabled: boolean;
  lastName: string;
  modifiedBy: string;
  modifiedOn: string;
  personalEmail: string;
  photoUrl: string;
  token: string;
  /**
   * Can be one of the following: GREENUP_ADMIN, OPERATION_MANAGER, AGRICULTURAL_ADVISOR, FARMER
   */
  title: string;
}

// todo set relevant properties to this OperationManager entity
export interface OperationManager {
  id: string;
  isDisabled: boolean;
  userId: string;
  userFullName: string;
  organizationCode: string;
  /**
   * A map of < farming advisor id, advisor's fullname >
   */
  advisorTeam: Map<string, string>;

}

export interface FarmingAdvisor {
  /**
   * A map of <Crop name, Supervised area per crop>
   */
  supervisedAreaPerCrop: Map<string, string>;

  /**
   * A map of <Coached farmer id, Coached farmer's area supervised>
   */
  areaPerCoachedFarmer: Map<string, string>;
  id: string;
  isDisabled: boolean;
  userId: string;
  managerId: string;
  userFullName: string;

}

export interface Farmer {
  /**
   * Combination of address Country, State or province, city or county
   */
  addressLine: string;

  advisorId: string;


  /**
   * A map of <Crop name, Cultivated area>
   */
  areaPerCrop: Map<string, string>;

  id: string;
  isDisabled: boolean;

  /**
   * Same telephone1 as in the user's address
   */
  telephone1: string;
  /**
   * Same telephone2 as in the user's address
   */
  telephone2: string;

  userId: string;
  userFullName: string;
}

