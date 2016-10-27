class InteractionFacadeImpl implements InteractionFacade {
    getCost(rect: RectDto): number {
		return 0;
    }
	putRect(rect: RectDto): boolean {
		return false;
	}
	getMap(): Array<Block> {
		return null;
	}
	addPlayerUpdateListener(playerUpdateListener: PlayerUpdateListener): void {

	}
	addMapUpdateListener(mapUpdateListener: MapUpdateListener): void {

	}
	addGameStatusListener(gameStatusListener: GameStatusListener): void {

	}
	login(username: string, password: string): boolean {
		return false;
	}
	startGame(): void {

	}
}