import {Game} from "../models/Game";
import {Block} from "../models/Block";
export class EntityManager {
	public game: Game;

	getCurrentPlayerBlocks() : Array<Block>{
		return this.getPlayerBlocks(this.game.activePlayerId);
	}

	getPlayerBlocks(playerId: number) : Array<Block>{
		return this.getBlocks(playerId, true);
	}

	getOtherPlayersBlocks(playerId: number) : Array<Block>{
		return this.getBlocks(playerId, false);
	}

	private getBlocks(playerId: number, equal: boolean){
		let result : Array<Block> = new Array<Block>();

		for(let gamePlayer of this.game.players){
			if(equal == (playerId == gamePlayer.id)){
				for(let block of gamePlayer.blocks){
					result.push(block);
				}
			}
		}

		return result;
	}
}
