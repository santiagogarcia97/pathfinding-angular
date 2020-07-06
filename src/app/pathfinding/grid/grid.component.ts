import {Component} from '@angular/core';
import {NodeTypes, Node} from '../types';
import {GridService} from '../services/grid.service';

@Component({
  selector: 'pf-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent  {

  grid: Node[][];

  constructor(private gridService: GridService) {
    this.gridService.gridChange.subscribe((value) => {
      this.grid = value;
    });
    gridService.newGrid('unweighted');
  }

  getClass(node: Node): string {
    switch (node.type) {
      case NodeTypes.Start:
        return 'inner node-start'; break;
      case NodeTypes.End:
        return 'inner node-end'; break;
      case NodeTypes.Visited:
        return 'inner node-visited'; break;
      case NodeTypes.Path:
        return 'inner node-path'; break;
      case NodeTypes.Wall:
        return 'inner node-wall'; break;
      case NodeTypes.Clear:
      default:
        return 'inner';
    }
  }
  getBackground(node: Node): any {
    switch (node.weight) {
      case 5:
        return {'background-color': '#C3C3C3'}; break;
      case 4:
        return {'background-color': '#D2D2D2'}; break;
      case 3:
        return {'background-color': '#E1E1E1'}; break;
      case 2:
        return {'background-color': '#f0f0f0'}; break;
      case 1:
      default:
        return {'background-color': '#ffffff'};
    }
  }

  onMouseUp(): void {
    this.gridService.setMouseDown(false);
  }

  onMouseEnter(node: Node, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.gridService.getGridLocked()) { return; }
    if (this.gridService.getMouseDown()) {
      this.gridService.changeNode(node);
    }
  }

  onMouseDown(node: Node, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.gridService.getGridLocked()) { return; }
    this.gridService.setMouseDown(true);
    this.gridService.setMouseDrag(node.type);
    this.gridService.changeNode(node);
  }

}
