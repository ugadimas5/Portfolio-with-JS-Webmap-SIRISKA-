<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$dataid = $_GET['dataid'];
$items = null;
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt = $dbcon->prepare("SELECT gid,objectid_1,ident,tahun,nama_di,desa,kecamatan,che_jan,che_feb,che_mar,che_apr,che_mei,che_jun,che_jul,che_ags,che_sept,che_okt,che_nov,che_des FROM pl_mt_che WHERE ident = :ident");
  $stmt->bindValue(":ident", $dataid, PDO::PARAM_STR);
  if($stmt->execute()){
    while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
      $items[] = $rowset;
    }
    $response = array("response"=>200,"dataarray"=>$items);
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
} catch (PDOException $e) {
  $response = array("response"=>404);
	header('Content-Type: application/json');
	echo json_encode($response);
	$dbcon = null;
	exit;
}
?>