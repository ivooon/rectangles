import {GameContext} from "../context/GameContext";
import {RectDto} from "../api/dto/RectDto";
import {Block} from "../models/Block";
import {PlayerUpdateListener} from "../api/listener/PlayerUpdateListener";
import {MapUpdateListener} from "../api/listener/MapUpdateListener";
import {GameStatusListener} from "../api/listener/GameStatusListener";
import {Game} from "../models/Game";
import {GameStatusEnum} from "../api/dto/GameStatusEnum";

export class GameService {

  public playing: boolean = false;
  public playerUpdateListeners: Array<PlayerUpdateListener> = [];
  public mapUpdateListeners: Array<MapUpdateListener> = [];
  public gameStatusListeners: Array<GameStatusListener> = [];


  public getCost(rect: RectDto): number {
    return 0;
  }

  public putRect(rect: RectDto) {
    return $.post("/assets/php/CreateBlock.php",
      {
        gameId: GameContext.entityManager.game.id,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      });
  }

  public getGame(): Game {
    return GameContext.entityManager.game;
  }

  public addPlayerUpdateListener(playerUpdateListener: PlayerUpdateListener): void {
    this.playerUpdateListeners.push(playerUpdateListener);
  }

  public addMapUpdateListener(mapUpdateListener: MapUpdateListener): void {
    this.mapUpdateListeners.push(mapUpdateListener);
  }

  public addGameStatusListener(gameStatusListener: GameStatusListener): void {
    this.gameStatusListeners.push(gameStatusListener);
  }

  public startGame(): void {
    $.post("/assets/php/StartGame.php").then(
      data => {
        this.playing = true;
        let game: Game = data as Game;
        console.log(game);
        game.status = "PENDING";
        GameContext.entityManager.game = game;
        //start listening
        this.listenGameStatus();
        this.listenGameUpdate();
      }
    )
  }

  private listenGameStatus() {
    if (GameContext.gameService.playing) {
      console.log("listenGameStatus started");
      let game: Game = GameContext.entityManager.game;
      $.ajax({
        type: "GET",
        url: "/assets/php/GameStatusHook.php",
        data: {
          gameId: game.id,
          status: game.status
        },
        dataType: 'json',
        success: function (data) {
          try {
            let game: Game = GameContext.entityManager.game;
            game.status = data.gameStatus;
            if (game.status == "FINISHED") {
              GameContext.gameService.playing = false;
            }
            console.log("Game status Updated: " + game.status);
            for (let listener of GameContext.gameService.gameStatusListeners) {
              listener.onGameStatusUpdate(game.status);
            }
          } catch (error) {
            console.log("listenGameStatus timeout. Triggering again.");
          }
          console.log("listenGameStatus triggered");
          GameContext.gameService.listenGameStatus();
        },
        error: function (xhr, textStatus, errorThrown) {
          console.log("listenGameStatus timeout. Triggering again.");
          GameContext.gameService.listenGameStatus();
        }
      });
    }
  }

  private listenGameUpdate() {
    if (GameContext.gameService.playing) {
      console.log("listenGameUpdate started");
      let game: Game = GameContext.entityManager.game;
      $.ajax({
        type: "GET",
        url: "/assets/php/GameUpdateHook.php",
        data: {
          gameId: game.id,
          lastUpdateTime: game.lastUpdate
        },
        dataType: 'json',
        success: function (data) {
          try {
            let game: Game = data as Game;
            GameContext.entityManager.game = game;
            console.log("Game Updated");
            for (let listener of GameContext.gameService.mapUpdateListeners) {
              listener.onMapUpdate(game);
            }
          } catch (error) {
            console.log(error + "listenGameUpdate timeout. Triggering again.");
          }
          console.log("listenGameUpdate triggered");
          GameContext.gameService.listenGameUpdate();
        },
        error: function (xhr, textStatus, errorThrown) {
          console.log("listenGameUpdate timeout. Triggering again.");
          GameContext.gameService.listenGameUpdate();
        }
      });
    }
  }
}
