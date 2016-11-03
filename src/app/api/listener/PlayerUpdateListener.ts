import {Player} from "../../models/Player";
export interface PlayerUpdateListener {

	onPlayerUpdate(player: Player): void;

}