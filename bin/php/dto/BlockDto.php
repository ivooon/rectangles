<?php
class BlockDto
{
    public $id;
    public $x;
    public $y;
    public $width;
    public $height;

    public function from($fetchResult){
        $this -> id = $fetchResult['ID'];
        $this -> x = $fetchResult['X'];
        $this -> y = $fetchResult['Y'];
        $this -> width = $fetchResult['WIDTH'];
        $this -> height  = $fetchResult['HEIGHT'];
    }
}
?>