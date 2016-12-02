import { Component, ViewChild  } from '@angular/core';

import { GameComponent } from './game/game.component';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'initializator',
  templateUrl: 'initializator.component.html',
  providers: []
})


export class InitializatorComponent{

	@ViewChild(GameComponent) 
	private _GameComponent: GameComponent;

	letsPlay = false;

	constructor(private _AuthService:AuthService) {}

    startGame():void {
     	this.letsPlay = true;
     	this._GameComponent.startGame();
    }

    logout(){
		this._AuthService.logout();
	}
}
