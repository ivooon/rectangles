import {Block} from "../../model/Block";
export interface MapUpdateListener {

	onMapUpdate(blocks: Array<Block>): void;

}