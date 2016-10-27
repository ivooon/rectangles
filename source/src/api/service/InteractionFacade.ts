interface InteractionFacade {

	getCost(rect: RectDto): number;
	putRect(rect: RectDto): boolean;
	getMap(): Array<Block>;
	addPlayerUpdateListener(playerUpdateListener: PlayerUpdateListener): void;
	addMapUpdateListener(mapUpdateListener: MapUpdateListener): void;
	addGameStatusListener(gameStatusListener: GameStatusListener): void;
	login(username: string, password: string): boolean;
	startGame(): void;

}