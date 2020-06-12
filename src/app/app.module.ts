import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PathfindingComponent } from './pathfinding/pathfinding.component';
import { NodeComponent } from './pathfinding/node/node.component';
import { TopbarComponent } from './pathfinding/topbar/topbar.component';
import { MenuComponent } from './pathfinding/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PathfindingComponent,
    NodeComponent,
    TopbarComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
