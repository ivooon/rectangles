class Player {
	public id : number;
	public money : number;
	public score : number;
	public lastUpdate : number;
	public color : number;
	public nick : string;
	public game : Game;
	public blocks : Array<Block>;

	constructor(id : number,
				money : number,
				score : number,
				lastUpdate : number,
				color : number,
				nick : string,
				blocks : Array<Block> = new Array<Block>()){
		this.id = id;
		this.money = money;
		this.score = score;
		this.lastUpdate = lastUpdate;
		this.color = color;
		this.nick = nick;
		this.blocks = blocks;
		for(let block of blocks){
			block.player = this;
		} 
	}
}