<?php

class LoggedUserService
{

  public static function getLoggedUserId()
  {
    if (session_status() == PHP_SESSION_NONE) {
      session_start();
    }
    $loggedUserId = null;
    if (isset($_SESSION['user_id'])) {
      $loggedUserId = $_SESSION['user_id'];
    }
    return $loggedUserId;
  }

}

?>
