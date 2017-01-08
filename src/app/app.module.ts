import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';
import { InitializatorComponent } from './components/index';
import { AuthComponent } from './components/index';
import { GameComponent } from './components/index';
import { ScoreTableComponent } from './components/index';

import { InteractionFacadeImpl } from './services/InteractionFacadeImpl';
import { AuthService } from './services/AuthService';
import { WindowService } from './services/WindowService';

import { secondsToTime } from './filters/secondsToTime.filter';


@NgModule({
  declarations: [
    AppComponent,
    InitializatorComponent,
    AuthComponent,
    GameComponent,
    ScoreTableComponent,
    secondsToTime
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CookieService, InteractionFacadeImpl, AuthService, WindowService],
  bootstrap: [AppComponent, InitializatorComponent]
})
export class AppModule { }
