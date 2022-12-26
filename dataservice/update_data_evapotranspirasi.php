<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$dataid = $_POST['dataid'];
$_data_jan = $_POST['eto_jan'];
$_data_feb = $_POST['eto_feb'];
$_data_mar = $_POST['eto_mar'];
$_data_apr = $_POST['eto_apr'];
$_data_mei = $_POST['eto_mei'];
$_data_jun = $_POST['eto_jun'];
$_data_jul = $_POST['eto_jul'];
$_data_ags = $_POST['eto_ags'];
$_data_sept = $_POST['eto_sept'];
$_data_okt = $_POST['eto_okt'];
$_data_nov = $_POST['eto_nov'];
$_data_des = $_POST['eto_des'];
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt_update_eto = $dbcon->prepare("UPDATE pl_mt_eto SET eto_jan = :etojan, eto_feb = :etofeb, eto_mar = :etomar, eto_apr = :etoapr, eto_mei = :etomei, eto_jun = :etojun, eto_jul = :etojul, eto_ags = :etoags, eto_sept = :etosept, eto_okt = :etookt, eto_nov = :etonov, eto_des = :etodes WHERE ident = :dataid");
  $stmt_update_eto->bindValue(":etojan", $_data_jan, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etofeb", $_data_feb, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etomar", $_data_mar, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etoapr", $_data_apr, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etomei", $_data_mei, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etojun", $_data_jun, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etojul", $_data_jul, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etoags", $_data_ags, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etosept", $_data_sept, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etookt", $_data_okt, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etonov", $_data_nov, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":etodes", $_data_des, PDO::PARAM_STR);
  $stmt_update_eto->bindValue(":dataid", $dataid, PDO::PARAM_STR);
  if($stmt_update_eto->execute()){
    $stmt_update_eto_nfr = $dbcon->prepare("UPDATE data_nfr SET eto_jan = :etojan, eto_feb = :etofeb, eto_mar = :etomar, eto_apr = :etoapr, eto_mei = :etomei, eto_jun = :etojun, eto_jul = :etojul, eto_ags = :etoags, eto_sept = :etosept, eto_okt = :etookt, eto_nov = :etonov, eto_des = :etodes WHERE identpetak = :dataid");
    $stmt_update_eto_nfr->bindValue(":etojan", $_data_jan, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etofeb", $_data_feb, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etomar", $_data_mar, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etoapr", $_data_apr, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etomei", $_data_mei, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etojun", $_data_jun, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etojul", $_data_jul, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etoags", $_data_ags, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etosept", $_data_sept, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etookt", $_data_okt, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etonov", $_data_nov, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":etodes", $_data_des, PDO::PARAM_STR);
    $stmt_update_eto_nfr->bindValue(":dataid", $dataid, PDO::PARAM_STR);
    if($stmt_update_eto_nfr->execute()){
      $stmt_update_nfr = $dbcon->prepare("UPDATE data_nfr SET nfr_jan = (eto_jan + por_jan) - (che_feb + wir_jan), nfr_feb = (eto_feb + por_feb) - (che_feb + wir_feb), nfr_mar = (eto_jan + por_mar) - (che_mar + wir_mar), nfr_apr = (eto_jan + por_apr) - (che_apr + wir_apr), nfr_mei = (eto_jan + por_mei) - (che_mei + wir_mei), nfr_jun = (eto_jan + por_jun) - (che_jun + wir_jun), nfr_jul = (eto_jan + por_jul) - (che_jul + wir_jul), nfr_ags = (eto_jan + por_ags) - (che_ags + wir_ags), nfr_sept = (eto_jan + por_sept) - (che_sept + wir_sept), nfr_okt = (eto_jan + por_okt) - (che_okt + wir_okt), nfr_nov = (eto_jan + por_nov) - (che_nov + wir_nov), nfr_des = (eto_des + por_des) - (che_des + wir_des) WHERE identpetak = :dataid");
      $stmt_update_nfr->bindValue(":dataid", $dataid, PDO::PARAM_STR);
      if($stmt_update_nfr->execute()){
        $stmt_update_nfr_dr = $dbcon->prepare("UPDATE data_dr SET nfr_jan = data_nfr.nfr_jan, nfr_feb = data_nfr.nfr_feb, nfr_mar = data_nfr.nfr_mar, nfr_apr = data_nfr.nfr_apr, nfr_mei = data_nfr.nfr_mei, nfr_jun = data_nfr.nfr_jun, nfr_jul = data_nfr.nfr_jul, nfr_ags = data_nfr.nfr_ags, nfr_sept = data_nfr.nfr_sept, nfr_okt = data_nfr.nfr_okt, nfr_nov = data_nfr.nfr_nov, nfr_des = data_nfr.nfr_des FROM data_nfr WHERE data_nfr.identpetak = data_dr.identpetak AND data_nfr.identpetak = :dataid");
        $stmt_update_nfr_dr->bindValue(":dataid", $dataid, PDO::PARAM_STR);
        if($stmt_update_nfr_dr->execute()){
          $stmt_update_dr = $dbcon->prepare("UPDATE data_dr SET dr_jan = ((nfr_jan * luas) / (rerata_ei_jan * konst)) * 1000, dr_feb = ((nfr_feb * luas) / (rerata_ei_feb * konst)) * 1000, dr_mar = ((nfr_mar * luas) / (rerata_ei_mar * konst)) * 1000, dr_apr = ((nfr_apr * luas) / (rerata_ei_apr * konst)) * 1000, dr_mei = ((nfr_mei * luas) / (rerata_ei_mei * konst)) * 1000, dr_jun = ((nfr_jun * luas) / (rerata_ei_jun * konst)) * 1000, dr_jul = ((nfr_jul * luas) / (rerata_ei_jul * konst)) * 1000, dr_ags = ((nfr_ags * luas) / (rerata_ei_ags * konst)) * 1000, dr_sept = ((nfr_sept * luas) / (rerata_ei_sept * konst)) * 1000, dr_okt = ((nfr_okt * luas) / (rerata_ei_okt * konst)) * 1000, dr_nov = ((nfr_nov * luas) / (rerata_ei_nov * konst)) * 1000, dr_des = ((nfr_des * luas) / (rerata_ei_des * konst)) * 1000 WHERE identpetak = :dataid");
          $stmt_update_dr->bindValue(":dataid", $dataid, PDO::PARAM_STR);
          if($stmt_update_dr->execute()){
            $response = array("response"=>200);
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