<?php
require_once "./dto/GameParametersDto.php";

class GameParametersDao
{

    public function findLastParametersSettings($pdo)
    {
        $sql = "SELECT * FROM GAME_PARAMETERS ORDER BY ID DESC LIMIT 1;";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array()
        );
        return $stmt->rowCount() == 0 ? null : $stmt->fetch();
    }

    public function findLastParametersSettingsAsDto($pdo)
    {
        $result = null;
        $fetchResult = $this->findLastParametersSettings($pdo);
        if ($fetchResult != null) {
            $result = new GameParametersDto();
            $result->from($fetchResult);
        }
        return $result;
    }

}

?>