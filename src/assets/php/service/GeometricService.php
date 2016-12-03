<?php
require_once "service/GameUpdateService.php";

class GeometricService
{

  public function update($pdo, $block, $game, $playerId)
  {
    $updated = false;
    if ($this -> validateBounds($block, $game->gameParameters)) {

      $updated = false;
      $gameUpdateService = new GameUpdateService();
      $gameUpdateService->updateGame($pdo, $game);

      $actualPlayer = $this->getActualPlayer($game, $playerId);

      $totalCost = $this->getCost($block, $game, $playerId);
      if ($totalCost <= $actualPlayer->money) {
        $updated = true;
        $blocksToDelete = array();
        $blocksToCreate = array();

        $block->playerId = $playerId;
        foreach ($game->players as &$player) {
          $newPlayerBlocks = [];
          $playerBlocksToDelete = [];
          foreach ($player->blocks as $key => $playerBlock) {
            if($this->checkCollision($block, $playerBlock)) {
              $playerBlock->playerId = $player->id;
              $intersectionBlock = $this->intersection($block, $playerBlock);
              $newBlocksAfterSubtraction = $this->subtract($intersectionBlock, $playerBlock);
              foreach ($newBlocksAfterSubtraction as $newBlocksKey => $newBlock) {
                array_push($newPlayerBlocks, $newBlock);
              }
              array_push($blocksToDelete, $playerBlock);
              array_push($playerBlocksToDelete, $key);

            }
          }
          foreach ($newPlayerBlocks as $newBlocksKey => $newBlock) {
            array_push($player->blocks, $newBlock);
            array_push($blocksToCreate, $newBlock);
          }
          foreach ($playerBlocksToDelete as &$blockToDelete) {
            unset($player->blocks[$blockToDelete]);
          }
          if ($player->id == $playerId) {
            array_push($player->blocks, $block);
          }
        }
        array_push($blocksToCreate, $block);

        foreach ($blocksToDelete as &$blockToDelete) {
          $this->deleteBlock($pdo, $blockToDelete);
        }
        foreach ($blocksToCreate as &$blockToCreate) {
          $this->createBlock($pdo, $blockToCreate, $game, $blockToCreate->playerId);
        }
        $actualPlayer-> money -= $totalCost;
      }
      $gameUpdateService->updateGame($pdo, $game);
    }
    return $updated;
  }

  public function getCost($blockToCreate, $game, $playerId){
    $costScale = $game->gameParameters->costScale;
    $totalCost = $blockToCreate->width * $blockToCreate->height;

    foreach ($game->players as &$player) {
      $costPerPlayer = $player -> money / $costScale;

      if ($player->id == $playerId) {
        $costPerPlayer = 0;
      }

      foreach($player->blocks as &$block){
        if($this->checkCollision($block, $blockToCreate)){
          $intersectionBlock = $this->intersection($block, $blockToCreate);
          $intersectionField = $intersectionBlock->width * $intersectionBlock->height;
          $totalCost -= $intersectionField;
          $totalCost += $intersectionField * $costPerPlayer;
        }
      }

      return $totalCost;
    }
  }

  public function subtract($rect1, $rect2){
    $result = [];

    $xArray = [];
    $yArray = [];

    array_push($xArray, $rect1 -> x);
    array_push($xArray, $rect1 -> x + $rect1 -> width);
    array_push($xArray, $rect2 -> x);
    array_push($xArray, $rect2 -> x + $rect2 -> width);

    array_push($yArray, $rect1 -> y);
    array_push($yArray, $rect1 -> y + $rect1 -> height);
    array_push($yArray, $rect2 -> y);
    array_push($yArray, $rect2 -> y + $rect2 -> height);
    sort($xArray, SORT_NUMERIC);
    sort($yArray, SORT_NUMERIC);

    for ($i = 0; $i < 3; $i++) {
      for ($j = 0; $j < 3; $j++) {
        $width = $xArray[$i + 1] - $xArray[$i];
        $height = $yArray[$j + 1] - $yArray[$j];
        if($width*$height != 0) {
          $rect = new BlockDto();
          $rect->x = $xArray[$i];
          $rect->y = $yArray[$j];
          $rect->width = $width;
          $rect->height = $height;
          if(!$rect->isEqual($rect1)) {
            $rect->playerId = $rect2->playerId;
            array_push($result, $rect);
          }
        }
      }
    }
    return $result;
  }


  public function intersection($rect1, $rect2){
    $r1x1 = $rect1->x;
    $r1y1 = $rect1->y;
    $r2x1 = $rect2->x;
    $r2y1 = $rect2->y;
    $r1x2 = $r1x1 + $rect1->width;
    $r1y2 = $r1y1 + $rect1->height;
    $r2x2 = $r2x1 + $rect2->width;
    $r2y2 = $r2y1 + $rect2->height;
    if ($r1x1 < $r2x1) $r1x1 = $r2x1;
    if ($r1y1 < $r2y1) $r1y1 = $r2y1;
    if ($r1x2 > $r2x2) $r1x2 = $r2x2;
    if ($r1y2 > $r2y2) $r1y2 = $r2y2;
    $r1x2 -= $r1x1;
    $r1y2 -= $r1y1;

    $result = new BlockDto();
    $result->x = $r1x1;
    $result->y = $r1y1;
    $result->width = $r1x2;
    $result->height = $r1y2;
    return $result;
  }

  public function validateBounds($block, $gameParameters)
  {
    return $block->x >= 0 &&
    $block->y >= 0 && $block->width > 0 && $block->height > 0  &&
    $block->x + $block->width <= $gameParameters->maxWidth &&
    $block->y + $block->height <= $gameParameters->maxHeight;

  }

  public function createBlock($pdo, $block, $game, $playerId)
  {
    $sql = "INSERT INTO RECT_BLOCK (PLAYER_ID, GAME_ID, X, Y, WIDTH, HEIGHT) 
                VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        $playerId,
        $game->id,
        $block->x,
        $block->y,
        $block->width,
        $block->height
      )
    );
  }

  public function deleteBlock($pdo, $block)
  {
    $sql = "DELETE FROM RECT_BLOCK WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        $block->id
      )
    );
  }

  public function checkCollision($block1, $block2, $inclusive = true)
  {
    return $inclusive ?
      !(
        $block1->x > $block2->x + $block2->width ||
        $block1->x + $block2->width < $block2->x ||
        $block1->y > $block2->y + $block2->height ||
        $block1->y + $block2->height < $block2->y
      ) :
      !(
        $block1->x >= $block2->x + $block2->width ||
        $block1->x + $block2->width <= $block2->x ||
        $block1->y >= $block2->y + $block2->height ||
        $block1->y + $block2->height <= $block2->y
      );
  }

  public function getActualPlayer($game, $playerId)
  {
    foreach ($game->players as &$player) {
      if ($player->id == $playerId) {
        $actualPlayer = $player;
        return $actualPlayer;
      }
    }
    return null;
  }
}

?>
