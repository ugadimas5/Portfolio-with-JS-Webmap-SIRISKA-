<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$dataid = $_GET['dataid'];
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt_irigasi_petak = $dbcon->prepare("DELETE FROM irigasi_petak WHERE ident = :ident");
  $stmt_irigasi_petak->bindValue(":ident", $dataid, PDO::PARAM_STR);
	if($stmt_irigasi_petak->execute()){
    $stmt_ETO = $dbcon->prepare("DELETE FROM pl_mt_eto WHERE ident = :ident");
    $stmt_ETO->bindValue(":ident", $dataid, PDO::PARAM_STR);
    if($stmt_ETO->execute()){
      $stmt_POR = $dbcon->prepare("DELETE FROM pl_mt_porositas WHERE ident = :ident");
      $stmt_POR->bindValue(":ident", $dataid, PDO::PARAM_STR);
      if($stmt_POR->execute()){
        $stmt_CHE = $dbcon->prepare("DELETE FROM pl_mt_che WHERE ident = :ident");
        $stmt_CHE->bindValue(":ident", $dataid, PDO::PARAM_STR);
        if($stmt_CHE->execute()){
          $stmt_WIR = $dbcon->prepare("DELETE FROM mt_wir WHERE ident = :ident");
          $stmt_WIR->bindValue(":ident", $dataid, PDO::PARAM_STR);
          if($stmt_WIR->execute()){
            $stmt_DR = $dbcon->prepare("DELETE FROM data_dr WHERE identpetak = :ident");
            $stmt_DR->bindValue(":ident", $dataid, PDO::PARAM_STR);
            if($stmt_DR->execute()){
              $response = array("status"=>200);
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