export interface Farm {
  id: string;
  ownerId: string;
  owningFarmer: string;
  /**
   * a map of <supervisor's fullname >
   */
  supervisors: Map<string, string>;
}
