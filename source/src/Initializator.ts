/**
 * Created by ByerN on 29.10.2016.
 */
import {Game} from "./model/Game";
import {Player} from "./model/Player";

class Initializator {
    helloWorld():void{
        console.log("Hello world");

        let game : Game = new Game(1, 1, null, 1, [new Player(1,1,1,1,1,"")]);

    }

}
new Initializator().helloWorld();