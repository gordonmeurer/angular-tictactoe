import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Box } from "../../models/box.model";

@Component({
  selector: "app-box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.scss"]
})
export class BoxComponent implements OnInit {
  @Input() box: Box;
  @Output() boxChecked = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  checkBox() {
    if (this.box.checked) {
      return;
    }
    this.boxChecked.emit(this.box);
  }
}
