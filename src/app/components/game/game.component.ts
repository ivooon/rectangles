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
	activePlayer = null;
	color = null;
	cost = 0;
	canvasW = null;
	canvasH = null;
	scale = 1;
	block;
	colors = ['#6DD6DA', '#AE8CA3', '#817F82', '#A2ABB5', '#95D9DA'];
	canvas = null;
	context = null;

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
		this.activePlayer = game.activePlayerId;
		this.player = _.findWhere(game.players, {id: this.activePlayer});
		this.color = this.getPlayerColor(game.activePlayerId);

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
    	let wH = window.innerHeight * 0.7;
    	let wW = window.innerWidth;

    	this.canvasH = wH - (wH%nww);
    	this.scale = Math.floor(this.canvasH/maxH);
    	this.canvasW = this.scale * maxW;
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

    nwd(a, b) {
    	let c;
	    while(b != 0)
	    {
	        c = a % b;
	        a = b;
	        b = c;
	    }
	    return a; 
    }

    getPlayerColor(playerId) {
    	let index = _.indexOf(this.game.players, _.findWhere(this.game.players, {id: playerId}));
    	return this.colors[index];
    }

    refreshView() {
    	let _this = this;

    	if(this.context) {
    		this.context.clearRect(0, 0, $('#canvasWrapper').width(), $('#canvasWrapper').height());

	    	_.each(this.game.players, function(player) {
	    		player.color = _this.getPlayerColor(player.id);
	    		_.each(player.blocks, function(block) {
	    			_this.drawRect(block, player.color);
	    		})
	    	});
	    }
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
	    	var elements = _.findWhere(_this.game.players, {id: _this.activePlayer}).blocks;
			var box = new Box()
	      	box.x = Math.round((e.x - $('#canvasWrapper').offset().left) / _this.scale);
	      	box.y = Math.round((e.y - $('#canvasWrapper').offset().top) / _this.scale);
			box.width = 0;
	      	box.height = 0;
	      	elements.push(box)

			_this.canvas.onmousemove = function(e) {
				let w = Math.round(e.x - $('#canvasWrapper').offset().left) - (box.x * _this.scale),
				h = Math.round(e.y - $('#canvasWrapper').offset().top) - (box.y * _this.scale),
				w2 = w / _this.scale,
				h2 = h / _this.scale;
				_this.cost = _this._InteractionFacadeImpl.getCost({x: box.x, y: box.y, width: Math.abs(w2), height: Math.abs(h2)});

				if(_this.cost <= _this.player.money){
		      		box.width = w2;
		      		box.height = h2;
		      		if (e.buttons == 0){
			          	_this.canvas.onmousemove = _this.canvas.onmouseup = function(){};
			          	elements.pop()
			        }
		      		_this.refreshView();
	      		}
	      	}
	      
	      	_this.canvas.onmouseup = function(e){
	      		_this.createBlock(box);
				_this.refreshView();
				_this.cost = 0;
	      		_this.canvas.onmousemove = _this.canvas.onmouseup = function(){};
	      	}
	    }
    }

    createBlock(box) {
    	let w = box.width;
    	let h = box.height;
    	let x = w < 0 ? box.x + w : box.x;
    	let y = h < 0 ? box.y + h : box.y; 
    	this._InteractionFacadeImpl.putRect({x: Math.abs(x), y: Math.abs(y), width: w, height: h});
    }
}
