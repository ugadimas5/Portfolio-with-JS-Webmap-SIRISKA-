<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
if (isset($_POST['command'])) {
	if ($_POST['command']=="LINESTRING") {
    $identstr = substr(md5(Date('YmdHis')),0,-20);
    $nourut = $_POST['nourut'];
    $kecamatan = $_POST['kecamatan'];
    $desa = $_POST['desa'];
		$kodesaluran = $_POST['kodesaluran'];
    $namasaluran = $_POST['namasaluran'];
    $cnamadi = $_POST['namadi'];
    $anamadi = explode("|", $cnamadi);
    $namadi = $anamadi[1];
    $nomenklatur = $_POST['nomenklatur'];
    $kondisi = $_POST['kondisi'];
		$geometry = $_POST['geometry'];
    $tahun = $_POST['tahun'];
    $_gid = 0;
		try {
			$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
			$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $dbcon->prepare("INSERT INTO irigasi_saluran(ident, k_saluran, nama, nomenklatu, nama_di, kecamatan, desa, kondisi, geom) VALUES(:ident, :kodesaluran, :namasaluran, :nomenklatur, :namadi, :kecamatan, :desa, :kondisi, ST_Multi(ST_Transform(ST_GeomFromText(:geometry, 4326), 32749)))");
			$stmt->bindValue(":ident", $identstr, PDO::PARAM_STR);
      $stmt->bindValue(":kodesaluran", $kodesaluran, PDO::PARAM_STR);
      $stmt->bindValue(":namasaluran", $namasaluran, PDO::PARAM_STR);
      $stmt->bindValue(":namadi", $namadi, PDO::PARAM_STR);
      $stmt->bindValue(":nomenklatur", $nomenklatur, PDO::PARAM_STR);
      $stmt->bindValue(":kondisi", $kondisi, PDO::PARAM_STR);
      $stmt->bindValue(":kecamatan", $kecamatan, PDO::PARAM_STR);
      $stmt->bindValue(":desa", $desa, PDO::PARAM_STR);
			$stmt->bindValue(":geometry", $geometry, PDO::PARAM_STR);
			if($stmt->execute()){
        $stmt_get_gid = $dbcon->prepare("SELECT gid FROM irigasi_saluran WHERE ident = :ident");
        $stmt_get_gid->bindValue(":ident", $identstr, PDO::PARAM_STR);
        if($stmt_get_gid->execute()){
          while($rowset_get_gid = $stmt_get_gid->fetch(PDO::FETCH_ASSOC)){
            $_gid = $rowset_get_gid['gid'];
          }
          $stmt_efisiensi = $dbcon->prepare("INSERT INTO efisiensi_irigasi(objectid,ident,k_saluran,urut,nomenklatu,nama_di,desa,kecamatan,tahun,geom) VALUES(:objectid, :ident, :kodesaluran, :nourut, :nomenklatur, :namadi, :desa, :kecamatan, :tahun, ST_Multi(ST_Transform(ST_GeomFromText(:geometry, 4326), 32749)))");
          $stmt_efisiensi->bindValue(":objectid", $_gid, PDO::PARAM_INT);
          $stmt_efisiensi->bindValue(":ident", $identstr, PDO::PARAM_STR);
          $stmt_efisiensi->bindValue(":kodesaluran", $kodesaluran, PDO::PARAM_STR);
          $stmt_efisiensi->bindValue(":nourut", $nourut, PDO::PARAM_STR);
          $stmt_efisiensi->bindValue(":nomenklatur", $nomenklatur, PDO::PARAM_STR);
          $stmt_efisiensi->bindValue(":namadi", $namadi, PDO::PARAM_STR);
          $stmt_efisiensi->bindValue(":desa", $desa, PDO::PARAM_STR);
          $stmt_efisiensi->bindValue(":kecamatan", $kecamatan, PDO::PARAM_STR);
          $stmt_efisiensi->bindValue(":tahun", $tahun, PDO::PARAM_STR);
          $stmt_efisiensi->bindValue(":geometry", $geometry, PDO::PARAM_STR);
          if($stmt_efisiensi->execute()){
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
        } else {
          $response = array("response"=>"500","message"=>$e->getMessage());
          header('Content-Type: application/json');
          echo json_encode($response);
          $dbcon = null;
          exit;
        }
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