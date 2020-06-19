import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Animation, GridType, Node} from '../types';
import {dijkstra, getShortestPath} from '../dijkstra';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  readonly ROWS = 25;
  readonly COLUMNS = 60;
  private menuLocked = false;
  private gridLocked = false;
  private MouseDown = false;
  private MouseDrag =  Animation.Clear;

  private startNode: Node = {row: 15, col: 20, animation: Animation.Start};
  private endNode: Node = {row: 15, col: 40, animation: Animation.End};
  private grid: Node[][] = [];
  public gridChange: Subject<Node[][]> = new Subject<Node[][]>();
  public menuLockedChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.gridChange.subscribe((value) => {
      this.grid = value;
    });
    this.menuLockedChange.subscribe((value) => {
      this.menuLocked = value;
    });
  }


  setMouseDown(bool: boolean): void {
    this.MouseDown =  bool;
  }
  getMouseDown(): boolean {
    return this.MouseDown;
  }
  setMouseDrag(animation: Animation): void {
    this.MouseDrag = animation;
  }

  setMenuLocked(bool: boolean): void {
    this.menuLockedChange.next(bool);
  }

  setGridLocked(bool: boolean): void {
    this.gridLocked = bool;
  }
  getGridLocked(): boolean {
    return this.gridLocked;
  }
  changeNode(node: Node): void {
    if (this.MouseDrag === Animation.Start) {
      this.setStart(node);
    }
    if (this.MouseDrag === Animation.End) {
      this.setEnd(node);
    }
    else {
      this.toggleWall(node);
    }
  }

  setStart(node: Node): void {
    if (node.row === this.endNode.row && node.col === this.endNode.col) { return; }
    this.grid[this.startNode.row][this.startNode.col].animation = Animation.Clear;
    this.startNode = node;
    this.animateStartEndNodes();
  }
  setEnd(node: Node): void {
    if (node.row === this.startNode.row && node.col === this.startNode.col) { return; }
    this.grid[this.endNode.row][this.endNode.col].animation = Animation.Clear;
    this.endNode = node;
    this.animateStartEndNodes();
  }

  toggleWall(node: Node): void {
    if (this.grid[node.row][node.col].animation === Animation.Clear) {
      this.grid[node.row][node.col].animation = Animation.Wall;
      this.gridChange.next(this.grid);
    }
    else if (this.grid[node.row][node.col].animation === Animation.Wall) {
      this.grid[node.row][node.col].animation = Animation.Clear;
      this.gridChange.next(this.grid);
    }
  }

  animateStartEndNodes(): void {
    this.grid[this.endNode.row][this.endNode.col].animation = Animation.End;
    this.grid[this.startNode.row][this.startNode.col].animation = Animation.Start;
    this.gridChange.next(this.grid);
  }

  resetGrid(): void {
    this.grid.forEach((row) => {
      row.forEach((node) => {
        if (node.animation === Animation.Visited || node.animation === Animation.Path)
          {node.animation = Animation.Clear; }
        node.distance = undefined;
        node.previousNode = undefined;
        node.visited = undefined;
      });
    });
  }

  newGrid(type: GridType): void {
    const clearGrid = [];
    for (let i = 0; i < this.ROWS; i++) {
      const row: Node[] = [];
      for (let j = 0; j < this.COLUMNS; j++) {
        row.push({
          row: i,
          col: j,
          animation: Animation.Clear,
          weight: type === 'Weighted' ? Math.ceil(Math.random() * 5) : 1
        });
      }
      clearGrid.push(row);
    }
    this.gridChange.next(clearGrid);

    this.animateStartEndNodes();
  }

  visualizeDijkstra(delay: number): void {
    const visitedNodes = dijkstra(this.grid, this.startNode, this.endNode);
    let count = 1;
    for (const node of visitedNodes){
      setTimeout(() => {
        if (node.animation === Animation.Start || node.animation === Animation.End) { return; }
        this.grid[node.row][node.col].animation = Animation.Visited;
        this.gridChange.next(this.grid);
      }, delay * count);
      count++;
    }
    const shortestPath = getShortestPath(visitedNodes);
    for (const node of shortestPath){
      setTimeout(() => {
        if (node.animation === Animation.Start || node.animation === Animation.End) { return; }
        this.grid[node.row][node.col].animation = Animation.Path;
        this.gridChange.next(this.grid);
      }, delay * count);
      count++;
      setTimeout(() => {
        this.menuLockedChange.next(false);
      }, delay * count);
    }
  }
}
