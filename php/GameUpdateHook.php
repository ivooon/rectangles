<?php
require_once "service/LoggedUserService.php";
require_once "dao/DatabaseConnector.php";
require_once "./dao/GameDao.php";
$loggedUserId = LoggedUserService::getLoggedUserId();

if ($loggedUserId != null) {
    ini_set('max_execution_time', 3);
    $gameDao = new GameDao();
    $databaseConnector = new DataBaseConnector();
    $pdo = $databaseConnector->connectToDatabase();

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
    $result = ["lastUpdateTime" => $lastUpdateTime];
} else {
    $result = ['status' => 'FAIL'];
    http_response_code(401);
}

header('Content-type: application/json');
echo json_encode($result);
?>