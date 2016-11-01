import { Component } from '@angular/core';

import {Game} from '../models/Game';
import {Player} from '../models/Player';

@Component({
  selector: 'initializator',
  templateUrl: 'initializator.component.html'
})


export class InitializatorComponent {
	constructor() { }

    helloWorld():void {
        console.log('Hello world');

        let game : Game = new Game(1, 1, null, 1, [new Player(1, 1, 1, 1, 1, '')]);

        console.log(game);

    }

}
