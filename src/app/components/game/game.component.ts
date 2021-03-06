import { Component, ViewChild } from '@angular/core';

import { Game } from '../../models/Game';
import { Player } from '../../models/Player';
import { InteractionFacadeImpl } from "../../services/InteractionFacadeImpl";
import { GameStatusListener } from '../../api/listener/GameStatusListener';
import { MapUpdateListener } from '../../api/listener/MapUpdateListener';
import { PlayerUpdateListener } from '../../api/listener/PlayerUpdateListener';

import { AuthService } from '../../services/AuthService';
import { WindowService } from '../../services/WindowService';

import { ScoreTableComponent } from './scoreTable.component';

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
	// colors = ['#6DD6DA', '#AE8CA3', '#817F82', '#A2ABB5', '#95D9DA'];
	colors = ['#337BB7', '#FFCF3A', '#FFAC3A', '#4442C2'];
	canvas = null;
	context = null;
	timeLeft = 100;
	elements = [];
	isWinner = null;

	@ViewChild(GameComponent) 
	private _GameComponent: GameComponent;

	constructor(private _InteractionFacadeImpl:InteractionFacadeImpl, private _AuthService:AuthService, private window: WindowService) {}

	onGameStatusUpdate(gameStatus: String): void {
		if(this.gameStatus === gameStatus) {
			return;
		}
		this.gameStatus = gameStatus;

		switch(gameStatus){

			case 'PENDING':
				break;

			case 'STARTED':
				this.afterGameStart();
				break;

			case 'FINISHED':
				break;

			default:
				break;
		}
	}

	onMapUpdate(game: Game): void {
		this.game = game;
		this.setPlayersColors();
		let activePlayerId = game.activePlayerId;
		this.player = _.findWhere(game.players, {id: activePlayerId});
		this.color = this.getPlayerColor(activePlayerId);
		
		this.refreshView();
	}

	onPlayerUpdate(player: Player): void {
		console.log('onPlayerUpdate', player)
	}

	afterGameStart() {
		this.setCanvasParams();

		setTimeout(() => {
			this.timeCounter();
			this.draw();
			this.refreshView();

		}, 1000);
	}

	endGame() {
		this._InteractionFacadeImpl.stopGame();
		this.gameStatus = 'FINISHED';

		let winnerId = _.max(this.game.players, function(player){ return player.score; }).id;
		this.isWinner = winnerId === this.player.id;
	}

	timeCounter() {
		let currentTime = Math.round(new Date().getTime()/1000);
		let durationTime = currentTime - this.game.startTime;
		this.timeLeft = this.game.gameParameters.duration - durationTime;

		if(!this.timeLeft){
			this.endGame();
			return;
		}

		setTimeout(() => {
			this.timeCounter();
		}, 1000);
	}

	startGame():void {
		this.elements = [];
     	this._InteractionFacadeImpl.startGame();
        this._InteractionFacadeImpl.addGameStatusListener(this);
        this._InteractionFacadeImpl.addMapUpdateListener(this);
        this._InteractionFacadeImpl.addPlayerUpdateListener(this);
    }

    setCanvasParams() {
    	let gameParams = this.game.gameParameters;
    	let maxH = gameParams.maxHeight;
    	let maxW = gameParams.maxWidth;
    	let window = this.window.nativeWindow;
    	let wH = window.innerHeight * 0.7;
    	let wW = window.innerWidth;

    	let scale = Math.floor(wH/maxH);
    	if((scale * maxW) > wW) {
    		scale = Math.floor(wW/maxW);
    	}
    	this.scale = scale;
    	this.canvasH = scale*maxH;
    	this.canvasW = scale*maxW;
    }

    setPlayersColors() {
    	let _this = this;
    	_.each(this.game.players, function(player) {
		    player.color = _this.getPlayerColor(player.id);
	    });
    }

    getPlayerColor(playerId) {
    	let index = _.indexOf(this.game.players, _.findWhere(this.game.players, {id: playerId}));
    	return this.colors[index];
    }

    refreshView() {
    	let _this = this;

    	if(this.context) {
    		this.context.clearRect(0, 0, $('#canvasWrapper').width(), $('#canvasWrapper').height());
    		let players = _.without(this.game.players, this.player)
	    	_.each(players, function(player) {
		    	_this.drawBlocks(player.blocks, player.color);
	    	});
	    	this.drawBlocks(this.player.blocks, this.color);
	    	if(this.elements.length) {
	    		this.drawBlocks(this.elements, this.color)
	    	}
	    }
    }

    drawBlocks(blocks, color) {
    	let _this = this;
    	_.each(blocks, function(block) {
			_this.drawRect(block, color);
		})
    }
   
    drawRect(block, color) {
    	let scale = this.scale;
    	this.context.beginPath();
        this.context.fillStyle = color;
        this.context.fillRect(block.x * scale, block.y * scale, block.width * scale, block.height * scale);
    }

    draw():void {
    	var _this = this;

		function Box() {
			this.x = 0;
			this.y = 0;
			this.width = 0;
			this.height = 0;
		}

		_this.canvas 	 = <HTMLCanvasElement> document.getElementById("myCanvas");
	    _this.context    =  _this.canvas.getContext("2d");
			
	    _this.canvas.onmousedown = function(e){
			var box = new Box()
	      	box.x = Math.round((e.x - $('#canvasWrapper').offset().left) / _this.scale);
	      	box.y = Math.round((e.y - $('#canvasWrapper').offset().top) / _this.scale);
			box.width = 0;
	      	box.height = 0;
	      	_this.elements.push(box)

			_this.canvas.onmousemove = function(e) {
				let w = Math.round(e.x - $('#canvasWrapper').offset().left) - (box.x * _this.scale),
				h = Math.round(e.y - $('#canvasWrapper').offset().top) - (box.y * _this.scale),
				w2 = Math.round(w / _this.scale),
				h2 = Math.round(h / _this.scale);

				let res = _this.countCoordinates({width: w2, height: h2, x: box.x, y: box.y});
				_this.cost = _this._InteractionFacadeImpl.getCost({x: res.x, y: res.y, width: res.w, height: res.h});

				if(_this.cost <= _this.player.money){
		      		box.width  = w2;
		      		box.height = h2;

		      		if (e.buttons == 0){
			          	_this.canvas.onmousemove = _this.canvas.onmouseup = function(){};
			          	_this.elements.pop()
			        }
		      		_this.refreshView();
	      		}
	      	}
	      
	      	_this.canvas.onmouseup = function(e){
	      		_this.createBlock(box);
				_this.refreshView();
				_this.elements = [];
				_this.cost = 0;
	      		_this.canvas.onmousemove = _this.canvas.onmouseup = function(){};
	      	}
	    }
    }

    createBlock(box) {
    	let res = this.countCoordinates(box);
    	
    	this._InteractionFacadeImpl.putRect({x: res.x, y: res.y, width: res.w, height: res.h});
    }

    countCoordinates(box) {
    	let w = box.width;
    	let h = box.height;
    	let x = w < 0 ? box.x + w : box.x;
    	let y = h < 0 ? box.y + h : box.y; 
    	w = Math.abs(w);
    	h = Math.abs(h);
    	return {w:w,h:h,x:x,y:y};
    }

}
