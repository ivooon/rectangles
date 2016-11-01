<?php
require_once "dao/GameParametersDao.php";
require_once 'dao/GameDao.php';
require_once 'dao/BlockDao.php';
require_once 'dao/GameParametersDao.php';
require_once 'dao/PlayerDao.php';
require_once 'service/LoggedUserService.php';

class GameService
{
    public function getGame($pdo, $gameId)
    {
        $result = null;
        $gameParametersDao = new GameParametersDao();
        $gameParametersDto = $gameParametersDao->findLastParametersSettingsAsDto($pdo);
        $gameDao = new GameDao();
        $blockDao = new BlockDao();
        $playerDao = new PlayerDao();
        $game = $gameDao->findGameByIdAsDto($pdo, $gameId);

        if (!is_null($game)) {
            $players = $playerDao->findPlayersByGameAsDto($pdo, $game->id);
            $game->players = $players;
            $game->gameParameters = $gameParametersDto;
            foreach ($players as &$player) {
                $player->blocks = $blockDao->findBlocksByPlayerAsDto($pdo, $player->id);
            }
            $game -> activePlayerId = $playerDao -> findPlayerIdByGameAndUserId(
                $pdo,
                $game -> id,
                LoggedUserService::getLoggedUserId()
            );
            $result = $game;

        }
        return $result;
    }
}