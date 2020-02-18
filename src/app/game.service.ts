import { Injectable } from "@angular/core";
import { GameStoreService } from "./game.store.service";
import { GameState } from "./models/game.state";
import { Subscription } from "rxjs";
import { Box } from "./models/box.model";

@Injectable({
  providedIn: "root"
})
export class GameService {
  game: GameState = new GameState([]);

  constructor(private store: GameStoreService) {}

  private stateSubscription: Subscription = this.store.$state.subscribe(
    (gamestate: GameState) => {
      this.game = gamestate;
    }
  );

  switchPlayers() {
    this.game.currentPlayer = this.game.players.filter(
      p => p.name !== this.game.currentPlayer.name
    )[0];

    if (this.game.currentPlayer.isNPC) {
      setTimeout(() => {
        this.makeRandomMove();
      }, 1500);
    }
    this.store.update(this.game);
  }

  resetGame() {
    this.store.resetGame();
  }

  makeMove(box: Box) {
    box.checked = true;
    box.value = this.game.currentPlayer.value;
    this.game.rows.forEach(row => {
      let rowBox = row.find(x => x.id === box.id);
      if (rowBox) {
        rowBox = box;
      }
    });

    this.checkResult();
    if (!this.game.winner) {
      this.switchPlayers();
    }
    this.store.update(this.game);
  }

  private makeRandomMove() {
    const availableFilds = [];

    this.game.rows.forEach(row => {
      const boxes = row.filter(x => x.checked === false);
      availableFilds.push.apply(availableFilds, boxes);
    });

    if (availableFilds.length === 0) {
      return;
    }

    const fieldIndex = Math.floor(Math.random() * availableFilds.length);
    const box: Box = availableFilds[fieldIndex];
    this.makeMove(box);
  }

  private checkResult() {
    // RULES:
    // Three boxes in a row (vertical, horizontal or diagonal) must be checked by one player
    // if there is no option for winning it is a draw
    if (
      this.checkHorizontalWinner() ||
      this.checkVerticalWinner() ||
      this.checkDiagonalWinner()
    ) {
      console.log(`Winner is ${this.game.currentPlayer}`);
      this.game.winner = this.game.currentPlayer;
      return;
    }

    if (this.checkDraw()) {
      this.game.isDraw = true;
    }
  }

  private checkDraw() {
    const availbleBoxes = 9;
    let checkedBoxes = 0;
    this.game.rows.forEach(row => {
      row.forEach(box => {
        if (box.value) {
          checkedBoxes++;
        }
      });
    });

    return availbleBoxes === checkedBoxes;
  }

  private checkHorizontalWinner(): boolean {
    for (let index = 0; index < 3; index++) {
      const val = this.game.rows[index][0].value;
      if (!val) {
        continue;
      }

      if (
        val === this.game.rows[index][1].value &&
        val === this.game.rows[index][2].value
      ) {
        return true;
      }
    }

    return false;
  }

  private checkVerticalWinner(): boolean {
    for (let index = 0; index < 3; index++) {
      const val = this.game.rows[0][index].value;
      if (!val) {
        continue;
      }
      if (
        val === this.game.rows[1][index].value &&
        val === this.game.rows[2][index].value
      ) {
        // We got a vertical winner
        return true;
      }

      return false;
    }
  }

  private checkDiagonalWinner = () =>
    this.checkDiagonalTopLeft() || this.checkDiagonalBottomRight();

  private checkDiagonalBottomRight(): boolean {
    const val = this.game.rows[2][0].value;

    if (!val) {
      return false;
    }

    if (
      val === this.game.rows[1][1].value &&
      val === this.game.rows[0][2].value
    ) {
      return true;
    }

    return false;
  }

  private checkDiagonalTopLeft(): boolean {
    const val = this.game.rows[0][0].value;

    if (!val) {
      return false;
    }

    if (
      val === this.game.rows[1][1].value &&
      val === this.game.rows[2][2].value
    ) {
      return true;
    }

    return false;
  }
}
