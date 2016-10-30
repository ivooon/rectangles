<?php
class DataBaseConnector {

    function connectToDatabase(){
        try
        {
          $pdo = new PDO('mysql:host=localhost;dbname=rectangle', 'root', '', array(
              PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
              PDO::ATTR_EMULATE_PREPARES => false
          ));

        }
        catch(PDOException $e){
        }

        return $pdo;
   }
}
?>

