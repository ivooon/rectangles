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
		this.isAuth = false;
	}

    startGame():void {
     	this._InteractionFacadeImpl.startGame();
        this.draw();
    }

    draw():void {

    	var canvas = document.getElementById("myCanvas");
	    paper.setup(canvas);
	 	var tool = new paper.Tool();
	 	var firstPoint, block, w, h;

	    paper.view.onMouseDown = function(event) {
	    	firstPoint = event.point;
	    	block = new paper.Path.Rectangle(firstPoint, {width: 1, height: 1});
	    	block.fillColor = '#000';
		}
		
		tool.onMouseDrag = function(event) {
			h = event.point.y - firstPoint.y;
			w = event.point.x - firstPoint.x;

			block.remove();
			block = new paper.Path.Rectangle(firstPoint, {width: w, height: h});
			block.fillColor = '#000';
		}

		paper.view.onMouseUp = function(event) {
			// TODO save block
		}
    }

}
