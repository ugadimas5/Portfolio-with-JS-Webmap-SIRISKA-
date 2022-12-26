<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$items_sli = $items_ei = null;
$_dataid = $_GET['dataid'];
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt_sli = $dbcon->prepare("SELECT gid, objectid, nomenklatu, nama_di, urut, ident, COALESCE(desa, '-') AS desa, COALESCE(kecamatan, '-') AS kecamatan, k_saluran, nama, COALESCE(kondisi, '-') AS kondisi FROM irigasi_saluran WHERE ident = :ident");
  $stmt_sli->bindValue(":ident", $_dataid, PDO::PARAM_STR);
	if($stmt_sli->execute()){
		while($rowset_sli = $stmt_sli->fetch(PDO::FETCH_ASSOC)){
			$items_sli[] = $rowset_sli;
		}
    $stmt_ei = $dbcon->prepare("SELECT ident, k_saluran, nomenklatu, urut, nama_di, kecamatan, desa, rerata_ei_jan, rerata_ei_feb, rerata_ei_mar, rerata_ei_apr, rerata_ei_mei, rerata_ei_jun, rerata_ei_jul, rerata_ei_ags, rerata_ei_sept, rerata_ei_okt, rerata_ei_nov, rerata_ei_des FROM efisiensi_irigasi WHERE ident = :ident");
    $stmt_ei->bindValue(":ident", $_dataid, PDO::PARAM_STR);
    if($stmt_ei->execute()){
      while($rowset_ei = $stmt_ei->fetch(PDO::FETCH_ASSOC)){
        $items_ei[] = $rowset_ei;
      }
      $response = array("status"=>200,"datasli"=>$items_sli,"dataei"=>$items_ei);
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