function _deleteIrigasiPetak(mapobj, layerobj){
  var map = mapobj, irigasipetak = layerobj;
  $('#deletefeature').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _featureid = $('#dataident').val();
    $.ajax({
      url: "../dataservice/deleteIrigasiPetak.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_featureid},
      success: function (data) {
        if(data.status == 200){
          map.invalidateSize();
          irigasipetak.clearLayers();
          map.removeLayer(irigasipetak);
          $.getJSON("../dataservice/irigasi_petak.php", function(geojsonirigasipetak) {
            irigasipetak.addData(geojsonirigasipetak);
            irigasipetak.addTo(map);
          });
        } else {
          map.invalidateSize();
          irigasipetak.clearLayers();
          map.removeLayer(irigasipetak);
          $.getJSON("../dataservice/irigasi_petak.php", function(geojsonirigasipetak) {
            irigasipetak.addData(geojsonirigasipetak);
            irigasipetak.addTo(map);
          });
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _deleteIrigasiSaluran(mapobj, layerobj){
  var map = mapobj, irigasisaluran = layerobj;
  $('#deletefeature').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _featureid = $('#dataident').val();
    $.ajax({
      url: "../dataservice/deleteIrigasiSaluran.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_featureid},
      success: function (data) {
        if(data.status == 200){
          map.invalidateSize();
          irigasisaluran.clearLayers();
          map.removeLayer(irigasisaluran);
          $.getJSON("../dataservice/irigasi_saluran.php", function(geojsonirigasisaluran) {
            irigasisaluran.addData(geojsonirigasisaluran);
            irigasisaluran.addTo(map);
          });
        } else {
          map.invalidateSize();
          irigasisaluran.clearLayers();
          map.removeLayer(irigasisaluran);
          $.getJSON("../dataservice/irigasi_saluran.php", function(geojsonirigasisaluran) {
            irigasisaluran.addData(geojsonirigasisaluran);
            irigasisaluran.addTo(map);
          });
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _deleteIrigasiBangunan(mapobj, layerobj){
  var map = mapobj, irigasibangunan = layerobj;
  $('#deletefeature').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _featureid = $('#dataident').val();
    $.ajax({
      url: "../dataservice/deleteIrigasiBangunan.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_featureid},
      success: function (data) {
        if(data.status == 200){
          map.invalidateSize();
          irigasibangunan.clearLayers();
          map.removeLayer(irigasibangunan);
          $.getJSON("../dataservice/irigasi_bangunan.php", function(geojsonirigasibangunan) {
            irigasibangunan.addData(geojsonirigasibangunan);
            irigasibangunan.addTo(map);
          });
        } else {
          map.invalidateSize();
          irigasibangunan.clearLayers();
          map.removeLayer(irigasibangunan);
          $.getJSON("../dataservice/irigasi_bangunan.php", function(geojsonirigasibangunan) {
            irigasibangunan.addData(geojsonirigasibangunan);
            irigasibangunan.addTo(map);
          });
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};