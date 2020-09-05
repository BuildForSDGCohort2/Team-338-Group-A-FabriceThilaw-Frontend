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
  flagShowProducerListEmpty = false;
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
   * @param currentUser
   * @private
   */
  private getAllProducers(currentUser: AppUser) {

  }
}
