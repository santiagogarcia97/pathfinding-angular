import { Component, OnInit } from '@angular/core';
import {Node} from '../types';
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
    return (node.color && node.color === 'darkgray') ? 'node node-visited' : 'node';
  }

  onDrag(node: Node): void {
    this.gridService.setStart(node);
    console.log(this.gridService.getStart());
  }

}
