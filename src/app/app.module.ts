import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InitializatorComponent } from './components/index';
import { AuthComponent } from './components/index';

import { InteractionFacadeImpl } from './services/InteractionFacadeImpl';
import { AuthService } from './services/AuthService';

@NgModule({
  declarations: [
    AppComponent,
    InitializatorComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [InteractionFacadeImpl, AuthService],
  bootstrap: [AppComponent, InitializatorComponent]
})
export class AppModule { }
