import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PathfindingComponent } from './pathfinding/pathfinding.component';
import { NodeComponent } from './pathfinding/node/node.component';
import { TopbarComponent } from './pathfinding/topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PathfindingComponent,
    NodeComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
