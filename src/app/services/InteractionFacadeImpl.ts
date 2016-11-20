import {InteractionFacade} from "../api/service/InteractionFacade";
import {RectDto} from "../api/dto/RectDto";
import {Block} from "../models/Block";
import {PlayerUpdateListener} from "../api/listener/PlayerUpdateListener";
import {MapUpdateListener} from "../api/listener/MapUpdateListener";
import {GameStatusListener} from "../api/listener/GameStatusListener";
import {Game} from "../models/Game";
import {GameContext} from "../context/GameContext";

export class InteractionFacadeImpl implements InteractionFacade {

  getCost(rect: RectDto): number {
		return GameContext.gameService.getCost(rect);
  }

	putRect(rect: RectDto){
    return GameContext.gameService.putRect(rect);
	}

	getMap(): Game {
    return GameContext.gameService.getGame();
	}

	addPlayerUpdateListener(playerUpdateListener: PlayerUpdateListener): void {
    return GameContext.gameService.addPlayerUpdateListener(playerUpdateListener);
	}
	addMapUpdateListener(mapUpdateListener: MapUpdateListener): void {
    return GameContext.gameService.addMapUpdateListener(mapUpdateListener);
  }
	addGameStatusListener(gameStatusListener: GameStatusListener): void {
    return GameContext.gameService.addGameStatusListener(gameStatusListener);
  }
	register(username: string, password: string) {
    return $.post("/assets/php/Register.php",
      {
        username : username,
        password : password
      }
    );
	}
	login(username: string, password: string) {
    return $.post("/assets/php/Login.php",
      {
        username : username,
        password : password
      }
    );
	}
	startGame(): void {
    GameContext.gameService.startGame();
  }

  public stopGame(): void {
    GameContext.gameService.playing = false;
  }
}
