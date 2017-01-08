<?php

class PlayerDto
{
  public $id;
  public $money;
  public $score;
  public $blocks;
  public $userName;

  public function from($fetchResult)
  {
    $this->id = $fetchResult['ID'];
    $this->money = $fetchResult['MONEY'];
    $this->score = $fetchResult['SCORE'];
    $this->userName = $fetchResult['USER_NAME'];
  }

  public function fromAll($fetchResult, $blocks)
  {
    $this->from($fetchResult);
    $this->blocks = $blocks;
  }
}
