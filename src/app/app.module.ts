import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopbarComponent } from './pathfinding/topbar/topbar.component';
import { MenuComponent } from './pathfinding/menu/menu.component';
import { GridComponent } from './pathfinding/grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    MenuComponent,
    GridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
