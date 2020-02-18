import { Box, Player } from './box.model';
export class GameState {
  rows: Array<Array<Box>>;
  currentPlayer: Player;
  winner: Player;
  players: Array<Player>;
  isDraw: boolean;

  constructor(players: Array<Player>) {
    this.initRows();
    this.players =  players;
    this.currentPlayer = players[0];
  }

  private initRows() {
    this.rows = [];

    for (let row = 0; row < 3; row++) {
      const rowBoxes: Array<Box> = [];
      for (let box = 0; box < 3; box++) {
        rowBoxes.push(new Box(`${row}_${box}`));
      }
      this.rows.push(rowBoxes);
    }
  }
}
