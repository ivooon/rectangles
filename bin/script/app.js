function helloWorld() {
    console.log("Hello world");
    var game = new Game(1, 1, null, 1, [new Player(1, 1, 1, 1, 1, "")]);
}
var Block = (function () {
    function Block(x, y, width, height, player) {
        if (player === void 0) { player = null; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.player = player;
    }
    return Block;
}());
var Game = (function () {
    function Game(startTime, duration, gameParameters, lastUpdateRevision, players) {
        this.players = new Array();
        this.startTime = startTime;
        this.duration = duration;
        this.gameParameters = gameParameters;
        this.lastUpdateRevision = lastUpdateRevision;
        this.players = players;
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            player.game = this;
        }
    }
    return Game;
}());
var GameParameters = (function () {
    function GameParameters(incomeScale, costScale) {
        this.incomeScale = incomeScale;
        this.costScale = costScale;
    }
    return GameParameters;
}());
var Player = (function () {
    function Player(id, money, score, lastUpdate, color, nick, blocks) {
        if (blocks === void 0) { blocks = new Array(); }
        this.id = id;
        this.money = money;
        this.score = score;
        this.lastUpdate = lastUpdate;
        this.color = color;
        this.nick = nick;
        this.blocks = blocks;
        for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
            var block = blocks_1[_i];
            block.player = this;
        }
    }
    return Player;
}());
var World = (function () {
    function World() {
    }
    return World;
}());
//# sourceMappingURL=app.js.map