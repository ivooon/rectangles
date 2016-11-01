<?php

class GameParametersDto
{
    public $id;
    public $numberOfPlayers;
    public $duration;
    public $incomeValue;
    public $incomeInterval;
    public $costScale;

    public function from($fetchResult){
        $this -> id = $fetchResult["ID"];
        $this -> numberOfPlayers = $fetchResult['NUMBER_OF_PLAYERS'];
        $this -> duration = $fetchResult['DURATION'];
        $this -> incomeValue  = $fetchResult['INCOME_VALUE'];
        $this -> incomeInterval = $fetchResult['INCOME_INTERVAL'];
        $this -> costScale = $fetchResult['COST_SCALE'];
    }

}

?>