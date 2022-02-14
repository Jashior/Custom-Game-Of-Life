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
  rules!: any;

  initializeBoarState() {}

  constructor(private boardService: BoardService) {
    this.boardService.initializeBoardState();
    this.boardService.initializeRules();
    this.boardService.board$.subscribe((board: Cell[][]) => {
      this.board = board;
    });
    this.boardService.tick$.subscribe((tick: number) => {
      this.tick = tick;
    });
    this.boardService.run$.subscribe((run: boolean) => {
      this.run = run;
    });
    this.boardService.rules$.subscribe((rules: any) => {
      this.rules = rules;
    });
  }

  toggleState(cell: Cell) {
    this.boardService.toggleState(cell);
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

  resetRules() {
    this.boardService.resetRules();
  }

  ngOnInit(): void {}

  ngOnChanges() {
    console.log('changes');
    let defaultRules = this.boardService.getDefaultRules();
    if (this.rules.underpopulation_threshold == null) {
      console.log(`null detected`);
      this.rules.underpopulation_threshold =
        defaultRules.underpopulation_threshold;
    }
  }
}
