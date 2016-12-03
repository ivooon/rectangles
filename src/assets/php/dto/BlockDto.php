<?php

class BlockDto
{
  public $id;
  public $x;
  public $y;
  public $width;
  public $height;
  public $playerId;

  public function from($fetchResult)
  {
    $this->id = $fetchResult['ID'];
    $this->x = $fetchResult['X'];
    $this->y = $fetchResult['Y'];
    $this->width = $fetchResult['WIDTH'];
    $this->height = $fetchResult['HEIGHT'];
  }

  public function isEqual($rect)
  {
    return $this->x == $rect->x &&
      $this->y == $rect->y &&
        $this->width == $rect->width &&
          $this->height == $rect->height;
  }
}

?>
