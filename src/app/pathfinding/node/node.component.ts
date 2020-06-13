import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../types';

@Component({
  selector: 'pf-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() node: Node;

  constructor() {
  }

  ngOnInit(): void {
  }

  getClass(): string {
    return (this.node.color && this.node.color === 'darkgray') ? 'node node-visited' : 'node';
  }
}
