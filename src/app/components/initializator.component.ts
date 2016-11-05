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
		var points = 25;
		var length = 35;
		var path = new paper.Path({
			strokeColor: '#E4141B',
			strokeWidth: 20,
			strokeCap: 'round'
		});

		var start = paper.view.center.divide([10, 1]);
		for (var i = 0; i < points; i++)
			path.add(start.add(new paper.Point(i * length, 0)));

		paper.view.onMouseMove = function(event)  {
			path.firstSegment.point = event.point;
			for (var i = 0; i < points - 1; i++) {
				var segment = path.segments[i];
				var nextSegment = segment.next;
				var vector = segment.point.subtract(nextSegment.point);
				vector.length = length;
				nextSegment.point = segment.point.subtract(vector);
			}
			path.smooth({ type: 'continuous' });
		};

		paper.view.onMouseDown = function(event) {
			path.fullySelected = true;
			path.strokeColor = '#e08285';
		}

		paper.view.onMouseUp = function(event) {
			path.fullySelected = false;
			path.strokeColor = '#e4141b';
		}
    }

}
