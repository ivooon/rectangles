<?php
require_once 'dao/DatabaseConnector.php';
require_once 'service/LoggedUserService.php';
require_once 'service/GameService.php';

$databaseConnector = new DataBaseConnector();

$pdo = $databaseConnector->connectToDatabase();
$gameId = $_GET['gameId'];
$result;
$now = time();
$loggedUserId = LoggedUserService::getLoggedUserId();

if ($loggedUserId != null) {
    $pdo->beginTransaction();
    try {
        $gameService = new GameService();
        $result = $gameService->getGame($pdo, $gameId);

        if ($result == null) {
            $result = ['status' => 'FAIL'];
            http_response_code(404);
        }
        $pdo->commit();
    } catch (Exception $e) {
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