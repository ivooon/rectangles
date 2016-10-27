class Block {

	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public player: Player;

	constructor(
		x: number,
		y: number,
		width: number,
		height: number,
		player: Player = null) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.player = player;
	}
}