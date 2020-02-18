import { Component, OnInit, OnDestroy } from "@angular/core";
import { Box } from "../models/box.model";

import { GameState } from "../models/game.state";
import { GameService } from "../game.service";
import { GameStoreService } from "../game.store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.scss"]
})
export class FieldComponent implements OnInit, OnDestroy {
  state: GameState;

  private stateSubscription: Subscription = this.store.$state.subscribe(
    (gamestate: GameState) => {
      this.state = gamestate;
    }
  );

  constructor(private service: GameService, private store: GameStoreService) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  onBoxChecked(box: Box) {
    if (this.state.winner) {
      return;
    }
    this.service.makeMove(box);
  }

  resetGame() {
    this.service.resetGame();
  }
}
