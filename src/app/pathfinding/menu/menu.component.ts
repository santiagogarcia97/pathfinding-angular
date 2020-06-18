import { Component, OnInit } from '@angular/core';
import {GridService} from '../services/grid.service';
import {GridType} from '../types';

@Component({
  selector: 'pf-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  buttonText = 'Find Path!';
  buttonCss = 'btn-find';
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
    if (this.gridService.getGridLocked()) {
      this.buttonText = 'Find path!';
      this.buttonCss = 'btn-find';
      this.gridService.setGridLocked(false);
      this.gridService.resetGrid();
    }
    else {
      this.buttonText = 'Reset';
      this.buttonCss = 'btn-reset';
      this.gridService.setGridLocked(true);
      this.gridService.setMenuLocked(true);
      this.gridService.visualizeDijkstra();
    }
  }
}
