<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$_dataid = $_GET['dataid'];
$geojson = array(
	 'type'      => 'FeatureCollection',
	 'features'  => array()
);
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbcon->prepare("SELECT pl_mt_che.gid, COALESCE(pl_mt_che.nama_di,'-') AS nama_di, COALESCE(pl_mt_che.desa,'-') AS desa, COALESCE(pl_mt_che.kecamatan,'-') AS kecamatan, COALESCE(pl_mt_che.che_jan,'0') AS che_jan, COALESCE(pl_mt_che.che_feb,'0') AS che_feb, COALESCE(pl_mt_che.che_mar,'0') AS che_mar, COALESCE(pl_mt_che.che_apr,'0') AS che_apr, COALESCE(pl_mt_che.che_mei,'0') AS che_mei, COALESCE(pl_mt_che.che_jun,'0') AS che_jun, COALESCE(pl_mt_che.che_jul,'0') AS che_jul, COALESCE(pl_mt_che.che_ags,'0') AS che_ags, COALESCE(pl_mt_che.che_sept,'0') AS che_sept, COALESCE(pl_mt_che.che_okt,'0') AS che_okt, COALESCE(pl_mt_che.che_nov,'0') AS che_nov, COALESCE(pl_mt_che.che_des,'0') AS che_des, public.ST_AsGeoJSON(public.ST_Transform((irigasi_petak.geom),4326),6) AS geojson FROM pl_mt_che LEFT JOIN irigasi_petak ON pl_mt_che.ident = irigasi_petak.ident WHERE pl_mt_che.ident = :identobj");
	$stmt->bindValue(":identobj", $_dataid, PDO::PARAM_STR);
  if($stmt->execute()){
		$id_count = 0;
		while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
			$properties = $rowset;
			unset($properties['geojson']);
			unset($properties['geom']);
				$feature = array(
						 'type' => 'Feature',
						 'id' => $id_count,
						 'properties' => $properties,
						 'geometry' => json_decode($rowset['geojson'], true)
				);
			array_push($geojson['features'], $feature);
			$id_count++;
		}
    $filename = strval("curah_hujan_efektif_".Date('Y')."_".Date('dmY_His').".json");
    $jsonfile = fopen("../admin-data/download/".$filename, 'w') or die("Unable to open file!");
    fwrite($jsonfile, json_encode($geojson, JSON_PRETTY_PRINT));
    fclose($jsonfile);
    header('Content-Description: File Transfer');
    header("Content-Type: application/octet-stream");
    header('Content-Disposition: attachment; filename='.basename($filename));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize("../admin-data/download/".$filename));
    readfile("../admin-data/download/".$filename);
    $dbcon = null;
		exit;
	} else {
    $filename = strval("curah_hujan_efektif_".Date('Y')."_".Date('dmY_His').".json");
    $jsonfile = fopen("../admin-data/download/".$filename, 'w') or die("Unable to open file!");
    fwrite($jsonfile, json_encode($geojson, JSON_PRETTY_PRINT));
    fclose($jsonfile);
    header('Content-Description: File Transfer');
    header("Content-Type: application/octet-stream");
    header('Content-Disposition: attachment; filename='.basename($filename));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize("../admin-data/download/".$filename));
    readfile("../admin-data/download/".$filename);
    $dbcon = null;
		exit;
	}
} catch (PDOException $e) {
  $filename = strval("curah_hujan_efektif_".Date('Y')."_".Date('dmY_His').".json");
  $jsonfile = fopen("../admin-data/download/".$filename, 'w') or die("Unable to open file!");
  fwrite($jsonfile, json_encode($geojson, JSON_PRETTY_PRINT));
  fclose($jsonfile);
  header('Content-Description: File Transfer');
  header("Content-Type: application/octet-stream");
  header('Content-Disposition: attachment; filename='.basename($filename));
  header('Expires: 0');
  header('Cache-Control: must-revalidate');
  header('Pragma: public');
  header('Content-Length: ' . filesize("../admin-data/download/".$filename));
  readfile("../admin-data/download/".$filename);
  $dbcon = null;
  exit;
}
?>