import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../shared/services/api.service";
import {AppService} from "../../shared/services/app.service";
import {NzMessageService} from "ng-zorro-antd";
import {LogcatService} from "../../shared/services/logcat.service";

@Component({
  selector: "app-add-new-producer",
  templateUrl: "./add-new-producer.component.html",
  styleUrls: ["./new-producer.component.css"]
})
export class NewProducerComponent implements OnInit {
  formGroup: FormGroup;
  // flags
  flagShowLoadingButton = false;
  @Output() eventCloseNewProduceurForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private appService: AppService,
              private messageService: NzMessageService,
              private logcat: LogcatService) {
  }

  ngOnInit() {
  }

}
