import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

import { Game } from '../models/Game';
import { Player } from '../models/Player';

import {InteractionFacadeImpl} from "../services/InteractionFacadeImpl";

declare var paper:any;

@Component({
  selector: 'initializator',
  templateUrl: 'initializator.component.html',
  providers: [CookieService]
})


export class InitializatorComponent {
	isAuth = false;
	login: any = {};
	register: any = {};
	cost = 0;

	constructor(private _cookieService:CookieService, private _InteractionFacadeImpl:InteractionFacadeImpl) {}

	ngOnInit() {
		let user = localStorage.getItem('currentUser');
		if(user) {
			this.isAuth = true;
			//TODO renew session
		}
	}

	loginFn():void {
		this._InteractionFacadeImpl.login(this.login.username, this.login.password)
            .then(
                data => {
                	console.log(data)
                    localStorage.setItem('currentUser',  'costamostam');
                    this.isAuth = true;
                    this.login = {};
                }
            )
	}

	registerFn():void {
		this._InteractionFacadeImpl.register(this.register.username, this.register.password)
            .then(
                data => {
                	console.log(data)
                    localStorage.setItem('currentUser',  'costamostam');
                    this.isAuth = true;
                    this.register = {};
                }
            )
	}

	logout(){
		localStorage.removeItem('currentUser');
    	this._InteractionFacadeImpl.stopGame();
		this.isAuth = false;
	}

    startGame():void {
     	this._InteractionFacadeImpl.startGame();
        this.draw();
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
			h = Math.abs(event.point.y - firstPoint.y);
			w = Math.abs(event.point.x - firstPoint.x);

			currentCost = _this._InteractionFacadeImpl.getCost({x: firstPoint.x, y: firstPoint.y, width: w, height: h});
			if(currentCost <= budget){
				_this.cost = currentCost;
				block.remove();
				block = new paper.Path.Rectangle(firstPoint, {width: w, height: h});
				block.fillColor = '#000';
			}
		}

		paper.view.onMouseUp = function(event) {
			_this._InteractionFacadeImpl.putRect({x: firstPoint.x, y: firstPoint.y, width: w, height: h});
		}
    }

}
