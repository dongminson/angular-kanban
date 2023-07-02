import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListComponent } from './components/list/list.component';


@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        ListComponent
    ],
    imports: [
        BrowserModule,
        DragDropModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
