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
	$stmt = $dbcon->prepare("SELECT pl_mt_porositas.gid, COALESCE(pl_mt_porositas.nama_di,'-') AS nama_di, COALESCE(pl_mt_porositas.desa,'-') AS desa, COALESCE(pl_mt_porositas.kecamatan,'-') AS kecamatan, COALESCE(pl_mt_porositas.por_jan,'0') AS por_jan, COALESCE(pl_mt_porositas.por_feb,'0') AS por_feb, COALESCE(pl_mt_porositas.por_mar,'0') AS por_mar, COALESCE(pl_mt_porositas.por_apr,'0') AS por_apr, COALESCE(pl_mt_porositas.por_mei,'0') AS por_mei, COALESCE(pl_mt_porositas.por_jun,'0') AS por_jun, COALESCE(pl_mt_porositas.por_jul,'0') AS por_jul, COALESCE(pl_mt_porositas.por_ags,'0') AS por_ags, COALESCE(pl_mt_porositas.por_sept,'0') AS por_sept, COALESCE(pl_mt_porositas.por_okt,'0') AS por_okt, COALESCE(pl_mt_porositas.por_nov,'0') AS por_nov, COALESCE(pl_mt_porositas.por_des,'0') AS por_des, public.ST_AsGeoJSON(public.ST_Transform((irigasi_petak.geom),4326),6) AS geojson FROM pl_mt_porositas LEFT JOIN irigasi_petak ON pl_mt_porositas.ident = irigasi_petak.ident");
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
    $filename = strval("porositas_tanah_".Date('Y')."_".Date('dmY_His').".json");
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
    $filename = strval("porositas_tanah_".Date('Y')."_".Date('dmY_His').".json");
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
  $filename = strval("porositas_tanah_".Date('Y')."_".Date('dmY_His').".json");
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