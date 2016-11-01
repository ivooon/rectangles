import {Player} from "./Player";
import {GameParameters} from "./GameParameters";

export class Game {
	public startTime: number;
	public duration: number;
	public gameParameters: GameParameters;
	public lastUpdateRevision: number;
	public players: Array<Player> = new Array<Player>();

	constructor(
		startTime: number,
		duration: number,
		gameParameters: GameParameters,
		lastUpdateRevision: number,
		players: Array<Player>) {
		this.startTime = startTime;
		this.duration = duration;
		this.gameParameters = gameParameters;
		this.lastUpdateRevision = lastUpdateRevision;
		this.players = players;
		for (let player of players) {
			player.game = this;
		}
	}
}