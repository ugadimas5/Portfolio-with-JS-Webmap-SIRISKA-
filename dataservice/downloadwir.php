<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$geojson = array(
	 'type'      => 'FeatureCollection',
	 'features'  => array()
);
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbcon->prepare("SELECT mt_wir.gid, COALESCE(mt_wir.nama_di,'-') AS nama_di, COALESCE(mt_wir.desa,'-') AS desa, COALESCE(mt_wir.kecamatan,'-') AS kecamatan, COALESCE(mt_wir.wir_jan,'0') AS wir_jan, COALESCE(mt_wir.wir_feb,'0') AS wir_feb, COALESCE(mt_wir.wir_mar,'0') AS wir_mar, COALESCE(mt_wir.wir_apr,'0') AS wir_apr, COALESCE(mt_wir.wir_mei,'0') AS wir_mei, COALESCE(mt_wir.wir_jun,'0') AS wir_jun, COALESCE(mt_wir.wir_jul,'0') AS wir_jul, COALESCE(mt_wir.wir_ags,'0') AS wir_ags, COALESCE(mt_wir.wir_sept,'0') AS wir_sept, COALESCE(mt_wir.wir_okt,'0') AS wir_okt, COALESCE(mt_wir.wir_nov,'0') AS wir_nov, COALESCE(mt_wir.wir_des,'0') AS wir_des, public.ST_AsGeoJSON(public.ST_Transform((irigasi_petak.geom),4326),6) AS geojson FROM mt_wir LEFT JOIN irigasi_petak ON mt_wir.ident = irigasi_petak.ident");
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
    $filename = strval("kehilangan_air_".Date('Y')."_".Date('dmY_His').".json");
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
    $filename = strval("kehilangan_air_".Date('Y')."_".Date('dmY_His').".json");
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
  $filename = strval("kehilangan_air_".Date('Y')."_".Date('dmY_His').".json");
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