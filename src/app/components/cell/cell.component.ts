import { Component, Input, OnInit } from '@angular/core';
import { CellState } from 'src/app/models/cellState';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  @Input() state!: CellState;

  constructor() {}

  ngOnInit(): void {}
}
