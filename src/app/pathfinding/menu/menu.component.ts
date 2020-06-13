import { Component, OnInit } from '@angular/core';
import {GridService} from '../services/grid.service';

@Component({
  selector: 'pf-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
  }

  clear(): void {
    this.gridService.clear();
  }

  handleClick(): void {
    this.gridService.visualizeDijkstra();
  }
}
