import { Component, OnInit } from '@angular/core';
import {GridService} from '../services/grid.service';
import {GridType} from '../types';

@Component({
  selector: 'pf-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  gridTypeSelect = GridType.Unweighted;
  menuLocked = false;

  constructor(private gridService: GridService) {
    this.gridService.menuLockedChange.subscribe((value) => {
      this.menuLocked = value;
    });
  }

  ngOnInit(): void {
  }

  newGrid(): void {
    console.log(this.gridTypeSelect);
    this.gridService.newGrid(this.gridTypeSelect);
  }

  handleClick(): void {
    this.gridService.setMenuLocked(true);
    this.gridService.visualizeDijkstra();
  }
}
