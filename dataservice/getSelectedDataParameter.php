<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$items_eto = $items_por = $items_che = $items_wir = $items_dr = null;
$_dataid = $_GET['dataid'];
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt_eto = $dbcon->prepare("SELECT nama_di, desa, kecamatan, eto_jan, eto_feb, eto_mar, eto_apr, eto_mei, eto_jun, eto_jul, eto_ags, eto_sept, eto_okt, eto_nov, eto_des FROM pl_mt_eto WHERE ident = :ident");
  $stmt_eto->bindValue(":ident", $_dataid, PDO::PARAM_STR);
	if($stmt_eto->execute()){
		while($rowset_eto = $stmt_eto->fetch(PDO::FETCH_ASSOC)){
			$items_eto[] = $rowset_eto;
		}
    $stmt_por = $dbcon->prepare("SELECT nama_di, desa, kecamatan, por_jan, por_feb, por_mar, por_apr, por_mei, por_jun, por_jul, por_ags, por_sept, por_okt, por_nov, por_des FROM pl_mt_porositas WHERE ident = :ident");
    $stmt_por->bindValue(":ident", $_dataid, PDO::PARAM_STR);
    if($stmt_por->execute()){
      while($rowset_por = $stmt_por->fetch(PDO::FETCH_ASSOC)){
        $items_por[] = $rowset_por;
      }
      $stmt_che = $dbcon->prepare("SELECT nama_di, desa, kecamatan, che_jan, che_feb, che_mar, che_apr, che_mei, che_jun, che_jul, che_ags, che_sept, che_okt, che_nov, che_des FROM pl_mt_che WHERE ident = :ident");
      $stmt_che->bindValue(":ident", $_dataid, PDO::PARAM_STR);
      if($stmt_che->execute()){
        while($rowset_che = $stmt_che->fetch(PDO::FETCH_ASSOC)){
          $items_che[] = $rowset_che;
        }
        $stmt_wir = $dbcon->prepare("SELECT nama_di, desa, kecamatan, wir_jan, wir_feb, wir_mar, wir_apr, wir_mei, wir_jun, wir_jul, wir_ags, wir_sept, wir_okt, wir_nov, wir_des FROM mt_wir WHERE ident = :ident");
        $stmt_wir->bindValue(":ident", $_dataid, PDO::PARAM_STR);
        if($stmt_wir->execute()){
          while($rowset_wir = $stmt_wir->fetch(PDO::FETCH_ASSOC)){
            $items_wir[] = $rowset_wir;
          }
          $stmt_dr = $dbcon->prepare("SELECT identpetak, nama_di, dr_jan, dr_feb, dr_mar, dr_apr, dr_mei, dr_jun, dr_jul, dr_ags, dr_sept, dr_okt, dr_nov, dr_des FROM data_dr WHERE identpetak = :ident");
          $stmt_dr->bindValue(":ident", $_dataid, PDO::PARAM_STR);
          if($stmt_dr->execute()){
            while($rowset_dr = $stmt_dr->fetch(PDO::FETCH_ASSOC)){
              $items_dr[] = $rowset_dr;
            }
            $response = array("status"=>200,"dataeto"=>$items_eto,"datapor"=>$items_por,"datache"=>$items_che,"datawir"=>$items_wir,"datadr"=>$items_dr);
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