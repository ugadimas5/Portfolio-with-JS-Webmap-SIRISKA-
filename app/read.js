function _displayMapRead (divtarget) {
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
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2' class='text-center'>Batas Wilayah Desa</th></tr></thead><tbody><tr><td>Nama Desa</td><td>" + feature.properties.desa + "</td></tr></tbody></table>");
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
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2' class='text-center'>Batas Wilayah Kecamatan</th></tr></thead><tbody><tr><td>Nama Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr><tr><td>Kode Kabupaten</td><td>" + feature.properties.kode_kab + "</td></tr><tr><td>Kode Kecamatan</td><td>" + feature.properties.kode_kec + "</td></tr></tbody></table>");
      }
  });
  
  $.getJSON("./dataservice/admin_desa.php", function(geojsonadmindesa) {
      admindesa.addData(geojsonadmindesa);
      //batasAdminGroup.addLayer(admindesa);
  });

  $.getJSON("./dataservice/admin_kec.php", function(geojsonadminkecamatan) {
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
      layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2' class='text-center'>Daerah Irigasi</th></tr></thead><tbody><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Luas DI</td><td>" + feature.properties.shape_area + "</td></tr><tr><td>Panjang DI</td><td>" + feature.properties.shape_leng + "</td></tr><tr><td colspan='2' class='text-center'><img id='" + feature.properties.skema + "' class='gambarskema' src='assets/img/skema/" + feature.properties.skema + "' width='200'/></td></tr><tr><td colspan='2' class='text-center'><button type='button' id='downloadschema' class='btn btn-primary btn-sm downloadgambarskema'>Download Skema Irigasi</button></td></tr></tbody></table>");
      layer.on({
        click: function (e) {
          _readDownloadSchema(feature.properties.skema);
        }
      });
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
      layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><input type='hidden' id='objectident' value='"+feature.properties.ident+"'/><thead><tr><th colspan='2' class='text-center'>Petak Irigasi</th></tr></thead><tbody><tr><td>Kode Petak Irigasi</td><td>" + feature.properties.objectid + "</td></tr><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tr><tr><td>Luas Petak Irigasi</td><td>" + feature.properties.luas + "</td></tr><tr><td>Pemilik</td><td>" + feature.properties.pemilik + "</td></tr><tr><td colspan='2' class='text-center'>Download</td></tr><tr><td colspan='2' class='text-center'><button type='button' id='downloadpdf' class='btn btn-primary btn-sm'>Kebutuhan Air Masa Tanam</button></td></tr></tbody></table>");
      layer.on({
        click: function (e) {
          _readDownloadPDFDRData(feature.properties.ident);
        }
      });
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
                      iconUrl: 'assets/img/bang-black.png',
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
                      iconUrl: 'assets/img/bang-blue.png',
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
                      iconUrl: 'assets/img/bang-blue-old.png',
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
                      iconUrl: 'assets/img/bang-blue-white.png',
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
                      iconUrl: 'assets/img/bang-brown.png',
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
                      iconUrl: 'assets/img/bang-brown-white.png',
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
                      iconUrl: 'assets/img/bang-cyan.png',
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
                      iconUrl: 'assets/img/bang-cyan-white.png',
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
                      iconUrl: 'assets/img/bang-green.png',
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
                      iconUrl: 'assets/img/bang-green-white.png',
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
                      iconUrl: 'assets/img/bang-grey.png',
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
                      iconUrl: 'assets/img/bang-pink.png',
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
                      iconUrl: 'assets/img/bang-pink-white.png',
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
                      iconUrl: 'assets/img/bang-purple.png',
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
                      iconUrl: 'assets/img/bang-purple-white.png',
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
                      iconUrl: 'assets/img/bang-red.png',
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
                      iconUrl: 'assets/img/bang-red-white.png',
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
                      iconUrl: 'assets/img/bang-white.png',
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
                      iconUrl: 'assets/img/bang-yellow.png',
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
                      iconUrl: 'assets/img/bang-yellow-white.png',
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
  
  $.getJSON("./dataservice/irigasi_daerah.php", function(geojsonirigasidaerah) {
      irigasidaerah.addData(geojsonirigasidaerah);
  });

  $.getJSON("./dataservice/irigasi_petak.php", function(geojsonirigasipetak) {
      irigasipetak.addData(geojsonirigasipetak);
  });

  $.getJSON("./dataservice/irigasi_saluran.php", function(geojsonirigasisaluran) {
      irigasisaluran.addData(geojsonirigasisaluran);
  });

  $.getJSON("./dataservice/irigasi_bangunan.php", function(geojsonirigasibangunan) {
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
}

function _displayMapReadLoggedIn (divtarget) {
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
      layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2' class='text-center'>Daerah Irigasi</th></tr></thead><tbody><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Luas DI</td><td>" + feature.properties.shape_area + "</td></tr><tr><td>Panjang DI</td><td>" + feature.properties.shape_leng + "</td></tr><tr><td colspan='2' class='text-center'><img id='" + feature.properties.skema + "' class='gambarskema' src='../assets/img/skema/" + feature.properties.skema + "' width='200'/></td></tr><tr><td colspan='2' class='text-center'><button type='button' id='downloadschema' class='btn btn-primary btn-sm downloadgambarskema'>Download Skema Irigasi</button></td></tr></tbody></table>");
      layer.on({
        click: function (e) {
          _readDownloadSchemaLoggedIn(feature.properties.skema);
        }
      });
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
      layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2' class='text-center'>Petak Irigasi</th></tr></thead><tbody><tr><td>Kode Petak Irigasi</td><td>" + feature.properties.objectid + "</td></tr><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tr><tr><td>Luas Petak Irigasi</td><td>" + feature.properties.luas + "</td></tr><tr><td>Pemilik</td><td>" + feature.properties.pemilik + "</td></tr><tr><td colspan='2' class='text-center'>Download</td></tr><tr><td colspan='2' class='text-center'><button type='button' id='downloadpdf' class='btn btn-primary btn-sm'>Kebutuhan Air Masa Tanam</button></td></tr></tbody></table>");
      layer.on({
        click: function (e) {
          _readDownloadPDFDRDataLoggedIn(feature.properties.ident);
        }
      });
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
}

function _displayMapUpdateParamsKebAir (divtarget) {
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
  });

  $.getJSON("../dataservice/admin_kec.php", function(geojsonadminkecamatan) {
    adminkecamatan.addData(geojsonadminkecamatan);
  });

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
      onEachFeature: function(feature, layer){
        layer.bindPopup(null, {closeButton:true,maxWidth:320});
        layer.on({
          click: function(e){
            var thisPopup = e.target.getPopup();
            var content = "<input type='hidden' id='objectid' value='"+feature.properties.ident+"'/><table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2'>Petak Irigasi</th></tr></thead><tbody><tr><td>Kode Petak Irigasi</td><td>" + feature.properties.objectid + "</td></tr><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tr><tr><td>Luas Petak Irigasi</td><td>" + feature.properties.luas + "</td></tr><tr><td>Pemilik</td><td>" + feature.properties.pemilik + "</td></tr><tr><td colspan='2' class='text-center'>Pembaruan Data</td></tr><tr><td colspan='2' class='text-center'><button type='button' class='btn btn-primary btn-sm' onclick='_updateEvapotranspirasi()'>Evapotranspirasi</button></td></tr><tr><td colspan='2' class='text-center'><button type='button' class='btn btn-primary btn-sm' onclick='_updatePorositas()'>Porositas Tanah</button></td></tr><tr><td colspan='2' class='text-center'><button type='button' id='update-curahhujanefektif' class='btn btn-primary btn-sm' onclick='_updateCurahHujanEfektif()'>Curah Hujan Efektif</button></td></tr><tr><td colspan='2' class='text-center'><button type='button' id='update-kehilanganair' class='btn btn-primary btn-sm' onclick='_updateKehilanganair()'>Kehilangan Air</button></td></tr></tbody></table>";
            thisPopup.setContent(content);
            thisPopup.update();
          }
        });
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
          layer.bindPopup("<input type='hidden' id='objectid' value='"+feature.properties.ident+"'/><table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2'>Saluran Irigasi</th></tr></thead><tbody><tr><td>Kode Saluran</td><td>" + feature.properties.k_saluran + "</td></tr><tr><td>Nomenklatur Saluran</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>Detail Saluran</td><td>" + feature.properties.nama + "</td></tr></tr><tr><td>Kondisi Saluran</td><td>" + feature.properties.kondisi + "</td></tr><tr><td>Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr><tr><td colspan='2' class='text-center'>Pembaruan Data</td></tr><tr><td colspan='2' class='text-center'><button type='button' class='btn btn-primary btn-sm' onclick='_updateEfisiensiIrigasi()'>Efisiensi Irigasi</button></td></tr></tbody></table>");
      }
  });

  $.getJSON("../dataservice/irigasi_petak.php", function(geojsonirigasipetak) {
      irigasipetak.addData(geojsonirigasipetak);
  });

  $.getJSON("../dataservice/irigasi_saluran.php", function(geojsonirigasisaluran) {
      irigasisaluran.addData(geojsonirigasisaluran);
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
    "Pembaruan Parameter Kebutuhan Air": {
      "Petak Irigasi": irigasipetak,
      "Saluran Irigasi": irigasisaluran
    }
	};
	
	var layerControl = L.control.groupedLayers(baseLayers, overlayLayers,  {
		collapsed: isCollapsed
	}).addTo(map);
	
	var attributionControl = L.control({
		position: "bottomright"
	});
}

function _displayMapUpdateDataIrigasi (divtarget) {
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
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2'>Daerah Irigasi</th></tr></thead><tbody><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Luas DI</td><td>" + feature.properties.shape_area + "</td></tr><tr><td>Panjang DI</td><td>" + feature.properties.shape_leng + "</td></tr><tr><td colspan='2' class='text-center'><img id='" + feature.properties.skema + "' class='gambarskema' src='assets/img/skema/" + feature.properties.skema + "' width='200'/></td></tr><tr><td colspan='2' class='text-center'><button type='button' class='btn btn-primary btn-sm downloadgambarskema'>Download Skema Irigasi</button></td></tr></tbody></table>");
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
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2'>Petak Irigasi</th></tr></thead><tbody><tr><td>Kode Petak Irigasi</td><td>" + feature.properties.objectid + "</td></tr><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tr><tr><td>Luas Petak Irigasi</td><td>" + feature.properties.luas + "</td></tr><tr><td>Pemilik</td><td>" + feature.properties.pemilik + "</td></tr><tr><td colspan='2' class='text-center'>Download</td></tr><tr><td colspan='2' class='text-center'><button type='button' class='btn btn-primary btn-sm downloadkebutuhanairmasatanam'>Kebutuhan Air Masa Tanam</button></td></tr><tr><td colspan='2' class='text-center'><button type='button' class='btn btn-primary btn-sm downloadkebutuhanairpenyiapanlahan'>Kebutuhan Air Penyiapan Lahan</button></td></tr></tbody></table>");
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
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2'>Saluran Irigasi</th></tr></thead><tbody><tr><td>Kode Saluran</td><td>" + feature.properties.k_saluran + "</td></tr><tr><td>Nomenklatur Saluran</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>Detail Saluran</td><td>" + feature.properties.nama + "</td></tr></tr><tr><td>Kondisi Saluran</td><td>" + feature.properties.kondisi + "</td></tr><tr><td>Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tbody></table>");
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
          layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><thead><tr><th colspan='2'>Bangunan Irigasi Irigasi</th></tr></thead><tbody><tr><td>Kode Bangunan</td><td>" + feature.properties.k_bangunan + "</td></tr><tr><td>Nomenklatur Bangunan</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>Detail Bangunan</td><td>" + feature.properties.nama + "</td></tr></tr><tr><td>Kondisi Bangunan</td><td>" + feature.properties.kondisi + "</td></tr><tr><td>Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tbody></table>");
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
	
	var promisePoint = $.ajax({
		url: "../dataservice/read_point.php",
		method: "GET",
		dataType: "json",
		data: {command:"POINT"},
		username: null,
		password: null
	});
	
	var pointObjects = L.geoJson(null, {
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				layer.on({
					click: function (e) {
						var htmlformcomponent = "" +
								"<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
									"<thead>" +
										"<tr>" +
											"<th colspan='2' class='text-center'>Feature Data</th>" +
										"</tr>" +
									"</thead>" +
									"<tbody>" +
										"<tr>" +
											"<td class=''>Notes</td>" +
											"<td class=''><strong>"+feature.properties.notes+"</strong></td>" +
										"</tr>" +
									"</tbody>" +
								"</table>" +
							"";
						$("#app_modal_body").empty();
						$("#app_modal_body").removeClass().addClass('modal-body');
						$("#app_modal_size").removeClass().addClass('modal-dialog');
						$("#app_modal_body").html(htmlformcomponent);
						$("#app_modal_label").html("POINT");
						
						$("#modalbox").modal('show');
					}
				});
			}
		}
	});
	promisePoint.then(function (data) {
		pointObjects.addData(data);
		map.addLayer(pointObjects);
	});
	
	var promiseLinestring = $.ajax({
		url: "../dataservice/read_linestring.php",
		method: "GET",
		dataType: "json",
		data: {command:"LINESTRING"},
		username: null,
		password: null
	});
	
	var linestringObjects = L.geoJson(null, {
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				layer.on({
					click: function (e) {
						var htmlformcomponent = "" +
								"<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
									"<thead>" +
										"<tr>" +
											"<th colspan='2' class='text-center'>Feature Data</th>" +
										"</tr>" +
									"</thead>" +
									"<tbody>" +
										"<tr>" +
											"<td class=''>Notes</td>" +
											"<td class=''><strong>"+feature.properties.notes+"</strong></td>" +
										"</tr>" +
									"</tbody>" +
								"</table>" +
							"";
						$("#app_modal_body").empty();
						$("#app_modal_body").removeClass().addClass('modal-body');
						$("#app_modal_size").removeClass().addClass('modal-dialog');
						$("#app_modal_body").html(htmlformcomponent);
						$("#app_modal_label").html("LINESTRING");
						
						$("#modalbox").modal('show');
					}
				});
			}
		}
	});
	promiseLinestring.then(function (data) {
		linestringObjects.addData(data);
		map.addLayer(linestringObjects);
	});
	
	var promisePolygon = $.ajax({
		url: "../dataservice/read_polygon.php",
		method: "GET",
		dataType: "json",
		data: {command:"POLYGON"},
		username: null,
		password: null
	});
	
	var polygonObjects = L.geoJson(null, {
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				layer.on({
					click: function (e) {
						var htmlformcomponent = "" +
								"<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
									"<thead>" +
										"<tr>" +
											"<th colspan='2' class='text-center'>Feature Data</th>" +
										"</tr>" +
									"</thead>" +
									"<tbody>" +
										"<tr>" +
											"<td class=''>Notes</td>" +
											"<td class=''><strong>"+feature.properties.notes+"</strong></td>" +
										"</tr>" +
									"</tbody>" +
								"</table>" +
							"";
						$("#app_modal_body").empty();
						$("#app_modal_body").removeClass().addClass('modal-body');
						$("#app_modal_size").removeClass().addClass('modal-dialog');
						$("#app_modal_body").html(htmlformcomponent);
						$("#app_modal_label").html("POLYGON");
						
						$("#modalbox").modal('show');
					}
				});
			}
		}
	});
	promisePolygon.then(function (data) {
		polygonObjects.addData(data);
		map.addLayer(polygonObjects);
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
}

function _displayMapDeleteFeature(divtarget) {
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
  });

  $.getJSON("../dataservice/admin_kec.php", function(geojsonadminkecamatan) {
    adminkecamatan.addData(geojsonadminkecamatan);
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
      layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><input type='hidden' id='dataident' value='"+feature.properties.ident+"'/><thead><tr><th colspan='2' class='text-center'>Petak Irigasi</th></tr></thead><tbody><tr><td>Kode Petak Irigasi</td><td>" + feature.properties.objectid + "</td></tr><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tr><tr><td>Luas Petak Irigasi</td><td>" + feature.properties.luas + "</td></tr><tr><td>Pemilik</td><td>" + feature.properties.pemilik + "</td></tr><tr><td colspan='2' class='text-center'>Hapus Data Petak Irigasi</td></tr><tr><td colspan='2' class='text-center'><button type='button' id='deletefeature' class='btn btn-danger btn-sm deletefeature'>Hapus Data</button></td></tr></tbody></table>");
      layer.on({
        click: function (e) {
          _deleteIrigasiPetak(map, irigasipetak);
        }
      });
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
      layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><input type='hidden' id='dataident' value='"+feature.properties.ident+"'/><thead><tr><th colspan='2' class='text-center'>Saluran Irigasi</th></tr></thead><tbody><tr><td>Kode Saluran</td><td>" + feature.properties.k_saluran + "</td></tr><tr><td>Nomenklatur Saluran</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>Detail Saluran</td><td>" + feature.properties.nama + "</td></tr></tr><tr><td>Kondisi Saluran</td><td>" + feature.properties.kondisi + "</td></tr><tr><td>Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr><tr><td colspan='2' class='text-center'>Hapus Data Saluran Irigasi</td></tr><tr><td colspan='2' class='text-center'><button type='button' id='deletefeature' class='btn btn-danger btn-sm deletefeature'>Hapus Data</button></td></tr></tbody></table>");
      layer.on({
        click: function (e) {
          _deleteIrigasiSaluran(map, irigasisaluran);
        }
      });
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
        layer.bindPopup("<table class='table table-condensed table-striped table-bordered infobox'><input type='hidden' id='dataident' value='"+feature.properties.gid+"'/><thead><tr><th colspan='2' class='text-center'>Bangunan Irigasi</th></tr></thead><tbody><tr><td>Kode Bangunan</td><td>" + feature.properties.k_bangunan + "</td></tr><tr><td>Nomenklatur Bangunan</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>Detail Bangunan</td><td>" + feature.properties.nama + "</td></tr></tr><tr><td>Kondisi Bangunan</td><td>" + feature.properties.kondisi + "</td></tr><tr><td>Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td colspan='2' class='text-center'>Hapus Data Bangunan Irigasi</td></tr><tr><td colspan='2' class='text-center'><button type='button' id='deletefeature' class='btn btn-danger btn-sm deletefeature'>Hapus Data</button></td></tr></tbody></table>");
        layer.on({
          click: function (e) {
            _deleteIrigasiBangunan(map, irigasibangunan);
          }
        });
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
}

function _readDownloadSchema(fileschema){
  $('#downloadschema').on('click', function(evt){
    evt.preventDefault();
    window.open('./assets/img/skema/'+fileschema+'');
  });
}

function _readDownloadSchemaLoggedIn(fileschema){
  $('#downloadschema').on('click', function(evt){
    evt.preventDefault();
    window.open('../assets/img/skema/'+fileschema+'');
  });
}

function _readDownloadPDFDRData(dataid){
  var _dataid = dataid;
  $('#downloadpdf').on('click', function(evt){
    evt.preventDefault();
    $.ajax({
      url: "./dataservice/getSelectedDataParameter.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#frontprinted').empty();
        if(data.status == 200){
          var _dataeto = data.dataeto[0], _datapor = data.datapor[0], _datache = data.datache[0], _datawir = data.datawir[0], _datadr = data.datadr[0];
          var htmlTables = `<table cellspacing='0' cellpadding='0' border='0' style='width:100%;'>
              <thead>
                <tr>
                  <th colspan='12' style='font:sans-serif;border-top:1px solid;border-right:1px solid;border-left:1px solid;border-bottom:none;padding:5px;text-align:center;'>Data Nilai Kebutuhan Air</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3' style='border-top:1px solid;border-right:1px solid;border-left:1px solid;border-bottom:none;padding:5px;'>Nama DI</td>
                  <td colspan='9' style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;'><strong>`+ _datadr.nama_di +`</strong></td>
                </tr>
                <tr>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:1px solid;border-bottom:none;padding:5px;text-align:center;'>Januari</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Februari</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Maret</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>April</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Mei</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Juni</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Juli</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Agustus</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>September</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Oktober</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>November</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Desember</td>
                </tr>
                <tr>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:1px solid;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_jan).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_feb).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_mar).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_apr).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_mei).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_jun).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_jul).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_ags).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_sept).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_okt).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_nov).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_des).format('0.00') +`</strong></td>
                </tr>
              </tbody>
            </table>`;
          $('#frontprinted').html(htmlTables);
          var element = document.getElementById('frontprinted');
          var opt = {
            margin: 1,
            filename: ''+_dataid+'.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'cm', format: 'letter', orientation: 'landscape' }
          };
          html2pdf().set(opt).from(element).save();
        } else {
          console.log('Print error.');
        }
      },
      username: null,
      password: null
    });
  });
}

function _readDownloadPDFDRDataLoggedIn(dataid){
  var _dataid = dataid;
  $('#downloadpdf').on('click', function(evt){
    evt.preventDefault();
    $.ajax({
      url: "../dataservice/getSelectedDataParameter.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#frontprinted').empty();
        if(data.status == 200){
          var _dataeto = data.dataeto[0], _datapor = data.datapor[0], _datache = data.datache[0], _datawir = data.datawir[0], _datadr = data.datadr[0];
          var htmlTables = `<table cellspacing='0' cellpadding='0' border='0' style='width:100%;'>
              <thead>
                <tr>
                  <th colspan='12' style='font:sans-serif;border-top:1px solid;border-right:1px solid;border-left:1px solid;border-bottom:none;padding:5px;text-align:center;'>Data Nilai Kebutuhan Air</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3' style='border-top:1px solid;border-right:1px solid;border-left:1px solid;border-bottom:none;padding:5px;'>Nama DI</td>
                  <td colspan='9' style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;'><strong>`+ _datadr.nama_di +`</strong></td>
                </tr>
                <tr>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:1px solid;border-bottom:none;padding:5px;text-align:center;'>Januari</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Februari</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Maret</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>April</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Mei</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Juni</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Juli</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Agustus</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>September</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Oktober</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>November</td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:none;padding:5px;text-align:center;'>Desember</td>
                </tr>
                <tr>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:1px solid;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_jan).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_feb).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_mar).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_apr).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_mei).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_jun).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_jul).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_ags).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_sept).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_okt).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_nov).format('0.00') +`</strong></td>
                  <td style='border-top:1px solid;border-right:1px solid;border-left:none;border-bottom:1px solid;padding:5px;text-align:right;'><strong>`+ numeral(_datadr.dr_des).format('0.00') +`</strong></td>
                </tr>
              </tbody>
            </table>`;
          $('#frontprinted').html(htmlTables);
          var element = document.getElementById('frontprinted');
          var opt = {
            margin: 1,
            filename: ''+_dataid+'.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'cm', format: 'letter', orientation: 'landscape' }
          };
          html2pdf().set(opt).from(element).save();
        } else {
          console.log('Print error.');
        }
      },
      username: null,
      password: null
    });
  });
}