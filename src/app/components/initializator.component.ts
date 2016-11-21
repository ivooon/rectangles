import { Component, OnInit } from '@angular/core';
// import { CookieService } from 'angular2-cookie/core';

import { Game } from '../models/Game';
import { Player } from '../models/Player';
import { GameStatusListener } from '../api/listener/GameStatusListener';
import { MapUpdateListener } from '../api/listener/MapUpdateListener';
import { PlayerUpdateListener } from '../api/listener/PlayerUpdateListener';

import { AuthService } from '../services/AuthService';
import { InteractionFacadeImpl } from "../services/InteractionFacadeImpl";

declare var paper:any;

@Component({
  selector: 'initializator',
  templateUrl: 'initializator.component.html',
  providers: []
})


export class InitializatorComponent implements GameStatusListener, MapUpdateListener, PlayerUpdateListener{	
	cost = 0;

	constructor(private _AuthService:AuthService, private _InteractionFacadeImpl:InteractionFacadeImpl) {}


	onGameStatusUpdate(gameStatus: String): void {
		switch(gameStatus){
			case 'PENDING': 
				break;
			case 'STARTED':
				break;
			case 'FINISHED':
				break;
			default:
				break;
		}
		console.log('onGameStatusUpdate', gameStatus)
	}

	onMapUpdate(game: Game): void {
		console.log('onMapUpdate', game)
	}

	onPlayerUpdate(player: Player): void {
		console.log('onPlayerUpdate', player)
	}

	
    startGame():void {
     	this._InteractionFacadeImpl.startGame();
        this.draw();
        this._InteractionFacadeImpl.addGameStatusListener(this);
        this._InteractionFacadeImpl.addMapUpdateListener(this);
        this._InteractionFacadeImpl.addPlayerUpdateListener(this);
    }

    draw():void {
    	let _this = this;
    	let canvas = document.getElementById("myCanvas");
	    paper.setup(canvas);
	 	let tool = new paper.Tool();
	 	let firstPoint, block, w, h, currentCost, budget = 2000;

	    paper.view.onMouseDown = function(event) {
	    	firstPoint = event.point;
	    	block = new paper.Path.Rectangle(firstPoint, {width: 1, height: 1});
	    	block.fillColor = '#000';
		}
		
		tool.onMouseDrag = function(event) {
			h = event.point.y - firstPoint.y;
			w = event.point.x - firstPoint.x;

			currentCost = _this._InteractionFacadeImpl.getCost({x: firstPoint.x, y: firstPoint.y, width: Math.abs(w), height: Math.abs(h)});
			console.log(currentCost)
			if(currentCost <= budget){
				_this.cost = currentCost;
				block.remove();
				block = new paper.Path.Rectangle(firstPoint, {width: w, height: h});
				block.fillColor = '#000';
			}
		}

		paper.view.onMouseUp = function(event) {
			_this._InteractionFacadeImpl.putRect({x: firstPoint.x, y: firstPoint.y, width: Math.abs(w), height: Math.abs(h)});
		}
    }


    logout(){
		this._AuthService.logout();
	}
}
