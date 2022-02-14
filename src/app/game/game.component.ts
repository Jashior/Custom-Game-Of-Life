import { Component, OnInit } from '@angular/core';
import { Cell } from '../models/cell';
import { CellState } from '../models/cellState';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  boardSize = 30;
  board: Cell[][] = [];
  tick: number = 0;
  run: boolean = false;

  initializeBoarState() {}

  constructor(private boardService: BoardService) {
    this.boardService.initializeBoardState();
    this.boardService.board$.subscribe((board: Cell[][]) => {
      this.board = board;
    });
    this.boardService.tick$.subscribe((tick: number) => {
      this.tick = tick;
    });
    this.boardService.run$.subscribe((run: boolean) => {
      this.run = run;
    });
  }

  toggleState(cell: Cell) {
    this.boardService.toggleState(cell);
  }

  printBoard() {
    this.boardService.printBoard();
  }

  nextBoard() {
    this.boardService.evolve();
  }

  startGame() {
    this.boardService.start();
  }

  stopGame() {
    this.boardService.stop();
  }

  resetBoard() {
    this.boardService.reset();
  }

  ngOnInit(): void {}
}
