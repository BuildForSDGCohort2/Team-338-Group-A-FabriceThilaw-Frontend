import Timestamp = firebase.firestore.Timestamp;
import * as firebase from "firebase";

export interface Address {
  city: string;
  county: string;
  createdBy: string;
  createdOn: Timestamp;
  personalEmail: string;
  modifiedBy: string;
  modifiedOn: Timestamp;
  addressLine: string;
  ownerId: string;
  owningUser: string;
  stateOrProvince: string;
  telephone1: string;
  telephone2: string;
}

export interface GeoPoint {
  latitude: string;
  longitude: string;
  /**
   * Indication about whether this point is mere location point "location",
   * or if it is a "boundary" point for an area
   */
  coordinateType: string;
}
