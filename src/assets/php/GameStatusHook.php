<?php
require_once "service/LoggedUserService.php";
require_once "dao/DatabaseConnector.php";
require_once "dao/GameParametersDao.php";
require_once "./dao/GameDao.php";
require_once "service/GameStatusService.php";

error_reporting(0);
$loggedUserId = LoggedUserService::getLoggedUserId();
session_write_close();
if ($loggedUserId != null) {
    set_time_limit ( 3 );
    $gameDao = new GameDao();
    $gameStatusService = new GameStatusService();
    $databaseConnector = new DataBaseConnector();
    $gameParametersDao = new GameParametersDao();
    $pdo = $databaseConnector->connectToDatabase();
    $gameParametersDto = $gameParametersDao->findLastParametersSettingsAsDto($pdo);


    $requestGameStatus = $_GET['status'];
    $changedStatus = $requestGameStatus;
    $gameId = $_GET['gameId'];
    $duration = $gameParametersDto->duration;
    try {
        $now = time();
        if ($requestGameStatus != 'FINISHED') {
            while ($requestGameStatus == $changedStatus) {
                usleep(1000);
                $now = time();
                $changedStatus = $gameStatusService->checkStatus($pdo, $gameId, $gameParametersDto);
            }
        } else {
            $changedStatus = $gameStatusService->checkStatus($pdo, $gameId, $gameParametersDto);
        }
    } catch (Exception $e) {

    }
    $result = ["gameStatus" => $changedStatus];
} else {
    $result = ['status' => 'FAIL'];
    http_response_code(401);
}

header('Content-type: application/json');
echo json_encode($result);
?>
