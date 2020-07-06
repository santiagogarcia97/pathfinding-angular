import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopbarComponent } from './pathfinding/topbar/topbar.component';
import { MenuComponent } from './pathfinding/menu/menu.component';
import { GridComponent } from './pathfinding/grid/grid.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdTutorialComponent} from './pathfinding/menu/md-tutorial/md-tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    MenuComponent,
    GridComponent,
    MdTutorialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
