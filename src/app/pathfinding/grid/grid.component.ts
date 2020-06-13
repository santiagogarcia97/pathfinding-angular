import {Component, OnInit} from '@angular/core';
import {Animation, Node} from '../types';
import {GridService} from '../services/grid.service';

@Component({
  selector: 'pf-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  grid: Node[][];

  constructor(private gridService: GridService) {
    this.gridService.gridChange.subscribe((value) => {
      this.grid = value;
    });
    gridService.clear();
  }

  ngOnInit(): void {
  }

  getClass(node: Node): string {
    switch (node.animation) {
      case Animation.Start:
        return 'node node-start';
        break;
      case Animation.End:
        return 'node node-end';
        break;
      case Animation.Visited:
        return 'node node-visited';
        break;
      case Animation.Path:
        return 'node node-path';
        break;
      case Animation.Wall:
        return 'node node-wall';
        break;
      case Animation.Clear:
      default:
        return 'node';
    }
  }

  onMouseDown(node: Node): void {
    this.gridService.toggleWall(node);
  }

}
