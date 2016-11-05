import {GameStatusDto} from "../dto/GameStatusDto";
export interface GameStatusListener {

	onGameStatusUpdate(gameStatus: String): void;

}
