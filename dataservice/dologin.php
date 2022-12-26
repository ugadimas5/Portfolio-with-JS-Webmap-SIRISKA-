<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$_username = $_POST['username'];
$rawpassword = $_POST['password'];
$hashBase = "b144700387101111f02422bf234266affcd786eb15289d695b412c0587243947";
$_password = hash_hmac('sha256', $rawpassword, $hashBase);
$found = 0;
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt_count = $dbcon->prepare("SELECT COUNT(*) AS foundrow FROM users WHERE username = :username AND password = :password AND status = 1");
  $stmt_count->bindValue(":username", $_username, PDO::PARAM_STR);
  $stmt_count->bindValue(":password", $_password, PDO::PARAM_STR);
	if($stmt_count->execute()){
		while($rowset_count = $stmt_count->fetch(PDO::FETCH_ASSOC)){
			$found = $rowset_count['foundrow'];
		}
    if($found == 1){
      $stmt = $dbcon->prepare("SELECT * FROM users WHERE username = :username AND password = :password AND status = 1");
      $stmt->bindValue(":username", $_username, PDO::PARAM_STR);
      $stmt->bindValue(":password", $_password, PDO::PARAM_STR);
      if($stmt->execute()){
        while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
          $usrid = $rowset['id'];
          $usrmd = $rowset['module'];
          $usrnm = $rowset['username'];
          $usrrn = $rowset['realname'];
        }
        $response = array("response"=>200,"module"=>$usrmd,"userid"=>$usrid);
        header('Content-Type: application/json');
        echo json_encode($response);
        $dbcon = null;
        exit;
      } else {
        $response = array("response"=>404);
        header('Content-Type: application/json');
        echo json_encode($response);
        $dbcon = null;
        exit;
      }
    } else {
      $response = array("response"=>404);
      header('Content-Type: application/json');
      echo json_encode($response);
      $dbcon = null;
      exit;
    }
	} else {
    $response = array("response"=>404);
		header('Content-Type: application/json');
		echo json_encode($response);
		$dbcon = null;
		exit;
	}
} catch (PDOException $e) {
  $response = array("response"=>404);
	header('Content-Type: application/json');
	echo json_encode($response);
	$dbcon = null;
	exit;
}
?>