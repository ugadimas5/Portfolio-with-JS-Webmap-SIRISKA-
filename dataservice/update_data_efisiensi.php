<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$dataid = $_POST['dataid'];
$tahun = $_POST['tahun'];
$_data_jan = $_POST['rerata_ei_jan'];
$_data_feb = $_POST['rerata_ei_feb'];
$_data_mar = $_POST['rerata_ei_mar'];
$_data_apr = $_POST['rerata_ei_apr'];
$_data_mei = $_POST['rerata_ei_mei'];
$_data_jun = $_POST['rerata_ei_jun'];
$_data_jul = $_POST['rerata_ei_jul'];
$_data_ags = $_POST['rerata_ei_ags'];
$_data_sept = $_POST['rerata_ei_sept'];
$_data_okt = $_POST['rerata_ei_okt'];
$_data_nov = $_POST['rerata_ei_nov'];
$_data_des = $_POST['rerata_ei_des'];
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt_update_ei = $dbcon->prepare("UPDATE efisiensi_irigasi SET rerata_ei_jan = :eijan::numeric, rerata_ei_feb = :eifeb::numeric, rerata_ei_mar = :eimar::numeric, rerata_ei_apr = :eiapr::numeric, rerata_ei_mei = :eimei::numeric, rerata_ei_jun = :eijun::numeric, rerata_ei_jul = :eijul::numeric, rerata_ei_ags = :eiags::numeric, rerata_ei_sept = :eisept::numeric, rerata_ei_okt = :eiokt::numeric, rerata_ei_nov = :einov::numeric, rerata_ei_des = :eides::numeric WHERE ident = :dataid AND tahun = :tahun");
  $stmt_update_ei->bindValue(":eijan", $_data_jan, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eifeb", $_data_feb, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eimar", $_data_mar, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eiapr", $_data_apr, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eimei", $_data_mei, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eijun", $_data_jun, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eijul", $_data_jul, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eiags", $_data_ags, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eisept", $_data_sept, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eiokt", $_data_okt, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":einov", $_data_nov, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":eides", $_data_des, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":dataid", $dataid, PDO::PARAM_STR);
  $stmt_update_ei->bindValue(":tahun", $tahun, PDO::PARAM_STR);
  if($stmt_update_ei->execute()){
    $stmt_update_ei_dr = $dbcon->prepare("UPDATE data_dr SET rerata_ei_jan = :eijan::numeric, rerata_ei_feb = :eifeb::numeric, rerata_ei_mar = :eimar::numeric, rerata_ei_apr = :eiapr::numeric, rerata_ei_mei = :eimei::numeric, rerata_ei_jun = :eijun::numeric, rerata_ei_jul = :eijul::numeric, rerata_ei_ags = :eiags::numeric, rerata_ei_sept = :eisept::numeric, rerata_ei_okt = :eiokt::numeric, rerata_ei_nov = :einov::numeric, rerata_ei_des = :eides::numeric WHERE identpetak = :dataid AND tahun = :tahun");
    $stmt_update_ei_dr->bindValue(":eijan", $_data_jan, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eifeb", $_data_feb, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eimar", $_data_mar, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eiapr", $_data_apr, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eimei", $_data_mei, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eijun", $_data_jun, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eijul", $_data_jul, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eiags", $_data_ags, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eisept", $_data_sept, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eiokt", $_data_okt, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":einov", $_data_nov, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":eides", $_data_des, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":dataid", $dataid, PDO::PARAM_STR);
    $stmt_update_ei_dr->bindValue(":tahun", $tahun, PDO::PARAM_STR);
    if($stmt_update_ei_dr->execute()){
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
          $response = array("response"=>4045,"message"=>$e->getMessage());
          header('Content-Type: application/json');
          echo json_encode($response);
          $dbcon = null;
          exit;
        }
      } else {
        $response = array("response"=>4044,"message"=>$e->getMessage());
        header('Content-Type: application/json');
        echo json_encode($response);
        $dbcon = null;
        exit;
      }
    } else {
      $response = array("response"=>4041,"message"=>$e->getMessage());
      header('Content-Type: application/json');
      echo json_encode($response);
      $dbcon = null;
      exit;
    }
  } else {
    $response = array("response"=>4041,"message"=>$e->getMessage());
    header('Content-Type: application/json');
    echo json_encode($response);
    $dbcon = null;
    exit;
  }
} catch (PDOException $e) {
  $response = array("response"=>4040,"message"=>$e->getMessage());
	header('Content-Type: application/json');
	echo json_encode($response);
	$dbcon = null;
	exit;
}
?>