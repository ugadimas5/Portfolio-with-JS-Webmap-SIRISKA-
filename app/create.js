function _displayMapCreate (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
	
	var map, isCollapsed, openStreetMaps, googleSatellite, googleStreets, googleHybrid, googleTerrain;
	
	if (document.body.clientWidth <= 767) {
		isCollapsed = true;
	} else {
		isCollapsed = false;
	}
  
  var admindesa = L.geoJson(null, {
      style: function(feature) {
          return {
              stroke: true,
              color: '#0000FF',
              opacity: 1,
              weight: 0.5,
              fill: true,
              fillOpacity: 0
          };
      },
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2'>Batas Wilayah Desa</th></tr></thead><tbody><tr><td>Nama Desa</td><td>" + feature.properties.desa + "</td></tr></tbody></table>");
      }
  });

  var adminkecamatan = L.geoJson(null, {
      style: function(feature) {
          if (feature.properties.kode_kec == '1') {
              return { stroke: true, color: '#543005', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '2') {
              return { stroke: true, color: '#8c510a', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '3') {
              return { stroke: true, color: '#bf812d', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '4') {
              return { stroke: true, color: '#35978f', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '5') {
              return { stroke: true, color: '#01665e', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '6') {
              return { stroke: true, color: '#8e0152', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '7') {
              return { stroke: true, color: '#003c30', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '8') {
              return { stroke: true, color: '#a50026', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '9') {
              return { stroke: true, color: '#d73027', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '10') {
              return { stroke: true, color: '#f46d43', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '11') {
              return { stroke: true, color: '#74add1', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '12') {
              return { stroke: true, color: '#4575b4', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '13') {
              return { stroke: true, color: '#313695', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '14') {
              return { stroke: true, color: '#40004b', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '15') {
              return { stroke: true, color: '#762a83', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else if (feature.properties.kode_kec == '16') {
              return { stroke: true, color: '#7f3b08', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          } else {
              return { stroke: true, color: '#00441b', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
          }
      },
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2'>Batas Wilayah Kecamatan</th></tr></thead><tbody><tr><td>Nama Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr><tr><td>Kode Kabupaten</td><td>" + feature.properties.kode_kab + "</td></tr><tr><td>Kode Kecamatan</td><td>" + feature.properties.kode_kec + "</td></tr></tbody></table>");
      }
  });
  
  $.getJSON("../dataservice/admin_desa.php", function(geojsonadmindesa) {
      admindesa.addData(geojsonadmindesa);
      //batasAdminGroup.addLayer(admindesa);
  });

  $.getJSON("../dataservice/admin_kec.php", function(geojsonadminkecamatan) {
      adminkecamatan.addData(geojsonadminkecamatan);
      //batasAdminGroup.addLayer(adminkecamatan);
  });
  
  var irigasidaerah = L.geoJson(null, {
      style: function(feature) {
          return {
              stroke: true,
              color: '#0000FF',
              opacity: 1,
              weight: 2.5,
              fill: true,
              fillOpacity: 0
          };
      },
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2' class='text-center'>Daerah Irigasi</th></tr></thead><tbody><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Luas DI</td><td>" + feature.properties.shape_area + "</td></tr><tr><td>Panjang DI</td><td>" + feature.properties.shape_leng + "</td></tr><tr><td colspan='2' class='text-center'><img id='" + feature.properties.skema + "' class='gambarskema' src='../assets/img/skema/" + feature.properties.skema + "' width='200'/></td></tr><tr><td colspan='2' class='text-center'><button type='button' class='btn btn-primary btn-sm downloadgambarskema'>Download Skema Irigasi</button></td></tr></tbody></table>");
      }
  });

  var _gambarskema = document.querySelector('.gambarskema');
  /*_gambarskema.addEventListener('click', function(evt) {
      evt.preventDefault();
      var _idgambar = this.getAttribute('id');
      console.log(_idgambar);
  });*/

  var irigasipetak = L.geoJson(null, {
      style: function(feature) {
          return {
              stroke: true,
              color: '#7fbf7b',
              opacity: 1,
              weight: 2.5,
              fill: true,
              fillOpacity: 0
          };
      },
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2' class='text-center'>Petak Irigasi</th></tr></thead><tbody><tr><td>Kode Petak Irigasi</td><td>" + feature.properties.objectid + "</td></tr><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tr><tr><td>Luas Petak Irigasi</td><td>" + feature.properties.luas + "</td></tr><tr><td>Pemilik</td><td>" + feature.properties.pemilik + "</td></tr><tr><td colspan='2' class='text-center'>Download</td></tr><tr><td colspan='2' class='text-center'><button type='button' class='btn btn-primary btn-sm downloadkebutuhanairmasatanam'>Kebutuhan Air Masa Tanam</button></td></tr><tr><td colspan='2' class='text-center'><button type='button' class='btn btn-primary btn-sm downloadkebutuhanairpenyiapanlahan'>Kebutuhan Air Penyiapan Lahan</button></td></tr></tbody></table>");
      }
  });

  var irigasisaluran = L.geoJson(null, {
      style: function(feature) {
          return {
              stroke: true,
              color: '#fc8d59',
              opacity: 1,
              weight: 2.5
          };
      },
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2' class='text-center'>Saluran Irigasi</th></tr></thead><tbody><tr><td>Kode Saluran</td><td>" + feature.properties.k_saluran + "</td></tr><tr><td>Nomenklatur Saluran</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>Detail Saluran</td><td>" + feature.properties.nama + "</td></tr></tr><tr><td>Kondisi Saluran</td><td>" + feature.properties.kondisi + "</td></tr><tr><td>Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tbody></table>");
      }
  });

  var irigasibangunan = L.geoJson(null, {
      pointToLayer: function(feature, latLng) {
          if (feature.properties.k_bangunan == '1-1-1-1-02') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-black.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });
          } else if (feature.properties.k_bangunan == '1-1-1-1-06') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-blue.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-1-07') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-blue-old.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-1-90') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-blue-white.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-1-99') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-brown.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-01') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-brown-white.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-02') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-cyan.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-03') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-cyan-white.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });


          } else if (feature.properties.k_bangunan == '1-1-1-2-04') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-green.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-06') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-green-white.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-07') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-grey.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-08') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-pink.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-09') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-pink-white.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-11') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-purple.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-12') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-purple-white.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-13') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-red.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-14') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-red-white.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-15') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-white.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else if (feature.properties.k_bangunan == '1-1-1-2-16') {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-yellow.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          } else {
              return L.marker(latLng, {
                  icon: L.icon({
                      iconUrl: '../assets/img/bang-yellow-white.png',
                      iconSize: [24, 28],
                      iconAnchor: [12, 28],
                      popupAnchor: [0, -25]
                  }),
                  title: feature.properties.nama,
                  riseOnHover: true
              });

          }
      },
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2' class='text-center'>Bangunan Irigasi</th></tr></thead><tbody><tr><td>Kode Bangunan</td><td>" + feature.properties.k_bangunan + "</td></tr><tr><td>Nomenklatur Bangunan</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>Detail Bangunan</td><td>" + feature.properties.nama + "</td></tr></tr><tr><td>Kondisi Bangunan</td><td>" + feature.properties.kondisi + "</td></tr><tr><td>Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr></tbody></table>");
      }
  });
  
  $.getJSON("../dataservice/irigasi_daerah.php", function(geojsonirigasidaerah) {
      irigasidaerah.addData(geojsonirigasidaerah);
  });

  $.getJSON("../dataservice/irigasi_petak.php", function(geojsonirigasipetak) {
      irigasipetak.addData(geojsonirigasipetak);
  });

  $.getJSON("../dataservice/irigasi_saluran.php", function(geojsonirigasisaluran) {
      irigasisaluran.addData(geojsonirigasisaluran);
  });

  $.getJSON("../dataservice/irigasi_bangunan.php", function(geojsonirigasibangunan) {
      irigasibangunan.addData(geojsonirigasibangunan);
  });

	openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		minZoom: 3, 
		maxZoom: 20, 
		attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
	});
  
  var southWest = L.latLng(-8.1601552157, 109.6113097668),
      northEast = L.latLng(-6.312888204, 111.9678771496),
      maxBoundingBox = L.latLngBounds(southWest, northEast);

  googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxBounds: maxBoundingBox,
      minZoom: 8,
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
  });
  googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxBounds: maxBoundingBox,
      minZoom: 8,
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
  });
  googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxBounds: maxBoundingBox,
      minZoom: 8,
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
  });
  googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      maxBounds: maxBoundingBox,
      minZoom: 8,
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
  });
	
	map = L.map("map", {
		zoom: 11,
		center: [-7.615811, 111.026756],
		layers: [openStreetMaps],
		zoomControl: false,
		attributionControl: true
	});
	
	map.setMaxBounds([[-12.6406520507, 94.1211943626], [7.4970404951, 142.1802794933]]);

	var zoomControl = L.control.zoom({
		position: "topleft"
	}).addTo(map);
  
  var loadingControl = L.Control.loading({
    separate: true
  });
  map.addControl(loadingControl);

	var baseLayers = {
    "Google Satellite": googleSatellite,
    "Google Hybrid": googleHybrid,
    "Google Streets": googleStreets,
    "Google Terrain": googleTerrain,
		"OpenStreetMap": openStreetMaps
	};
	
	var overlayLayers = {
    "Batas Wilayah Administrasi": {
      "Admin Kecamatan": adminkecamatan,
      "Admin Desa": admindesa
    },
    "Data Irigasi": {
      "Daerah Irigasi": irigasidaerah,
      "Petak Irigasi": irigasipetak,
      "Saluran Irigasi": irigasisaluran,
      "Bangunan Irigasi": irigasibangunan
    }
	};
	
	var layerControl = L.control.groupedLayers(baseLayers, overlayLayers,  {
		collapsed: isCollapsed
	}).addTo(map);
	
	var attributionControl = L.control({
		position: "bottomright"
	});
  
  /* Digitize Function */
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);
  
  var drawControl = new L.Control.Draw({
    draw: {
      position: 'topleft',
      polyline: true,
      polygon: true,
      rectangle: false,
      circle: false,
      marker: true,
      circlemarker: false
    },
    edit: false
  });
  
  map.addControl(drawControl);
  
  map.on('draw:created', function (e) {
    var type = e.layerType, 
      layer = e.layer;
      
    var drawnJSONObject = layer.toGeoJSON();
    var objectGeometry = Terraformer.WKT.convert(drawnJSONObject.geometry);
    
    if (type === 'polyline') {
      _buildDigitiseModalBox('modalform','LINESTRING',objectGeometry);
    } else if (type === 'polygon') {
      _buildDigitiseModalBox('modalform','POLYGON',objectGeometry);
    } else if (type === 'marker') {
      _buildDigitiseModalBox('modalform','POINT',objectGeometry);
    } else {
      console.log('__undefined__');
    }
    drawnItems.addLayer(layer);
  });
  
  $("#modalform").on('shown.bs.modal', function(){
    _activateFeatureSave();
  });
}
