import { Component, OnInit } from '@angular/core';
import {Node} from './types';

@Component({
  selector: 'app-pathfinder',
  templateUrl: './pathfinder.component.html',
  styleUrls: ['./pathfinder.component.css']
})
export class PathfinderComponent implements OnInit {

  grid: Node[][] = [];

  constructor() {
    for (let i = 0; i < 30; i++){
      const row: Node[] = [];
      for (let j = 0; j < 30; j++){
        row.push({
          row: i,
          col: j,
          color: 'red'
        });
      }
      this.grid.push(row);
    }
  }

  ngOnInit(): void {
  }

}
