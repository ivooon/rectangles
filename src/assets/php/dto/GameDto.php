<?php

class GameDto
{
    public $id;
    public $players;
    public $gameParameters;
    public $startTime;
    public $lastUpdate;
    public $activePlayerId;

    public function from($fetchResult)
    {
        $this->id = $fetchResult['ID'];
        $this->startTime = $fetchResult['START_TIME'];
        $this->lastUpdate = $fetchResult['LAST_UPDATE'];
    }
}