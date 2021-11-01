import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MsgTypingDirective } from './msg-typing.directive';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsgformComponent } from './msgform/msgform.component';
import { FileSelectionDirective } from './file-selection.directive';
import { MsgWrapperDirective } from './msg-wrapper.directive';

@NgModule({
  declarations: [
    AppComponent,
    MsgTypingDirective,
    MsgformComponent,
    FileSelectionDirective,
    MsgWrapperDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: Window, useValue: window}],
  bootstrap: [AppComponent]
})
export class AppModule { }
