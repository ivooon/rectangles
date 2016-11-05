import {Game} from "../../models/Game";
export interface MapUpdateListener {

	onMapUpdate(game: Game): void;

}
