import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import * as firebase from "firebase";
import {Address} from "../interfaces/address.type";
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: "root"
})
export class AppService {
  static ROUTE_TO_DASHBOARD = "management/overview";
  static ROUTE_TO_LOGIN = "login";

  constructor(public router: Router) {
  }


  static get time(): Timestamp {
    return firebase.firestore.Timestamp.now();
  }

  /**
   * Helps for navigation routing through out the modules.
   * It makes it easy to lookup to where navigation functon has been used in code.
   * @param route navigation target
   */
  static navigateTo(route: string, router: Router, breadCrumbData: any) {
    // redirect user to dashboard
    router.navigate([route], breadCrumbData)
      .then(_ => {
      });
  }

  /**
   * Returns a full name from a form
   * @param formData
   * @private
   */
  static getFullName(formData: any): string {
    return formData.firstName + " " + formData.lastName;
  }

  static buildAddressObject(formData: any, ownerId: string, creatorId: string): Address {

    return {
      city: formData.city,
      county: formData.county,
      createdBy: creatorId,
      createdOn: AppService.time,
      personalEmail: formData.personalEmail,
      modifiedBy: creatorId,
      modifiedOn: AppService.time,
      addressLine: formData.addressLine,
      ownerId: ownerId,
      owningUser: formData.firstName + " " + formData.lastName,
      stateOrProvince: formData.state,
      telephone1: formData.telephone1,
      telephone2: formData.telephone2,
    };
  }

}
