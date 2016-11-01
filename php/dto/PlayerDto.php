<?php

class PlayerDto
{
    public $id;
    public $money;
    public $score;
    public $blocks;

    public function from($fetchResult)
    {
        $this->id = $fetchResult['ID'];
        $this->money = $fetchResult['MONEY'];
        $this->score = $fetchResult['SCORE'];
    }

    public function fromAll($fetchResult, $blocks)
    {
        $this->from($fetchResult);
        $this->blocks = $blocks;
    }
}