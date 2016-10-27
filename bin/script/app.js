function helloWorld() {
    console.log("Hello world");
    var game = new Game(1, 1, null, 1, [new Player(1, 1, 1, 1, 1, "")]);
}
var GameStatusDto = (function () {
    function GameStatusDto(gameStatusEnum) {
        this.gameStatusEnum = gameStatusEnum;
    }
    return GameStatusDto;
}());
var GameStatusEnum;
(function (GameStatusEnum) {
    GameStatusEnum[GameStatusEnum["IN_QUEUE"] = 0] = "IN_QUEUE";
    GameStatusEnum[GameStatusEnum["STARTED"] = 1] = "STARTED";
    GameStatusEnum[GameStatusEnum["FINISHED"] = 2] = "FINISHED";
})(GameStatusEnum || (GameStatusEnum = {}));
var RectDto = (function () {
    function RectDto(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return RectDto;
}());
var GameConstants = (function () {
    function GameConstants() {
    }
    return GameConstants;
}());
var GameContext = (function () {
    function GameContext() {
    }
    GameContext.entityManager = new EntityManager();
    return GameContext;
}());
var EntityManager = (function () {
    function EntityManager() {
    }
    return EntityManager;
}());
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
var InteractionFacadeImpl = (function () {
    function InteractionFacadeImpl() {
    }
    InteractionFacadeImpl.prototype.getCost = function (rect) {
        return 0;
    };
    InteractionFacadeImpl.prototype.putRect = function (rect) {
        return false;
    };
    InteractionFacadeImpl.prototype.getMap = function () {
        return null;
    };
    InteractionFacadeImpl.prototype.addPlayerUpdateListener = function (playerUpdateListener) {
    };
    InteractionFacadeImpl.prototype.addMapUpdateListener = function (mapUpdateListener) {
    };
    InteractionFacadeImpl.prototype.addGameStatusListener = function (gameStatusListener) {
    };
    InteractionFacadeImpl.prototype.login = function (username, password) {
        return false;
    };
    InteractionFacadeImpl.prototype.startGame = function () {
    };
    return InteractionFacadeImpl;
}());
var RectCalculationService = (function () {
    function RectCalculationService() {
    }
    return RectCalculationService;
}());
//# sourceMappingURL=app.js.map