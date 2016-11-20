import {Player} from "./Player";
import {RectDto} from "../api/dto/RectDto";
export class Block {

	public x: number;
	public y: number;
	public width: number;
	public height: number;
  public id: number;
	constructor(
		x: number,
		y: number,
		width: number,
		height: number,
    id: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
    this.id = id;
	}


	public toDto(): RectDto{
    return new RectDto(this.x, this.y, this.width, this.height);
  }
}
