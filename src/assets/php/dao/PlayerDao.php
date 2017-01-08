<?php
require_once "./dto/PlayerDto.php";

class PlayerDao
{
    public function findPlayerIdByGameAndUserId($pdo, $gameId, $userId)
    {
        $sql = "SELECT ID FROM PLAYER WHERE PLAYER.GAME_ID = ? AND PLAYER.USER_ID = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
                $gameId,
                $userId
            )
        );
        return $stmt->rowCount() == 0 ? null : $stmt->fetch()["ID"];
    }

    public function findPlayersByGame($pdo, $gameId)
    {
        $sql = "SELECT 
                  PLAYER.ID AS ID,
                  PLAYER.MONEY AS MONEY,
                  PLAYER.SCORE AS SCORE,
                  USER.USER_NAME AS USER_NAME 
                FROM PLAYER 
                  LEFT JOIN USER ON PLAYER.USER_ID = USER.ID 
                WHERE PLAYER.GAME_ID = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
                $gameId
            )
        );
        return $stmt->rowCount() == 0 ? array() : $stmt->fetchAll();
    }

    public function findPlayersByGameAsDto($pdo, $gameId)
    {
        $result = array();
        $fetchResultList = $this->findPlayersByGame($pdo, $gameId);
        foreach ($fetchResultList as &$fetchResult) {
            $player = new PlayerDto();
            $player->from($fetchResult);
            array_push($result, $player);
        }
        return $result;
    }
}


?>
