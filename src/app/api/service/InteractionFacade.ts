import {RectDto} from "../dto/RectDto";
import {Block} from "../../model/Block";
import {MapUpdateListener} from "../listener/MapUpdateListener";
import {PlayerUpdateListener} from "../listener/PlayerUpdateListener";
import {GameStatusListener} from "../listener/GameStatusListener";
export interface InteractionFacade {

	getCost(rect: RectDto): number;
	putRect(rect: RectDto): boolean;
	getMap(): Array<Block>;
	addPlayerUpdateListener(playerUpdateListener: PlayerUpdateListener): void;
	addMapUpdateListener(mapUpdateListener: MapUpdateListener): void;
	addGameStatusListener(gameStatusListener: GameStatusListener): void;
	login(username: string, password: string): boolean;
	register(username: string, password: string): boolean;
	startGame(): void;

}
