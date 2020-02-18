import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Box, Player } from "./models/box.model";
import { GameState } from "./models/game.state";
import { AppComponent } from "./app.component";

export enum GameActionsTypes {
  CHECKED_BOX = "Player checked box",
  RESET_GAME = "Game is reseted"
}

export interface GameAction {
  readonly type: GameActionsTypes;
  readonly payload: any;
}

@Injectable({
  providedIn: "root"
})
export class GameStoreService {
  private state = this.getInitialState();
  private dispatch = new BehaviorSubject<GameState>(this.state);

  constructor() {}

  $state: Observable<GameState> = this.dispatch.asObservable();

  update(state: GameState) {
    this.dispatch.next(state);
  }

  resetGame() {
    this.update(this.getInitialState());
  }

  private getInitialState(): GameState {
    return new GameState([
      new Player("You", "X", false),
      new Player("Tic Tac Joe", "O", true)
    ]);
  }
}
