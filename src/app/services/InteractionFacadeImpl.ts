import {InteractionFacade} from "../api/service/InteractionFacade";
import {RectDto} from "../api/dto/RectDto";
import {Block} from "../models/Block";
import {PlayerUpdateListener} from "../api/listener/PlayerUpdateListener";
import {MapUpdateListener} from "../api/listener/MapUpdateListener";
import {GameStatusListener} from "../api/listener/GameStatusListener";

export class InteractionFacadeImpl implements InteractionFacade {
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
    $.post("/assets/php/StartGame.php");
	}
}
