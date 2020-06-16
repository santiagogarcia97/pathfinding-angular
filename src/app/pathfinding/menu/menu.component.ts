import { Component, OnInit } from '@angular/core';
import {GridService} from '../services/grid.service';

@Component({
  selector: 'pf-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuLocked = false;
  constructor(private gridService: GridService) {
    this.gridService.menuLockedChange.subscribe((value) => {
      this.menuLocked = value;
    });
  }

  ngOnInit(): void {
  }

  clear(): void {
    this.gridService.clear();
  }

  handleClick(): void {
    this.gridService.setMenuLocked(true);
    this.gridService.visualizeDijkstra();
  }
}
