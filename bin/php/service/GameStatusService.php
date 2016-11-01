<?php

class GameStatusService
{
    private $gameDao;

    function __construct()
    {
        $this->gameDao = new GameDao();
    }

    function checkStatus($pdo, $gameId, $gameParameters)
    {
        $now = time();
        $duration = $gameParameters->duration;
        $gameDto = $this->gameDao->findGameByIdAsDto($pdo, $gameId);
        if ($gameDto->startTime == null) {
            $changedStatus = 'PENDING';
            return $changedStatus;
        } else if ($gameDto->startTime + $duration > $now) {
            $changedStatus = 'STARTED';
            return $changedStatus;
        } else {
            $changedStatus = 'FINISHED';
            return $changedStatus;
        }
    }
}