<?php
require_once "service/LoggedUserService.php";
require_once "dao/DatabaseConnector.php";
require_once "dao/GameParametersDao.php";
require_once "./dao/GameDao.php";
require_once "./dao/PlayerDao.php";
require_once "service/GameStatusService.php";
require_once "service/GeometricService.php";
require_once "service/GameService.php";
require_once "dto/BlockDto.php";

$loggedUserId = LoggedUserService::getLoggedUserId();
if ($loggedUserId != null) {
    $databaseConnector = new DataBaseConnector();
    $pdo = $databaseConnector->connectToDatabase();
    $pdo->beginTransaction();
    try {
        $gameStatusService = new GameStatusService();
        $playerDao = new PlayerDao();
        $geometricService = new GeometricService();
        $gameService = new GameService();
        $json = file_get_contents('php://input');
        if ($json != null) {
            $obj = json_decode($json, true);

            $gameId = $obj["gameId"];
            $block = new BlockDto();
            $block->x = $obj["x"];
            $block->y = $obj["y"];
            $block->width = $obj["width"];
            $block->height = $obj["height"];


            $playerId = $playerDao->findPlayerIdByGameAndUserId($pdo, $gameId, $loggedUserId);
            $game = $gameService->getGame($pdo, $gameId);

            if ($gameStatusService->checkStatus($pdo, $gameId, $game->gameParameters) == "STARTED") {
                if ($geometricService->update($pdo, $block, $game, $playerId)) {
                    $result = ['status' => 'OK'];
                } else {
                    $result = ['status' => 'FAIL'];
                    http_response_code(400);
                }
            } else {
                $result = ['status' => 'FAIL'];
                http_response_code(404);
            }
            $pdo->commit();
        } else {
            $result = ['status' => 'FAIL'];
            http_response_code(400);
        }
    } catch (Exception $e) {
        $result = ['status' => 'FAIL'];
        http_response_code(500);
        $pdo->rollBack();
    }

} else {
    $result = ['status' => 'FAIL'];
    http_response_code(401);
}

header('Content-type: application/json');
echo json_encode($result);
?>