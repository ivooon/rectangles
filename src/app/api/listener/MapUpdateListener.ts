import {Block} from "../../models/Block";
export interface MapUpdateListener {

	onMapUpdate(blocks: Array<Block>): void;

}