<?php
require_once "service/GameUpdateService.php";

class GeometricService
{

    public function update($pdo, $block, $game, $playerId)
    {
        $updated = true;
        $gameUpdateService = new GameUpdateService();
        $gameUpdateService->updateGame($pdo, $game);
        $blocksToDelete = array();
        $blocksToCreate = array();

        if ($updated) {
            foreach ($game->players as &$player) {
                if ($player->id == $playerId) {
                    array_push($player->blocks, $block);
                }
            }
        }

        array_push($blocksToCreate, $block);

        foreach ($blocksToDelete as &$blockToDelete) {
            $this->deleteBlock($pdo, $blockToDelete);
        }
        foreach ($blocksToCreate as &$blockToCreate) {
            $this->createBlock($pdo, $blockToCreate, $game, $playerId);
        }

        $gameUpdateService->updateGame($pdo, $game);
        return $updated;
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
}

?>