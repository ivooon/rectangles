import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InitializatorComponent } from './components/index';
import { InteractionFacadeImpl } from './services/InteractionFacadeImpl';

@NgModule({
  declarations: [
    AppComponent,
    InitializatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [InteractionFacadeImpl],
  bootstrap: [AppComponent, InitializatorComponent]
})
export class AppModule { }
