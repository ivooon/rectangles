import {RectDto} from "../dto/RectDto";
import {Game} from "../../models/Game";
import {MapUpdateListener} from "../listener/MapUpdateListener";
import {PlayerUpdateListener} from "../listener/PlayerUpdateListener";
import {GameStatusListener} from "../listener/GameStatusListener";
export interface InteractionFacade {

	getCost(rect: RectDto): number;
	putRect(rect: RectDto);
	getMap(): Game;
	addPlayerUpdateListener(playerUpdateListener: PlayerUpdateListener): void;
	addMapUpdateListener(mapUpdateListener: MapUpdateListener): void;
	addGameStatusListener(gameStatusListener: GameStatusListener): void;
	login(username: string, password: string);
	register(username: string, password: string);
	startGame(): void;

}
