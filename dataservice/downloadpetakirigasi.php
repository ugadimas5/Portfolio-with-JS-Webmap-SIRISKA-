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
	$stmt = $dbcon->prepare("SELECT gid, objectid, nama_di, desa, kecamatan, luas, pemilik, ident, public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson FROM irigasi_petak");
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
    $filename = strval("petak_irigasi_".Date('Y')."_".Date('dmY_His').".json");
    $jsonfile = fopen("../admin-data/download/".$filename, 'w') or die("Unable to open file!");
    fwrite($jsonfile, json_encode($geojson, JSON_PRETTY_PRINT));
    fclose($jsonfile);
    header('Content-Description: File Transfer');
    header("Content-Type: application/force-download");
    header('Content-Disposition: attachment; filename='.basename($filename));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize("../admin-data/download/".$filename));
    readfile("../admin-data/download/".$filename);
    $dbcon = null;
		exit;
	} else {
    $filename = strval("petak_irigasi_".Date('Y')."_".Date('dmY_His').".json");
    $jsonfile = fopen("../admin-data/download/".$filename, 'w') or die("Unable to open file!");
    fwrite($jsonfile, json_encode($geojson, JSON_PRETTY_PRINT));
    fclose($jsonfile);
    header('Content-Description: File Transfer');
    header("Content-Type: application/force-download");
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
  $filename = strval("petak_irigasi_".Date('Y')."_".Date('dmY_His').".json");
  $jsonfile = fopen("../admin-data/download/".$filename, 'w') or die("Unable to open file!");
  fwrite($jsonfile, json_encode($geojson, JSON_PRETTY_PRINT));
  fclose($jsonfile);
  header('Content-Description: File Transfer');
  header("Content-Type: application/force-download");
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