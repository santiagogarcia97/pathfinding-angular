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
        return 'inner node-start';
        break;
      case Animation.End:
        return 'inner node-end';
        break;
      case Animation.Visited:
        return 'inner node-visited';
        break;
      case Animation.Path:
        return 'inner node-path';
        break;
      case Animation.Wall:
        return 'inner node-wall';
        break;
      case Animation.Clear:
      default:
        return 'inner';
    }
  }

  onMouseUp(): void {
    console.log('up');
    this.gridService.setMouseDown(false);
  }

  onMouseEnter(node: Node, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('enter');
    if (this.gridService.getMouseDown()) {
      this.gridService.changeNode(node);
    }
  }

  onMouseDown(node: Node, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('down');
    this.gridService.setMouseDown(true);
    this.gridService.setMouseDrag(node.animation);
    this.gridService.changeNode(node);
  }

}
