import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PathfindingComponent } from './pathfinding/pathfinding.component';
import { NodeComponent } from './pathfinding/node/node.component';

@NgModule({
  declarations: [
    AppComponent,
    PathfindingComponent,
    NodeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
