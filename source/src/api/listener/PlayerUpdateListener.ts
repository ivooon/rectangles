import {Player} from "../../model/Player";
export interface PlayerUpdateListener {

	onPlayerUpdate(player: Player): void;

}