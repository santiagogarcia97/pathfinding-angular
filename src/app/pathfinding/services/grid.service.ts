import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Node} from '../types';
import {dijkstra, getShortestPath} from '../dijkstra';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  startNode: Node = {row: 8, col: 8};
  endNode: Node = {row: 25, col: 35};
  grid: Node[][] = [];
  gridChange: Subject<Node[][]> = new Subject<Node[][]>();

  constructor() {
    this.gridChange.subscribe((value) => {
      this.grid = value;
    });
  }

  setGrid(newGridState: Node[][]): void {
    this.gridChange.next(newGridState);
  }
  setStart(node: Node): void {
    this.startNode = node;
    this.grid[this.startNode.row][this.startNode.col].distance = 0;
    this.grid[this.startNode.row][this.startNode.col].color = 'green';
    this.grid[this.endNode.row][this.endNode.col].color = 'blue';
    this.gridChange.next(this.grid);
  }
  getStart(): Node {
    return this.startNode;
  }

  clear(): void {
    const clearGrid = [];

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
      clearGrid.push(row);
    }
    clearGrid[this.startNode.row][this.startNode.col].distance = 0;
    clearGrid[this.startNode.row][this.startNode.col].color = 'green';
    clearGrid[this.endNode.row][this.endNode.col].color = 'blue';
    this.gridChange.next(clearGrid);
  }

  visualizeDijkstra(): void {
    const visitedNodes = dijkstra(this.grid, this.startNode, this.endNode);
    let count = 50;
    for (const node of visitedNodes){
      setTimeout(() => {
        if (node.row === this.startNode.row && node.col === this.startNode.col) { return; }
        if (node.row === this.endNode.row && node.col === this.endNode.col) { return; }
        this.grid[node.row][node.col].color = 'darkgray';
        this.gridChange.next(this.grid);
      }, 20 * count);
      count++;
    }

    const shortestPath = getShortestPath(visitedNodes);
    for (const node of shortestPath){
      setTimeout(() => {
        if (node.row === this.startNode.row && node.col === this.startNode.col) { return; }
        if (node.row === this.endNode.row && node.col === this.endNode.col) { return; }
        this.grid[node.row][node.col].color = 'MediumSeaGreen';
        this.gridChange.next(this.grid);
      }, 20 * count);
      count++;
    }
  }
}
