import { Component, OnInit } from '@angular/core';
import {Node} from './types';
import {dijkstra} from './dijkstra';
import {GridService} from './grid.service';

@Component({
  selector: 'pf-main',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.css']
})
export class PathfindingComponent implements OnInit {

  grid: Node[][];

  constructor(private gridService: GridService) {
    this.gridService.gridChange.subscribe((value) => {
      this.grid = value;
    });
    gridService.clear();
  }

  ngOnInit(): void {
  }
}
