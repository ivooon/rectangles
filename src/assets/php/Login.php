<?php
require_once 'dao/DatabaseConnector.php';

$result;
if(isset($_POST["username"]) && isset($_POST["password"]) ) {
  $username = $_POST["username"];
  $password = $_POST["password"];

  $databaseConnector = new DataBaseConnector();
  $pdo = $databaseConnector->connectToDatabase();

  $pdo->beginTransaction();

  try {

    $sql = "SELECT * FROM USER WHERE USER_NAME = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        $username
      )
    );
    if ($stmt->rowCount() == 0) {
      $result = ['status' => 'FAIL'];
      http_response_code(404);
    } else {
      $user = $stmt->fetch();
      $salt = $user['SALT'];
      $encryptedPassword = $user["PASSWORD"];

      if (md5($password . $salt) === $encryptedPassword) {
        session_start();
        $_SESSION['user_id'] = $user["ID"];
        $result = ['status' => 'SUCCESS'];
        http_response_code(200);
      } else {
        $result = ['status' => 'FAIL'];
        http_response_code(404);
      }
    }
    $pdo->commit();

  } catch (Exception $e) {
    $result = ['status' => 'FAIL'];
    http_response_code(500);
    $pdo->rollBack();
  }
} else {
  $result = ['status' => 'FAIL'];
  http_response_code(400);
}
header('Content-type: application/json');
echo json_encode($result);
?>
