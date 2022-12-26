<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$items = null;
$_dataid = $_GET['dataid'];
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt = $dbcon->prepare("SELECT gid, k_bangunan, COALESCE(nomenklatu, '-') AS nomenklatu, urut, COALESCE(nama, '-') AS nama, COALESCE(kondisi, '-') AS kondisi, nama_di FROM irigasi_bangunan WHERE gid = :gid");
  $stmt->bindValue(":gid", $_dataid, PDO::PARAM_INT);
  if($stmt->execute()){
    while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
      $items[] = $rowset;
    }
    $response = array("status"=>200,"dataarray"=>$items);
    header('Content-Type: application/json');
    echo json_encode($response);
    $dbcon = null;
    exit;
  } else {
    $response = array("status"=>404);
    header('Content-Type: application/json');
    echo json_encode($response);
    $dbcon = null;
    exit;
  }
} catch (PDOException $e) {
  $response = array("status"=>404,"message"=>$e->getMessage());
	header('Content-Type: application/json');
	echo json_encode($response);
	$dbcon = null;
	exit;
}
?>