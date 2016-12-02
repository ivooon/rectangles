import { Component } from '@angular/core';

import { Game } from '../../models/Game';
import { Player } from '../../models/Player';
import { InteractionFacadeImpl } from "../../services/InteractionFacadeImpl";
import { GameStatusListener } from '../../api/listener/GameStatusListener';
import { MapUpdateListener } from '../../api/listener/MapUpdateListener';
import { PlayerUpdateListener } from '../../api/listener/PlayerUpdateListener';

import { WindowService } from '../../services/WindowService';

declare var paper:any;
declare var _:any;

@Component({
	selector: 'game-component',
  	templateUrl: 'game.component.html',
  	providers: []
})

// TODO clean up, loader

export class GameComponent implements GameStatusListener, MapUpdateListener, PlayerUpdateListener{
	gameStatus = null;
	game = null;
	player = null;
	color = null;
	cost = 0;
	canvasW = null;
	canvasH = null;
	scale = 1;
	block;
	colors = ['#6DD6DA', '#AE8CA3', '#817F82', '#A2ABB5', '#95D9DA'];

	constructor(private _InteractionFacadeImpl:InteractionFacadeImpl, private window: WindowService) {}

	onGameStatusUpdate(gameStatus: String): void {
		if(this.gameStatus === gameStatus) {
			return;
		}
		this.gameStatus = gameStatus;

		switch(gameStatus){
			case 'PENDING': 
				break;
			case 'STARTED':
				this.setCanvasParams();
				setTimeout(() => { 
					this.draw();
				}, 1000);
				break;
			case 'FINISHED':
				break;
			default:
				break;
		}
	}

	onMapUpdate(game: Game): void {
		this.game = game;
		this.color = this.getPlayerColor(game.activePlayerId)
		
		this.refreshView();
	}

	onPlayerUpdate(player: Player): void {
		this.player = player;
		console.log('onPlayerUpdate', player)
	}

	startGame():void {
     	this._InteractionFacadeImpl.startGame();
        this._InteractionFacadeImpl.addGameStatusListener(this);
        this._InteractionFacadeImpl.addMapUpdateListener(this);
        this._InteractionFacadeImpl.addPlayerUpdateListener(this);
    }

    setCanvasParams() {
    	let gameParams = this.game.gameParameters;
    	let maxH = gameParams.maxHeight;
    	let maxW = gameParams.maxWidth;
    	let nww = this.nww(maxW, maxH);
    	let window = this.window.nativeWindow;
    	let wH = window.innerHeight * 0.75;
    	let wW = window.innerWidth;

    	this.scale = Math.floor((wW - (wW%nww))/maxW);
    	this.canvasW = this.scale * maxW;
    	this.canvasH = this.scale * maxH;
    }

    refreshView() {
    	let _this = this;

    	if(paper.project) {
	    	paper.project.activeLayer.removeChildren();
	    	paper.project.clear()

	    	_.each(this.game.players, function(player) {
	    		player.color = _this.getPlayerColor(player.id);
	    		_.each(player.blocks, function(block) {
	    			_this.drawRect(block, player.color);
	    		})
	    	});
	    }
    }

    getPlayerColor(playerId) {
    	let index = _.indexOf(this.game.players, _.findWhere(this.game.players, {id: playerId}));
    	return this.colors[index];
    }

    drawRect(block, color) {
    	this.block = new paper.Path.Rectangle({
		    point: [block.x*this.scale, block.y*this.scale],
		    size: [block.width*this.scale, block.height*this.scale],
		    fillColor: color
		});
    }


    nww(a, b) {
    	let pom;
    	let ab = a*b;

    	while(a !== b) {
    		if(a > b) { a -= b; }
    		else 	  { b -= a; }
    	}

	    return ab/a;
    }

    draw():void {
    	var _this = this;
    	var canvas = document.getElementById("myCanvas");

	    paper.setup(canvas);
	 	var tool = new paper.Tool();
	 	var firstPoint, w, h, w2, h2, currentCost, budget = 200;

	    paper.view.onMouseDown = function(event) {
	    	firstPoint = event.point;
	    	_this.block = new paper.Path.Rectangle({
			    point: [firstPoint.x, firstPoint.y],
			    size: [1,1],
			    fillColor: _this.color
			});
		}
		
		tool.onMouseDrag = function(event) {
			h = event.point.y - firstPoint.y;
			w = event.point.x - firstPoint.x;
			h2 = Math.abs(Math.floor(h / _this.scale));
			w2 = Math.abs(Math.floor(w / _this.scale));

			currentCost = _this._InteractionFacadeImpl.getCost({x: firstPoint.x, y: firstPoint.y, width: w2, height: h2});
			if(currentCost <= budget){
				_this.cost = currentCost;
				_this.block.remove();
				_this.block = new paper.Path.Rectangle({
				    point: [firstPoint.x, firstPoint.y],
				    size: [w, h],
				    fillColor: _this.color
				});
			}
		}

		paper.view.onMouseUp = function(event) {
			if(w2 >= _this.scale && h2 >= _this.scale) {
				_this._InteractionFacadeImpl.putRect({x: firstPoint.x/_this.scale, y: firstPoint.y/_this.scale, width: w2, height: h2});
			} else {
				_this.block.remove();
			}
		}

		this.refreshView();
    }
}