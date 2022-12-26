<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
if (isset($_POST['command'])) {
	if ($_POST['command']=="POINT") {
		$kodebangunan = $_POST['kodebangunan'];
    $namabangunan = $_POST['namabangunan'];
    $namadi = $_POST['namadi'];
    $nomenklatur = $_POST['nomenklatur'];
    $kondisi = $_POST['kondisi'];
		$geometry = $_POST['geometry'];
		try {
			$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
			$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $dbcon->prepare("INSERT INTO irigasi_bangunan(k_bangunan, nama, nama_di, nomenklatu, kondisi, geom) VALUES(:kodebangunan, :namabangunan, :namadi, :nomenklatur, :kondisi, ST_Transform(ST_GeomFromText(:geometry, 4326), 32749))");
			$stmt->bindValue(":kodebangunan", $kodebangunan, PDO::PARAM_STR);
      $stmt->bindValue(":namabangunan", $namabangunan, PDO::PARAM_STR);
      $stmt->bindValue(":namadi", $namadi, PDO::PARAM_STR);
      $stmt->bindValue(":nomenklatur", $nomenklatur, PDO::PARAM_STR);
      $stmt->bindValue(":kondisi", $kondisi, PDO::PARAM_STR);
			$stmt->bindValue(":geometry", $geometry, PDO::PARAM_STR);
			if($stmt->execute()){
				$response = array("response"=>"200","message"=>"created");
				header('Content-Type: application/json');
				echo json_encode($response);
				$dbcon = null;
				exit;
			} else {
				$response = array("response"=>"500","message"=>$e->getMessage());
				header('Content-Type: application/json');
				echo json_encode($response);
				$dbcon = null;
				exit;
			}
		} catch (PDOException $e) {
			$response = array("response"=>"500","message"=>$e->getMessage());
			header('Content-Type: application/json');
			echo json_encode($response);
			$dbcon = null;
			exit;
		}
	} else {
		$response = array("response"=>"404","message"=>"Command is not properly set.");
		header('Content-Type: application/json');
		echo json_encode($response);
		$dbcon = null;
		exit;
	}
} else {
	$response = array("response"=>"404","message"=>"Command is not properly set.");
	header('Content-Type: application/json');
	echo json_encode($response);
	$dbcon = null;
	exit;
}
?>