<?php
require_once "./dto/GameDto.php";
class GameDao
{
    public function findGameById($pdo, $gameId)
    {
        $sql = "SELECT * FROM GAME WHERE ID = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
                $gameId
            )
        );
        return $stmt -> rowCount() == 0 ? null :$stmt->fetch();
    }

    public function findGameByIdAsDto($pdo, $gameId){
        $result = null;
        $fetchResult = $this->findGameById($pdo, $gameId);
        if($fetchResult != null){
            $result = new GameDto();
            $result -> from($fetchResult);
        }
        return $result;
    }

    public function findPlayerActiveGame($pdo, $loggedUserId)
    {
        $now = time();
        $sql = "SELECT GAME.ID AS ID, GAME.GAME_PARAMETERS_ID AS GAME_PARAMETERS_ID,
                        GAME.START_TIME AS START_TIME,
                        GAME.LAST_UPDATE AS LAST_UPDATE FROM GAME 
                    LEFT JOIN PLAYER ON PLAYER.GAME_ID = GAME.ID 
                    LEFT JOIN USER ON USER.ID = PLAYER.USER_ID 
                    LEFT JOIN GAME_PARAMETERS ON GAME_PARAMETERS.ID = GAME.GAME_PARAMETERS_ID
                    WHERE USER.ID = ? AND 
                    (GAME.START_TIME is null or GAME.START_TIME + GAME_PARAMETERS.DURATION > ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
                $loggedUserId,
                $now
            )
        );
        return $stmt -> rowCount() == 0 ? null :$stmt->fetch();
    }

    public function findPlayerActiveGameAsDto($pdo, $loggedUserId){
        $result = null;
        $fetchResult = $this->findPlayerActiveGame($pdo, $loggedUserId);
        if($fetchResult != null){
            $result = new GameDto();
            $result -> from($fetchResult);
        }
        return $result;
    }

    public function findAvailableGame($pdo)
    {
        $now = time();
        $sql = "SELECT GAME.ID AS ID, GAME.GAME_PARAMETERS_ID AS GAME_PARAMETERS_ID,
                        GAME.START_TIME AS START_TIME,
                        GAME.LAST_UPDATE AS LAST_UPDATE FROM GAME 
                    LEFT JOIN PLAYER ON PLAYER.GAME_ID = GAME.ID 
                    LEFT JOIN GAME_PARAMETERS ON GAME_PARAMETERS.ID = GAME.GAME_PARAMETERS_ID
                    WHERE  
                    (GAME.START_TIME is null or GAME.START_TIME + GAME_PARAMETERS.DURATION > ?)
                    HAVING COUNT(PLAYER.ID) < MAX(GAME_PARAMETERS.NUMBER_OF_PLAYERS)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
                $now
            )
        );
        return $stmt -> rowCount() == 0 ? null : $stmt->fetch();
    }

    public function findAvailableGameAsDto($pdo){
        $result = null;
        $fetchResult = $this->findAvailableGame($pdo);
        if($fetchResult != null){
            $result = new GameDto();
            $result -> from($fetchResult);
        }
        return $result;
    }
}

?>