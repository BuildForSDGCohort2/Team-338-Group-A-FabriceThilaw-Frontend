import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-farming-advisors",
  templateUrl: "./farming-advisors.component.html",
  styleUrls: ["./farming-advisors.component.css"]
})
export class FarmingAdvisorsComponent implements OnInit {
  formGroup: FormGroup;
  // flags
  flagShowNewAdvisorForm = true;
  flagShowAdvisorList = true;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  listenToCloseNewAdvisorForm($event: boolean) {
    // raise the flag
    this.flagShowNewAdvisorForm = false;
    this.flagShowAdvisorList = true;
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      // identity
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      photoUrl: [null, [Validators.required]],
      // contact
      personalEmail: [null, [Validators.required]],
      telephone1: [null, [Validators.required]],
      telephone2: [null, [Validators.required]],
      // address
      addressLine: [null, [Validators.required]],
      stateOrProvince: [null, [Validators.required]],
      city: [null, [Validators.required]],
      county: [null, [Validators.required]],
    });
  }
}
