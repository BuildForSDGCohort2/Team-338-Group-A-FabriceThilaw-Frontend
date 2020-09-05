import {Component, OnInit} from "@angular/core";
import {AppUser, FarmingAdvisor} from "../../shared/interfaces/user.type";
import {ApiService} from "../../shared/services/api.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: "app-farming-advisors",
  templateUrl: "./farming-advisors-list.component.html",
  styleUrls: ["./farming-advisors-list.component.css"]
})
export class FarmingAdvisorsListComponent implements OnInit {
  advisorListViewMode = "cardView";

  allFarmingAdvisor: FarmingAdvisor[] = [];

  // flags
  flagShowAdvisorListLoader = true;
  flagShowAdvisorList = true;
  flagShowAdvisorListEmpty = true;
  flagShowNewAdvisorForm = false;

  constructor(private  apiService: ApiService,
              private  messageService: NzMessageService) {
  }

  ngOnInit() {
    const currentUser = this.apiService.currentUserValue;
    this.getAllAdvisors(currentUser);
  }

  /**
   *
   * @param $event
   */
  listenToCloseNewAdvisorForm($event: boolean) {
    this.messageService.info("New farm advisor is added");
    // raise the flags
    this.flagShowNewAdvisorForm = false;
    this.flagShowAdvisorList = true;
    this.advisorListViewMode = "cardView";
  }

  /**
   *
   */
  onAddNewFarmingAdvisor() {
    this.flagShowNewAdvisorForm = true;
  }

  /**
   *
   * @param photoUrl
   */
  getAdvisorPicture(photoUrl: string) {
    if (photoUrl === null || photoUrl.trim().length === 0) {
      return "assets/images/avatars/thumb_farming_specialist.jpg";
    } else {
      return photoUrl;
    }
  }

  /**
   *
   * @private
   * @param manager
   */
  private getAllAdvisors(manager: AppUser) {
    this.flagShowAdvisorListLoader = true;
    this.flagShowNewAdvisorForm = false;

    if (manager !== null) {

      this.apiService.getFarmingAdvisors(manager.id).subscribe(
        (data) => {

          // rise a flag because data is loading
          this.flagShowAdvisorListLoader = false;

          // rise a flag to hide advisor forms
          this.flagShowNewAdvisorForm = false;

          // check the data that is found
          if (data !== null) {
            this.allFarmingAdvisor = data;
            this.flagShowAdvisorListEmpty = (data.length === 0);
          }
        }
      );
    }
  }
}
