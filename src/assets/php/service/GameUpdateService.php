<?php

class GameUpdateService
{
    /**
     * Updates game. It should be invoked before rectangle creation
     */
    public function updateGame($pdo, $game)
    {
        $gameParameters = $game->gameParameters;
        $incomeValue = $gameParameters->incomeValue;
        $incomeInterval = $gameParameters->incomeInterval;
        $lastUpdate = $game->lastUpdate;
        $now = time();
        $timeFromLastUpdate = $now - $lastUpdate;
        $iterationsToUpdate = floor($timeFromLastUpdate / $incomeInterval);
        foreach ($game->players as &$player) {
            $player->money += $iterationsToUpdate * $incomeValue;
            $score = 0;
            foreach ($player->blocks as &$block) {
                $score += $block->width * $block->height;
            }
            $player->score = $score;

            $sql = "UPDATE PLAYER SET SCORE = ?, MONEY = ? WHERE ID = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(array(
                    $player->score,
                    $player->money,
                    $player->id
                )
            );
        }
        $game->lastUpdate = $now;
        $sql = "UPDATE GAME SET LAST_UPDATE = ? WHERE ID = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
                $now,
                $game->id
            )
        );
    }

}