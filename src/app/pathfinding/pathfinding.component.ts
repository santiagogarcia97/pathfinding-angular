import { Component, OnInit } from '@angular/core';
import {Node} from './types';
import {dijkstra} from './dijkstra';

@Component({
  selector: 'pf-main',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.css']
})
export class PathfindingComponent implements OnInit {

  startNode: Node = {row: 8, col: 8};
  endNode: Node = {row: 25, col: 35};
  delay = 10;
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
      for (let j = 0; j < 60; j++) {
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
