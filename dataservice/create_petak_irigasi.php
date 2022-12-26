<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
if (isset($_POST['command'])) {
	if ($_POST['command']=="POLYGON") {
    $identstr = substr(md5(Date('YmdHis')),0,-20);
    $luas = $_POST['luas'];
    $kecamatan = $_POST['kecamatan'];
    $desa = $_POST['desa'];
    $cnamadi = $_POST['namadi'];
    $anamadi = explode("|", $cnamadi);
    $namadi = $anamadi[1];
    $namapemilik = $_POST['namapemilik'];
		$geometry = $_POST['geometry'];
    $tahun = $_POST['tahun'];
    $_gid = 0;
		try {
			$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
			$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$stmt = $dbcon->prepare("INSERT INTO irigasi_petak(ident, kecamatan, desa, luas, nama_di, pemilik, geom) VALUES(:ident, :kecamatan, :desa, CAST(:luas AS NUMERIC), :namadi, :namapemilik, ST_Multi(ST_Transform(ST_GeomFromText(:geometry, 4326), 32749)))");
			$stmt->bindValue(":ident", $identstr, PDO::PARAM_STR);
      $stmt->bindValue(":kecamatan", $kecamatan, PDO::PARAM_STR);
      $stmt->bindValue(":desa", $desa, PDO::PARAM_STR);
      $stmt->bindValue(":luas", $luas, PDO::PARAM_STR);
      $stmt->bindValue(":namadi", $namadi, PDO::PARAM_STR);
      $stmt->bindValue(":namapemilik", $namapemilik, PDO::PARAM_STR);
			$stmt->bindValue(":geometry", $geometry, PDO::PARAM_STR);
			if($stmt->execute()){
        $stmt_evapotranspirasi = $dbcon->prepare("INSERT INTO pl_mt_eto(ident,kecamatan,desa,nama_di,tahun,geom) VALUES(:ident, :kecamatan, :desa, :namadi, :tahun, ST_Multi(ST_Transform(ST_GeomFromText(:geometry, 4326), 32749)))");
        $stmt_evapotranspirasi->bindValue(":ident", $identstr, PDO::PARAM_STR);
        $stmt_evapotranspirasi->bindValue(":kecamatan", $kecamatan, PDO::PARAM_STR);
        $stmt_evapotranspirasi->bindValue(":desa", $desa, PDO::PARAM_STR);
        $stmt_evapotranspirasi->bindValue(":namadi", $namadi, PDO::PARAM_STR);
        $stmt_evapotranspirasi->bindValue(":tahun", $tahun, PDO::PARAM_STR);
        $stmt_evapotranspirasi->bindValue(":geometry", $geometry, PDO::PARAM_STR);
        if($stmt_evapotranspirasi->execute()){
          $stmt_che = $dbcon->prepare("INSERT INTO pl_mt_che(ident,kecamatan,desa,nama_di,tahun,geom) VALUES(:ident, :kecamatan, :desa, :namadi, :tahun, ST_Multi(ST_Transform(ST_GeomFromText(:geometry, 4326), 32749)))");
          $stmt_che->bindValue(":ident", $identstr, PDO::PARAM_STR);
          $stmt_che->bindValue(":kecamatan", $kecamatan, PDO::PARAM_STR);
          $stmt_che->bindValue(":desa", $desa, PDO::PARAM_STR);
          $stmt_che->bindValue(":namadi", $namadi, PDO::PARAM_STR);
          $stmt_che->bindValue(":tahun", $tahun, PDO::PARAM_STR);
          $stmt_che->bindValue(":geometry", $geometry, PDO::PARAM_STR);
          if($stmt_che->execute()){
            $stmt_porositas = $dbcon->prepare("INSERT INTO pl_mt_porositas(ident,kecamatan,desa,nama_di,tahun,geom) VALUES(:ident, :kecamatan, :desa, :namadi, :tahun, ST_Multi(ST_Transform(ST_GeomFromText(:geometry, 4326), 32749)))");
            $stmt_porositas->bindValue(":ident", $identstr, PDO::PARAM_STR);
            $stmt_porositas->bindValue(":kecamatan", $kecamatan, PDO::PARAM_STR);
            $stmt_porositas->bindValue(":desa", $desa, PDO::PARAM_STR);
            $stmt_porositas->bindValue(":namadi", $namadi, PDO::PARAM_STR);
            $stmt_porositas->bindValue(":tahun", $tahun, PDO::PARAM_STR);
            $stmt_porositas->bindValue(":geometry", $geometry, PDO::PARAM_STR);
            if($stmt_porositas->execute()){
              $stmt_kehilanganair = $dbcon->prepare("INSERT INTO mt_wir(ident,kecamatan,desa,nama_di,tahun,geom) VALUES(:ident, :kecamatan, :desa, :namadi, :tahun, ST_Multi(ST_Transform(ST_GeomFromText(:geometry, 4326), 32749)))");
              $stmt_kehilanganair->bindValue(":ident", $identstr, PDO::PARAM_STR);
              $stmt_kehilanganair->bindValue(":kecamatan", $kecamatan, PDO::PARAM_STR);
              $stmt_kehilanganair->bindValue(":desa", $desa, PDO::PARAM_STR);
              $stmt_kehilanganair->bindValue(":namadi", $namadi, PDO::PARAM_STR);
              $stmt_kehilanganair->bindValue(":tahun", $tahun, PDO::PARAM_STR);
              $stmt_kehilanganair->bindValue(":geometry", $geometry, PDO::PARAM_STR);
              if($stmt_kehilanganair->execute()){
                $stmt_data_nfr = $dbcon->prepare("INSERT INTO data_nfr(identpetak,tahun,luas,eto_jan,eto_feb,eto_mar,eto_apr,eto_mei,eto_jun,eto_jul,eto_ags,eto_sept,eto_okt,eto_nov,eto_des,che_jan,che_feb,che_mar,che_apr,che_mei,che_jun,che_jul,che_ags,che_sept,che_okt,che_nov,che_des,por_jan,por_feb,por_mar,por_apr,por_mei,por_jun,por_jul,por_ags,por_sept,por_okt,por_nov,por_des,wir_jan,wir_feb,wir_mar,wir_apr,wir_mei,wir_jun,wir_jul,wir_ags,wir_sept,wir_okt,wir_nov,wir_des,nfr_jan,nfr_feb,nfr_mar,nfr_apr,nfr_mei,nfr_jun,nfr_jul,nfr_ags,nfr_sept,nfr_okt,nfr_nov,nfr_des) VALUES(:ident, :tahun, :luas, '0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1')");
                $stmt_data_nfr->bindValue(":ident", $identstr, PDO::PARAM_STR);
                $stmt_data_nfr->bindValue(":tahun", $tahun, PDO::PARAM_STR);
                $stmt_data_nfr->bindValue(":luas", $luas, PDO::PARAM_STR);
                if($stmt_data_nfr->execute()){
                  $stmt_data_dr = $dbcon->prepare("INSERT INTO data_dr(identpetak,tahun,luas,nama_di,konst,nfr_jan,nfr_feb,nfr_mar,nfr_apr,nfr_mei,nfr_jun,nfr_jul,nfr_ags,nfr_sept,nfr_okt,nfr_nov,nfr_des,rerata_ei_jan,rerata_ei_feb,rerata_ei_mar,rerata_ei_apr,rerata_ei_mei,rerata_ei_jun,rerata_ei_jul,rerata_ei_ags,rerata_ei_sept,rerata_ei_okt,rerata_ei_nov,rerata_ei_des,dr_jan,dr_feb,dr_mar,dr_apr,dr_mei,dr_jun,dr_jul,dr_ags,dr_sept,dr_okt,dr_nov,dr_des) VALUES(:ident, :tahun, :luas, :namadi, '8.64', '0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1','0.1')");
                  $stmt_data_dr->bindValue(":ident", $identstr, PDO::PARAM_STR);
                  $stmt_data_dr->bindValue(":tahun", $tahun, PDO::PARAM_STR);
                  $stmt_data_dr->bindValue(":luas", $luas, PDO::PARAM_STR);
                  $stmt_data_dr->bindValue(":namadi", $namadi, PDO::PARAM_STR);
                  if($stmt_data_dr->execute()){
                    $stmt_rerata_ei = $dbcon->prepare("UPDATE data_dr SET rerata_ei_jan = efisiensi_irigasi.rerata_ei_jan, rerata_ei_feb = efisiensi_irigasi.rerata_ei_feb, rerata_ei_mar = efisiensi_irigasi.rerata_ei_mar, rerata_ei_apr = efisiensi_irigasi.rerata_ei_apr, rerata_ei_mei = efisiensi_irigasi.rerata_ei_mei, rerata_ei_jun = efisiensi_irigasi.rerata_ei_jun, rerata_ei_jul = efisiensi_irigasi.rerata_ei_jul, rerata_ei_ags = efisiensi_irigasi.rerata_ei_ags, rerata_ei_sept = efisiensi_irigasi.rerata_ei_sept, rerata_ei_okt = efisiensi_irigasi.rerata_ei_okt, rerata_ei_nov = efisiensi_irigasi.rerata_ei_nov, rerata_ei_des = efisiensi_irigasi.rerata_ei_des FROM efisiensi_irigasi WHERE data_dr.nama_di = efisiensi_irigasi.nama_di AND data_dr.nama_di = :namadi");
                    $stmt_rerata_ei->bindValue(":namadi", $namadi, PDO::PARAM_STR);
                    if($stmt_rerata_ei->execute()){
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