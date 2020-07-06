import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'pf-md-tutorial',
  templateUrl: './md-tutorial.component.html',
  styleUrls: ['./md-tutorial.component.css']
})
export class MdTutorialComponent {

  @Input() showModal: boolean;
  @Output() modalClose = new EventEmitter();
  constructor() { }

  close() {
    this.showModal = false;
    this.modalClose.emit(false);
  }

}
