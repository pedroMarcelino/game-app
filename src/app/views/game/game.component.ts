import { Component, OnInit } from '@angular/core';
import { Game } from "src/app/model/game";
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  games = new Array<Game>();

  selGame: Game = null;
  editMode = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.refreshGames();

  }

  refreshGames() {
    this.games = this.gameService.list();
  }

  selectGame(game: Game) {
    this.selGame = game;
    this.editMode = true;
  }

  new() {
    this.selGame = new Game();
    this.editMode = false;
  }
  cancel() {
    this.selGame = null;
  }
  save() {
    if (this.editMode) {
      this.gameService.update(this.selGame);
    } else {
      this.gameService.insert(this.selGame);
    }

    this.selGame = null;

    this.cancel();
    this.refreshGames();
  }

  remove(id: number) {
    this.gameService.remove(id);
    this.refreshGames();
  }


}
