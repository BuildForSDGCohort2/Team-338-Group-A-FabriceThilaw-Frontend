import {Component, OnInit} from "@angular/core";
import {AppUser, Farmer} from "../../shared/interfaces/user.type";
import {ApiService} from "../../shared/services/api.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: "app-producers-list",
  templateUrl: "./producers-list.component.html",
  styleUrls: ["./producers-list.component.css"]
})
export class ProducersListComponent implements OnInit {

  producerListViewMode = "cardView";

  allProducers: Farmer[] = [];

  // flags
  flagShowProducerListLoader = true;
  flagShowProducerList = true;
  flagShowProducerListEmpty = true;
  flagShowNewProducerForm = false;

  constructor(private  apiService: ApiService,
              private  messageService: NzMessageService) {
  }

  ngOnInit() {
    const currentUser = this.apiService.currentUserValue;
    this.getAllProducers(currentUser);
  }

  /**
   *
   * @param $event
   */
  listenToCloseNewProducerForm($event: boolean) {
    this.messageService.info("New producer is added");
    // raise the flags
    this.flagShowNewProducerForm = false;
    this.flagShowProducerList = true;
    this.producerListViewMode = "cardView";
  }

  /**
   *
   */
  onAddNewProducer() {
    this.flagShowNewProducerForm = true;
  }

  /**
   *
   * @param photoUrl
   */
  getProducerPicture(photoUrl: string) {
    if (photoUrl === null || photoUrl.trim().length === 0) {
      return "assets/images/avatars/thumb_farming_specialist.jpg";
    } else {
      return photoUrl;
    }
  }

  /**
   *
   * @param producer
   */
  getCurrentFarmerAdvisor(producer: Farmer): string {
    if (producer.advisorId !== null) {
      return producer.advisorFullName ? producer.advisorFullName : "Not set";
    }
    return "Not set";
  }

  /**
   *
   * @param producer
   */
  getCultivableAreaForProducer(producer: Farmer): number {
    const areaMap = Array.from(producer.areaPerCrop.values());
    if (areaMap !== null) {
      return areaMap.reduce((a, b) => a + b, 0);
    }
    return 0;
  }

  /**
   *
   * @param producer
   */
  getNumberOfActivePlots(producer: Farmer): number {
    const areaMap = producer.areaPerCrop;
    if (areaMap !== null) {
      return 0;
    }
    return 0;
  }

  /**
   *
   * @private
   * @param manager
   */
  private getAllProducers(manager: AppUser) {
    this.flagShowProducerListLoader = true;
    this.flagShowNewProducerForm = false;

    if (manager !== null) {

      this.apiService.getAllFarmersForManager(manager.id).subscribe(
        (data) => {

          // rise a flag because data is loading
          this.flagShowProducerListLoader = false;

          // rise a flag to hide advisor forms
          this.flagShowNewProducerForm = false;

          // check the data that is found
          if (data !== null) {
            this.allProducers = data;
            this.flagShowProducerListEmpty = (data.length === 0);
          }
        }
      );
    }
  }

}
