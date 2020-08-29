export interface Address {
  city: string;
  county: string;
  createdBy: string;
  createdOn: string;
  personalEmail: string;
  id: string;
  modifiedBy: string;
  modifiedOn: string;
  name: string;
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
