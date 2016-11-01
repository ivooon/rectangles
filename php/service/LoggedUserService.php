<?php

class LoggedUserService
{

    public static function getLoggedUserId()
    {
        $loggedUserId = 1; //null;
        if (isset($_SESSION['user_id'])) {
            $loggedUserId = $_SESSION['user_id'];
        }
        return $loggedUserId;
    }

}

?>