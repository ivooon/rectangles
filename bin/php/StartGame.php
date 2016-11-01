<?php
require_once 'dao/DatabaseConnector.php';
require_once 'LoggedUserService.php';
require_once 'dao/GameDao.php';
require_once 'dao/BlockDao.php';
require_once 'dao/GameParametersDao.php';
require_once 'dao/PlayerDao.php';

    $databaseConnector = new DataBaseConnector();
    $gameParametersDao = new GameParametersDao();
    $pdo = $databaseConnector -> connectToDatabase();
    $gameParametersDto = $gameParametersDao -> findLastParametersSettingsAsDto($pdo);

    $result;
    $now = time();

    $loggedUserId = LoggedUserService::getLoggedUserId();

    if($loggedUserId != null) {
        $pdo->beginTransaction();
        try {

            $gameDao = new GameDao();
            $blockDao = new BlockDao();
            $playerDao = new PlayerDao();
            $game = $gameDao -> findPlayerActiveGameAsDto($pdo, $loggedUserId);

            if (is_null($game)) {
                //search or create game
                $game = $gameDao -> findAvailableGameAsDto($pdo);
                if (is_null($game)) {
                    //create new game
                    $sql = "INSERT INTO GAME (GAME_PARAMETERS_ID) VALUES (?)";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute(array(
                            $gameParametersDto -> id
                        )
                    );
                    $gameId = $pdo -> lastInsertId();

                    $sql = "INSERT INTO PLAYER (USER_ID, GAME_ID, MONEY, SCORE, LAST_UPDATE, COLOR)
                            VALUES (?, ?, 1000, 0, ?, 'RED')";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute(array(
                            $loggedUserId,
                            $gameId,
                            $now
                        )
                    );
                    $players = $playerDao -> findPlayersByGameAsDto($pdo, $gameId);
                    $game = $gameDao -> findGameByIdAsDto($pdo, $gameId);
                } else {
                    //join to game
                    $gameId = $game -> id;

                    $sql = "INSERT INTO PLAYER (USER_ID, GAME_ID, MONEY, SCORE, LAST_UPDATE, COLOR)
                            VALUES (?, ?, 1000, 0, ?, 'RED')";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute(array(
                            $loggedUserId,
                            $gameId,
                            $now
                        )
                    );

                    $players = $playerDao -> findPlayersByGameAsDto($pdo, $gameId);
                    if(count($players) >= $gameParametersDto -> numberOfPlayers){
                        //start game
                        $sql = "UPDATE GAME SET START_TIME = ?, LAST_UPDATE = ? WHERE ID = ?";
                        $stmt = $pdo->prepare($sql);
                        $stmt->execute(array(
                                $now,
                                $now,
                                $gameId
                            )
                        );
                        $game -> lastUpdate = $now;
                        $game -> startTime = $now;
                    }

                }
                $players = $playerDao -> findPlayersByGameAsDto($pdo, $game -> id);
                $game -> players = $players;
                $game -> gameParameters = $gameParametersDto;
                $result = $game;
            } else {
                $players = $playerDao -> findPlayersByGameAsDto($pdo, $game -> id);
                $game -> players = $players;
                $game -> gameParameters = $gameParametersDto;
                $result = $game;
                //game is already in progress
            }
            $pdo->commit();
            foreach ($players as &$player){
                $player -> blocks = $blockDao -> findBlocksByPlayerAsDto($pdo, $player -> id);
            }

        } catch (Exception $e) {
            echo $e;
            $result = ['status' => 'FAIL'];
            http_response_code(500);
            $pdo->rollBack();
        }
    } else {
        $result = ['status' => 'FAIL', 'reason' => 'UNAUTHORIZED'];
        http_response_code(401);
    }

    header('Content-type: application/json');
    echo json_encode($result);
?>