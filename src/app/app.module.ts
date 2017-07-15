import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TypingComponent } from './typing/typing.component';
import { TypingService } from './typing.service';

@NgModule({
  declarations: [
    AppComponent,
    TypingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TypingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
