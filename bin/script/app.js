System.register("api/dto/GameStatusEnum", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GameStatusEnum;
    return {
        setters:[],
        execute: function() {
            (function (GameStatusEnum) {
                GameStatusEnum[GameStatusEnum["IN_QUEUE"] = 0] = "IN_QUEUE";
                GameStatusEnum[GameStatusEnum["STARTED"] = 1] = "STARTED";
                GameStatusEnum[GameStatusEnum["FINISHED"] = 2] = "FINISHED";
            })(GameStatusEnum || (GameStatusEnum = {}));
            exports_1("GameStatusEnum", GameStatusEnum);
        }
    }
});
System.register("api/dto/GameStatusDto", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var GameStatusDto;
    return {
        setters:[],
        execute: function() {
            GameStatusDto = (function () {
                function GameStatusDto(gameStatusEnum) {
                    this.gameStatusEnum = gameStatusEnum;
                }
                return GameStatusDto;
            }());
            exports_2("GameStatusDto", GameStatusDto);
        }
    }
});
System.register("api/dto/RectDto", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var RectDto;
    return {
        setters:[],
        execute: function() {
            RectDto = (function () {
                function RectDto(x, y, width, height) {
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                }
                return RectDto;
            }());
            exports_3("RectDto", RectDto);
        }
    }
});
System.register("api/listener/GameStatusListener", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("model/GameParameters", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var GameParameters;
    return {
        setters:[],
        execute: function() {
            GameParameters = (function () {
                function GameParameters(incomeScale, costScale) {
                    this.incomeScale = incomeScale;
                    this.costScale = costScale;
                }
                return GameParameters;
            }());
            exports_5("GameParameters", GameParameters);
        }
    }
});
System.register("model/Game", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Game;
    return {
        setters:[],
        execute: function() {
            Game = (function () {
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
            exports_6("Game", Game);
        }
    }
});
System.register("model/Player", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Player;
    return {
        setters:[],
        execute: function() {
            Player = (function () {
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
            exports_7("Player", Player);
        }
    }
});
System.register("model/Block", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var Block;
    return {
        setters:[],
        execute: function() {
            Block = (function () {
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
            exports_8("Block", Block);
        }
    }
});
System.register("api/listener/MapUpdateListener", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("api/listener/PlayerUpdateListener", [], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("api/service/InteractionFacade", [], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("config/GameConstants", [], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var GameConstants;
    return {
        setters:[],
        execute: function() {
            GameConstants = (function () {
                function GameConstants() {
                }
                return GameConstants;
            }());
            exports_12("GameConstants", GameConstants);
        }
    }
});
System.register("model/World", [], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var World;
    return {
        setters:[],
        execute: function() {
            World = (function () {
                function World() {
                }
                return World;
            }());
            exports_13("World", World);
        }
    }
});
System.register("dao/EntityManager", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var EntityManager;
    return {
        setters:[],
        execute: function() {
            EntityManager = (function () {
                function EntityManager() {
                }
                EntityManager.prototype.getCurrentPlayerBlocks = function () {
                    return this.getPlayerBlocks(this.gameWorld.currentPlayer.id);
                };
                EntityManager.prototype.getPlayerBlocks = function (playerId) {
                    return this.getBlocks(playerId, true);
                };
                EntityManager.prototype.getOtherPlayersBlocks = function (playerId) {
                    return this.getBlocks(playerId, false);
                };
                EntityManager.prototype.getBlocks = function (playerId, equal) {
                    var result = new Array();
                    for (var _i = 0, _a = this.game.players; _i < _a.length; _i++) {
                        var gamePlayer = _a[_i];
                        if (equal == (playerId == gamePlayer.id)) {
                            for (var _b = 0, _c = gamePlayer.blocks; _b < _c.length; _b++) {
                                var block = _c[_b];
                                result.push(block);
                            }
                        }
                    }
                    return result;
                };
                return EntityManager;
            }());
            exports_14("EntityManager", EntityManager);
        }
    }
});
System.register("context/GameContext", ["dao/EntityManager"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var EntityManager_1;
    var GameContext;
    return {
        setters:[
            function (EntityManager_1_1) {
                EntityManager_1 = EntityManager_1_1;
            }],
        execute: function() {
            GameContext = (function () {
                function GameContext() {
                }
                GameContext.entityManager = new EntityManager_1.EntityManager();
                return GameContext;
            }());
            exports_15("GameContext", GameContext);
        }
    }
});
System.register("Initializator", ["model/Game", "model/Player"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var Game_1, Player_1;
    var Initializator;
    return {
        setters:[
            function (Game_1_1) {
                Game_1 = Game_1_1;
            },
            function (Player_1_1) {
                Player_1 = Player_1_1;
            }],
        execute: function() {
            Initializator = (function () {
                function Initializator() {
                }
                Initializator.prototype.helloWorld = function () {
                    console.log("Hello world");
                    var game = new Game_1.Game(1, 1, null, 1, [new Player_1.Player(1, 1, 1, 1, 1, "")]);
                };
                return Initializator;
            }());
            new Initializator().helloWorld();
        }
    }
});
System.register("service/InteractionFacadeImpl", [], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var InteractionFacadeImpl;
    return {
        setters:[],
        execute: function() {
            InteractionFacadeImpl = (function () {
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
            exports_17("InteractionFacadeImpl", InteractionFacadeImpl);
        }
    }
});
System.register("service/RectCalculationService", [], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var RectCalculationService;
    return {
        setters:[],
        execute: function() {
            RectCalculationService = (function () {
                function RectCalculationService() {
                }
                return RectCalculationService;
            }());
            exports_18("RectCalculationService", RectCalculationService);
        }
    }
});
//# sourceMappingURL=app.js.map