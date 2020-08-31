import {Address} from "./address.type";
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;


export enum AppUser_ROLES {
  GREENUP_ADMIN = "GREENUP_ADMIN",
  OPERATION_MANAGER = "OPERATION_MANAGER",
  AGRICULTURAL_ADVISOR = "AGRICULTURAL_ADVISOR",
  FARMER = "FARMER"
}

export interface AppUser {
  address: Address;
  createdBy: string;
  createdOn: Timestamp;
  firstName: string;
  fullName: string;
  id: string;
  isDisabled: boolean;
  lastName: string;
  modifiedBy: string;
  modifiedOn: Timestamp;
  personalEmail: string;
  photoUrl: string;
  // token: string;
  /**
   * Can be one of the following: GREENUP_ADMIN, OPERATION_MANAGER, AGRICULTURAL_ADVISOR, FARMER
   */
  title: string;
}

// todo set relevant properties to this OperationManager entity
export interface OperationManager {
  id: string;
  isDisabled: boolean;
  photoUrl: string;
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
  photoUrl: string;
  userId: string;
  managerId: string;
  userFullName: string;

  createdBy: string;
  createdOn: Timestamp;
  modifiedBy: string;
  modifiedOn: Timestamp;
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

