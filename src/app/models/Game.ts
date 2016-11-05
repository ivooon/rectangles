import {Player} from "./Player";
import {GameParameters} from "./GameParameters";
import {GameStatusEnum} from "../api/dto/GameStatusEnum";

export class Game {
  public id: number;
  public startTime: number;
  public activePlayerId: number;
  public lastUpdate: number;
  public gameParameters: GameParameters;
	public players: Array<Player> = [];
  public status: String;
}
