<?php
require_once "service/LoggedUserService.php";
require_once "dao/DatabaseConnector.php";
require_once "./dao/GameDao.php";
require_once 'service/GameService.php';

$loggedUserId = LoggedUserService::getLoggedUserId();
error_reporting(0);
if ($loggedUserId != null) {
    set_time_limit ( 3 );
    $gameDao = new GameDao();
    $databaseConnector = new DataBaseConnector();
    $pdo = $databaseConnector->connectToDatabase();

    $gameService = new GameService();
    $requestLastUpdateTime = $_GET['lastUpdateTime'];
    $lastUpdateTime = $requestLastUpdateTime;
    $gameId = $_GET['gameId'];
    try {
        while ($requestLastUpdateTime >= $lastUpdateTime) {
            usleep(1000);
            $gameDto = $gameDao->findGameByIdAsDto($pdo, $gameId);
            $lastUpdateTime = $gameDto->lastUpdate == null ? 0 : $gameDto->lastUpdate;
        }
    } catch (Exception $e) {

    }
    $result = $gameService->getGame($pdo, $gameId);
} else {
    $result = ['status' => 'FAIL'];
    http_response_code(401);
}

header('Content-type: application/json');
echo json_encode($result);
?>
