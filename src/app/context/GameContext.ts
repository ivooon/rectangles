import {EntityManager} from "../dao/EntityManager";
import {GameService} from "../services/GameService";

export class GameContext {
	public static entityManager: EntityManager = new EntityManager();
  	public static gameService: GameService = new GameService();
}
