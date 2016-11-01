<?php
require_once "./dto/BlockDto.php";

class BlockDao
{
    public function findBlocksByPlayer($pdo, $playerId)
    {
        $sql = "SELECT * FROM RECT_BLOCK WHERE PLAYER_ID = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
                $playerId
            )
        );
        return $stmt->rowCount() == 0 ? array() : $stmt->fetchAll();
    }

    public function findBlocksByPlayerAsDto($pdo, $gameId)
    {
        $result = array();
        $fetchResultList = $this->findBlocksByPlayer($pdo, $gameId);
        foreach ($fetchResultList as &$fetchResult) {
            $player = new BlockDto();
            $player->from($fetchResult);
            array_push($result, $player);
        }
        return $result;
    }
}


?>