import { Component } from '@angular/core';
import {GridService} from '../services/grid.service';

@Component({
  selector: 'pf-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  buttonText = 'Find Path!';
  buttonCss = 'btn-green';
  gridTypeSelect = 'unweighted';
  algoSelect = 'dijkstra';
  delay = '20';
  menuLocked = false;
  showModal = true;

  constructor(private gridService: GridService) {
    this.gridService.menuLockedChange.subscribe((value) => {
      this.menuLocked = value;
    });
  }

  newGrid(): void {
    this.buttonText = 'Find path!';
    this.buttonCss = 'btn-green';
    this.gridService.setGridLocked(false);
    this.gridService.newGrid(this.gridTypeSelect);
  }

  handleClickShowModal() {
    this.showModal = !this.showModal;
  }
  onModalClose(event: boolean) {
    this.showModal = event;
  }

  handleClick(): void {
    if (this.gridService.getGridLocked()) {
      this.buttonText = 'Find path!';
      this.buttonCss = 'btn-green';
      this.gridService.setGridLocked(false);
      this.gridService.resetGrid();
    }
    else {
      this.buttonText = 'Reset';
      this.buttonCss = 'btn-red';
      this.gridService.setGridLocked(true);
      this.gridService.setMenuLocked(true);
      this.gridService.animateAlgorithm(parseInt(this.delay, 10), this.algoSelect);
    }
  }
}
