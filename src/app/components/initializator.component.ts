import { Component } from '@angular/core';

import {Game} from '../models/Game';
import {Player} from '../models/Player';
declare var paper:any; 


@Component({
  selector: 'initializator',
  templateUrl: 'initializator.component.html'
})


export class InitializatorComponent {
	constructor() { 
		
	}

    helloWorld():void {

        console.log('Hello world');

        let game : Game = new Game(1, 1, null, 1, [new Player(1, 1, 1, 1, 1, '')]);

        console.log(game); 

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
