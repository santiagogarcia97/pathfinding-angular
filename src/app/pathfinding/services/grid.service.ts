import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NodeTypes, Node} from '../types';
import {dijkstra} from '../algorithms/dijkstra';
import {astar} from '../algorithms/astar';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  readonly ROWS = 25;
  readonly COLUMNS = 60;
  private menuLocked = false;
  private gridLocked = false;
  private MouseDown = false;
  private MouseDrag =  NodeTypes.Clear;

  private startNode: Node = {row: 12, col: 20, type: NodeTypes.Start};
  private endNode: Node = {row: 12, col: 40, type: NodeTypes.End};
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
  setMouseDrag(type: NodeTypes): void {
    this.MouseDrag = type;
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
    if (this.MouseDrag === NodeTypes.Start) {
      this.setStart(node);
    }
    if (this.MouseDrag === NodeTypes.End) {
      this.setEnd(node);
    }
    else {
      this.toggleWall(node);
    }
  }

  setStart(node: Node): void {
    if (node.row === this.endNode.row && node.col === this.endNode.col) { return; }
    this.grid[this.startNode.row][this.startNode.col].type = NodeTypes.Clear;
    this.startNode = node;
    this.animateStartEndNodes();
  }
  setEnd(node: Node): void {
    if (node.row === this.startNode.row && node.col === this.startNode.col) { return; }
    this.grid[this.endNode.row][this.endNode.col].type = NodeTypes.Clear;
    this.endNode = node;
    this.animateStartEndNodes();
  }

  toggleWall(node: Node): void {
    if (this.grid[node.row][node.col].type === NodeTypes.Clear) {
      this.grid[node.row][node.col].type = NodeTypes.Wall;
      this.gridChange.next(this.grid);
    }
    else if (this.grid[node.row][node.col].type === NodeTypes.Wall) {
      this.grid[node.row][node.col].type = NodeTypes.Clear;
      this.gridChange.next(this.grid);
    }
  }

  animateStartEndNodes(): void {
    this.grid[this.endNode.row][this.endNode.col].type = NodeTypes.End;
    this.grid[this.startNode.row][this.startNode.col].type = NodeTypes.Start;
    this.gridChange.next(this.grid);
  }

  resetGrid(): void {
    this.grid.forEach((row) => {
      row.forEach((node) => {
        if (node.type === NodeTypes.Visited || node.type === NodeTypes.Path)
          {node.type = NodeTypes.Clear; }
        node.distance = undefined;
        node.previousNode = undefined;
        node.visited = undefined;
      });
    });
  }

  newGrid(type: string): void {
    const clearGrid = [];
    for (let i = 0; i < this.ROWS; i++) {
      const row: Node[] = [];
      for (let j = 0; j < this.COLUMNS; j++) {
        row.push({
          row: i,
          col: j,
          type: NodeTypes.Clear,
          weight: type === 'weighted' ? Math.ceil(Math.random() * 5) : 1
        });
      }
      clearGrid.push(row);
    }
    this.gridChange.next(clearGrid);

    this.animateStartEndNodes();
  }

  animateAlgorithm(delay: number, algorithm: string): void {
    const getShortestPath = (visitedList: Node[]): Node[] => {
      const path: Node[] = [];
      let currentNode = visitedList.pop();
      while (currentNode !== undefined) {
        path.unshift(currentNode);
        if (!currentNode.previousNode) { break; }
        currentNode = currentNode.previousNode;
      }
      return path;
    };

    let visitedNodes;
    if (algorithm === 'dijkstra') {visitedNodes = dijkstra(this.grid, this.startNode, this.endNode); }
    else if (algorithm === 'astar') {visitedNodes = astar(this.grid, this.startNode, this.endNode); }

    let count = 1;
    for (const node of visitedNodes){
      setTimeout(() => {
        if (node.type === NodeTypes.Start || node.type === NodeTypes.End) { return; }
        this.grid[node.row][node.col].type = NodeTypes.Visited;
        this.gridChange.next(this.grid);
      }, delay * count++);
    }
    if (visitedNodes[visitedNodes.length - 1].type === NodeTypes.End) {
      const shortestPath = getShortestPath(visitedNodes);
      for (const node of shortestPath) {
        setTimeout(() => {
          if (node.type === NodeTypes.Start || node.type === NodeTypes.End) {
            return;
          }
          this.grid[node.row][node.col].type = NodeTypes.Path;
          this.gridChange.next(this.grid);
        }, delay * count++);
      }
    }
    setTimeout(() => {
      this.menuLockedChange.next(false);
    }, delay * count++);
  }
}
