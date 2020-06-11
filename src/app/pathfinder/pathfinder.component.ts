import { Component, OnInit } from '@angular/core';
import {Node} from './types';
import {dijkstra} from './dijkstra';

@Component({
  selector: 'app-pathfinder',
  templateUrl: './pathfinder.component.html',
  styleUrls: ['./pathfinder.component.css']
})
export class PathfinderComponent implements OnInit {

  startX = 10;
  startY = 12;
  endX = 26;
  endY = 25;
  delay = 20;
  grid: Node[][];

  constructor() {
    this.clear();
  }

  ngOnInit(): void {
  }

  clear(): void {
    this.grid = [];

    for (let i = 0; i < 30; i++) {
      const row: Node[] = [];
      for (let j = 0; j < 30; j++) {
        row.push({
          row: i,
          col: j,
          color: 'white',
          distance: Infinity,
          visited: false
        });
      }
      this.grid.push(row);
    }
    this.grid[this.startX][this.startY].distance = 0;
    this.grid[this.startX][this.startY].color = 'green';
    this.grid[this.endX][this.endY].color = 'blue';
  }

  handleClick(): void {
    dijkstra(this.grid, this.startX, this.startY, this.endX, this.endY, this.delay);
  }
}
