<?php

class GameDto
{
    public $id;
    public $players;
    public $gameParameters;
    public $startTime;
    public $lastUpdate;

    public function from($fetchResult){
        $this -> id = $fetchResult['ID'];
        $this -> startTime = $fetchResult['START_TIME'];
        $this -> lastUpdate  = $fetchResult['LAST_UPDATE'];
    }

    public function fromAll($fetchResult, $players, $gameParameters){
        $this -> from($fetchResult);
        $this -> players = $players;
        $this -> gameParameters = $gameParameters;
    }
}