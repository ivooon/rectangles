import { Component, Input } from '@angular/core';


@Component({
  selector: 'score-table',
  inputs: ['players', 'gameOver', 'isWinner'],
  templateUrl: 'scoreTable.component.html',
  providers: []
})


export class ScoreTableComponent{

	constructor() {}

}
