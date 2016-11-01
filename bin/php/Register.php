<?php
require_once 'dao/DatabaseConnector.php';
    $result;

    $username = 'test';//$_POST["username"];
    $password = 'test';//$_POST["password"];

    $databaseConnector = new DataBaseConnector();
    $pdo = $databaseConnector -> connectToDatabase();

    $pdo->beginTransaction();

    try{

        $sql = "SELECT COUNT(*) as number_of_users FROM USER WHERE USER_NAME = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
                $username
            )
        );
        if($stmt->fetch()['number_of_users'] > 0){
            $result = ['status' => 'FAIL'];
            http_response_code(404);
        } else {
            $salt = rand();
            $encryptedPassword = md5($password.$salt);
            $sql = "INSERT INTO USER (USER_NAME, PASSWORD, SALT) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(array(
                    $username,
                    $encryptedPassword,
                    $salt
                )
            );

            $result = ['status' => 'SUCCESS'];
            http_response_code(200);
        }
        $pdo->commit();

    }
    catch(Exception $e){
        $result = ['status' => 'FAIL'];
        http_response_code(500);
        $pdo->rollBack();
    }

    header('Content-type: application/json');
    echo json_encode($result);
?>