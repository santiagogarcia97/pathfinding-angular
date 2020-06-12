import { Component, OnInit } from '@angular/core';
import {Node} from './types';
import {dijkstra} from './dijkstra';

@Component({
  selector: 'pf-main',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.css']
})
export class PathfindingComponent implements OnInit {

  startNode: Node = {row: 12, col: 13};
  endNode: Node = {row: 16, col: 37};
  delay = 10;
  grid: Node[][];

  constructor() {
    this.clear();
  }

  ngOnInit(): void {
  }

  clear(): void {
    this.grid = [];

    for (let i = 0; i < 40; i++) {
      const row: Node[] = [];
      for (let j = 0; j < 45; j++) {
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
    this.grid[this.startNode.row][this.startNode.col].distance = 0;
    this.grid[this.startNode.row][this.startNode.col].color = 'green';
    this.grid[this.endNode.row][this.endNode.col].color = 'blue';
  }

  handleClick(): void {
    dijkstra(this.grid, this.startNode, this.endNode, this.delay);
  }
}
