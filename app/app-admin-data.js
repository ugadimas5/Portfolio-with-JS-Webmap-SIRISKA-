$(document).ready(function(){
  _attachTopNavMenu();
  _displayMapReadLoggedIn('app');
});
/* 
 * Fungsi untuk menampilkan ... 
 * */
function _attachTopNavMenu () {
  var adjacentTopNavMenuDOM = "" +
    "<nav class='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>" +
      "<a class='navbar-brand' href='./'>SIRISKA DPUPKP Kab. Karanganyar</a>" +
      "<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>" +
        "<span class='navbar-toggler-icon'></span>" +
      "</button>" +
      "<div class='collapse navbar-collapse' id='navbarCollapse'>" +
        "<ul class='navbar-nav mr-auto'>" +
          "<li class='nav-item'>" +
            "<a id='home' class='nav-link flat' href='#'><i class='fa fa-home'></i>&nbsp;Home</a>" +
          "</li>" +
          "<li class='nav-item dropdown'>" +
            "<a class='nav-link dropdown-toggle' href='#' id='navbarDropdownData' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='fa fa-file-o'></i>&nbsp;Data</a>" +
            "<div class='dropdown-menu' aria-labelledby='navbarDropdownData'>" +
              "<a id='leaflet_crud_data_daerahirigasi' class='dropdown-item' href='#'><i class='fa fa-file-o'></i>&nbsp;Daerah Irigasi</a>" +
              "<hr class='dropdown-divider'>" +
              "<a id='leaflet_crud_data_petakirigasi' class='dropdown-item' href='#'><i class='fa fa-file-o'></i>&nbsp;Petak Irigasi</a>" +
              "<a id='leaflet_crud_data_saluranirigasi' class='dropdown-item' href='#'><i class='fa fa-file-o'></i>&nbsp;Saluran Irigasi</a>" +
              "<a id='leaflet_crud_data_bangunanirigasi' class='dropdown-item' href='#'><i class='fa fa-file-o'></i>&nbsp;Bangunan Irigasi</a>" +
              "<hr class='dropdown-divider'>" +
              "<a id='leaflet_crud_data_eto' class='dropdown-item' href='#'><i class='fa fa-file-o'></i>&nbsp;Evapotranspirasi</a>" +
              "<a id='leaflet_crud_data_por' class='dropdown-item' href='#'><i class='fa fa-file-o'></i>&nbsp;Porositas Tanah</a>" +
              "<a id='leaflet_crud_data_che' class='dropdown-item' href='#'><i class='fa fa-file-o'></i>&nbsp;Curah Hujan Efektif</a>" +
              "<a id='leaflet_crud_data_wir' class='dropdown-item' href='#'><i class='fa fa-file-o'></i>&nbsp;Kehilangan Air</a>" +
              "<a id='leaflet_crud_data_ei' class='dropdown-item' href='#'><i class='fa fa-file-o'></i>&nbsp;Efisiensi Irigasi</a>" +
            "</div>" +
          "</li>" +
          "<li class='nav-item dropdown'>" +
            "<a class='nav-link dropdown-toggle' href='#' id='navbarDropdownUpdate' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='fa fa-location-arrow'></i>&nbsp;Pembaruan Data</a>" +
            "<div class='dropdown-menu' aria-labelledby='navbarDropdownUpdate'>" +
              "<a id='leaflet_crud_update_paramkebair' class='dropdown-item' href='#'><i class='fa fa-pencil-square-o'></i>&nbsp;Parameter Kebutuhan Air</a>" +
              "<a id='leaflet_crud_update_datairigasi' class='dropdown-item' href='#'><i class='fa fa-pencil-square-o'></i>&nbsp;Data Irigasi</a>" +
            "</div>" +
          "</li>" +
          "<li class='nav-item'>" +
            "<a id='leaflet_crud_create' class='nav-link flat' href='#'><i class='fa fa-pencil'></i>&nbsp;Tambah Data Irigasi</a>" +
          "</li>" +
          "<li class='nav-item'>" +
            "<a id='leaflet_crud_delete' class='nav-link flat' href='#'><i class='fa fa-trash'></i>&nbsp;Hapus Data Irigasi</a>" +
          "</li>" +
          "<li class='nav-item dropdown'>" +
            "<a class='nav-link dropdown-toggle' href='#' id='navbarDropdownDownload' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='fa fa-download'></i>&nbsp;Unduh Data</a>" +
            "<div class='dropdown-menu' aria-labelledby='navbarDropdownDownload'>" +
              "<a id='leaflet_download_skemairigasi' class='dropdown-item' href='#'><i class='fa fa-download'></i>&nbsp;Skema Irigasi</a>" +
              "<a id='leaflet_download_kebairmasatanam' class='dropdown-item' href='#'><i class='fa fa-download'></i>&nbsp;Kebutuhan Air Masa Tanam</a>" +
            "</div>" +
          "</li>" +
        "</ul>" +
        "<ul class='navbar-nav'>" +
          "<li class='nav-item'>" +
            "<a id='leaflet_crud_exit' class='nav-link flat' href='#'><i class='fa fa-lock'></i>&nbsp;Keluar</a>" +
          "</li>" +
        "</ul>" +
      "</div>" +
    "</nav>" +
    "";
  var baseObject = document.getElementById('app');
  baseObject.insertAdjacentHTML('beforebegin', adjacentTopNavMenuDOM);
  _attachTopNavMenuFunction();
}
function _attachTopNavMenuFunction () {
  $('#navbarCollapse a.nav-link.flat').on('click', function(e){
    e.stopImmediatePropagation();
    var menuid = $(this).attr('id');
    $('.navbar-collapse').collapse('hide');
    switch(menuid){
      case 'home':
      case 'leaflet_crud_read':
        _displayMapReadLoggedIn('app');
        break;
      case 'leaflet_crud_create':
        _displayMapCreate('app');
        break;
      case 'leaflet_crud_delete':
        _displayMapDeleteFeature('app');
        break;
      case 'leaflet_crud_exit':
        _doExit();
        break;
      default:
        console.log('__undefined__');
        break;
    }
    return false;
  });
  $('#navbarCollapse a.dropdown-item').on('click', function(e){
    e.stopImmediatePropagation();
    var menuid = $(this).attr('id');
    $('.navbar-collapse').collapse('hide');
    $(this).closest('li.nav-item.dropdown').find('.nav-link.dropdown-toggle').dropdown('toggle');
    switch(menuid){
      case 'leaflet_crud_update_paramkebair':
        _displayMapUpdateParamsKebAir('app');
        break;
      case 'leaflet_crud_update_datairigasi':
        _displayMapUpdateDataIrigasi('app');
        break;
      case 'leaflet_crud_data_daerahirigasi':
        _displayDataDaerahIrigasi('app');
        break;
      case 'leaflet_crud_data_petakirigasi':
        _displayDataPetakIrigasi('app');
        break;
      case 'leaflet_crud_data_saluranirigasi':
        _displayDataSaluranIrigasi('app');
        break;
      case 'leaflet_crud_data_bangunanirigasi':
        _displayDataBangunanIrigasi('app');
        break;
      case 'leaflet_crud_data_eto':
        _displayDataETO('app');
        break;
      case 'leaflet_crud_data_por':
        _displayDataPOR('app');
        break;
      case 'leaflet_crud_data_che':
        _displayDataCHE('app');
        break;
      case 'leaflet_crud_data_wir':
        _displayDataWIR('app');
        break;
      case 'leaflet_crud_data_ei':
        _displayDataEI('app');
        break;
      case 'leaflet_download_skemairigasi':
        _displayDataDownloadSkemaIrigasi('app');
        break;
      case 'leaflet_download_kebairmasatanam':
        _displayDataDownloadKebutuhanAirMasaTanam('app');
        break;
      case 'leaflet_crud_update_polygon':
        _displayMapUpdatePolygon('app');
        break;
      case 'leaflet_crud_update_point':
        _displayMapUpdatePoint('app');
        break;
      case 'leaflet_crud_update_linestring':
        _displayMapUpdateLinestring('app');
        break;
      default:
        console.log('__undefined__');
        break;
    }
    return false;
  });
}

function _doExit(){
  document.location = '../';
}

function _buildDigitiseModalBox (targetmodal,context,geometry) {
  targetmodal = typeof targetmodal !== 'undefined' ? targetmodal : 'modalbox';
  context = typeof context !== 'undefined' ? context : 'POINT';
  geometry = typeof geometry !== 'undefined' ? geometry : 'POINT (110.21766 -7.459129)';
  
  if(context == 'POINT'){
    var htmlformcomponent = "" +
        "<input type='hidden' id='command' name='command' value='"+context+"'/>" +
        "<input type='hidden' id='geometry' name='geometry' value='"+geometry+"'/>" +
        "<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
          "<thead>" +
            "<tr>" +
              "<th colspan='2' class='text-center'>Data Bangunan Irigasi</th>" +
            "</tr>" +
          "</thead>" +
          "<tbody>" +
            "<tr>" +
              "<td class=''>Kode Bangunan</td>" +
              "<td class='text-center'><select id='kodebangunan' name='kodebangunan' class='form-control'><option value=''>Pilih Kode</option><option value='1-1-1-1-02'>1-1-1-1-02</option><option value='1-1-1-1-06'>1-1-1-1-06</option><option value='1-1-1-1-07'>1-1-1-1-07</option><option value='1-1-1-1-90'>1-1-1-1-90</option><option value='1-1-1-1-99'>1-1-1-1-02</option><option value='1-1-1-2-01'>1-1-1-2-01</option><option value='1-1-1-2-02'>1-1-1-2-02</option><option value='1-1-1-2-03'>1-1-1-2-03</option><option value='1-1-1-2-04'>1-1-1-2-04</option><option value='1-1-1-2-06'>1-1-1-2-06</option><option value='1-1-1-2-07'>1-1-1-2-07</option><option value='1-1-1-2-08'>1-1-1-2-08</option><option value='1-1-1-2-09'>1-1-1-2-09</option><option value='1-1-1-2-11'>1-1-1-2-11</option><option value='1-1-1-2-12'>1-1-1-2-12</option><option value='1-1-1-2-13'>1-1-1-2-13</option><option value='1-1-1-2-14'>1-1-1-2-14</option><option value='1-1-1-2-15'>1-1-1-2-15</option><option value='1-1-1-2-16'>1-1-1-2-16</option><option value='1-1-1-2-11'>1-1-1-2-08</option></select></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Nama Bangunan</td>" +
              "<td class='text-center'><input type='text' id='namabangunan' name='namabangunan' class='form-control' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Nama DI</td>" +
              "<td class='text-center'><input type='text' id='namadi' name='namadi' class='form-control' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Nomenklatur</td>" +
              "<td class='text-center'><input type='text' id='nomenklatur' name='nomenklatur' class='form-control' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Kondisi Bangunan</td>" +
              "<td class='text-center'><input type='text' id='kondisi' name='kondisi' class='form-control' value=''/></td>" +
            "</tr>" +
          "</tbody>" +
        "</table>" +
      "";
    var modalfooter = "" +
      "<button type='button' id='canceldigitize' class='btn btn-default' data-dismiss='modal'><i class='fa fa-power-off'></i>&nbsp;Cancel</button>" +
      "<button type='button' id='savegeometrydata' class='btn btn-primary'><i class='fa fa-floppy-o'></i>&nbsp;Save</button>" +
      "";
    $("#form_modal_body").empty();
    $("#form_modal_footer").empty().html(modalfooter);
    $("#form_modal_body").removeClass().addClass('modal-body');
    $("#form_modal_size").removeClass().addClass('modal-dialog');
    $("#form_modal_body").html(htmlformcomponent);
    $("#form_modal_label").html("<i class='fa fa-pencil'></i>&nbsp;Bangunan Irigasi");
    
    $('#'+targetmodal+'').modal({show:true, backdrop:'static', keyboard:false});
  } else if(context == 'LINESTRING'){
    var htmlformcomponent = "" +
        "<input type='hidden' id='command' name='command' value='"+context+"'/>" +
        "<input type='hidden' id='geometry' name='geometry' value='"+geometry+"'/>" +
        "<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
          "<thead>" +
            "<tr>" +
              "<th colspan='2' class='text-center'>Data Saluran Irigasi</th>" +
            "</tr>" +
          "</thead>" +
          "<tbody>" +
            "<tr>" +
              "<td class=''>Kecamatan</td>" +
              "<td class='text-center'><input type='text' id='kecamatan' name='kecamatan' class='form-control' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Desa</td>" +
              "<td class='text-center'><input type='text' id='desa' name='desa' class='form-control' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Kode Saluran</td>" +
              "<td class='text-center'><select id='kodesaluran' name='kodesaluran' class='form-control'><option value=''>Pilih Kode</option><option value='1-1-1-3-02'>1-1-1-3-02</option><option value='1-1-1-3-99'>1-1-1-3-99</option><option value='1-1-1-3-01'>1-1-1-3-01</option></select></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Nama Saluran</td>" +
              "<td class='text-center'><input type='text' id='namasaluran' name='namasaluran' class='form-control' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Nama DI</td>" +
              "<td class='text-center'><select id='namadi' name='namadi' class='form-control'></select></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Nomenklatur</td>" +
              "<td class='text-center'><input type='text' id='nomenklatur' name='nomenklatur' class='form-control' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Nomor Urut Saluran</td>" +
              "<td class='text-center'><input type='text' id='nourut' name='nourut' class='form-control text-right' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Tahun</td>" +
              "<td class='text-center'><input type='text' id='tahun' name='tahun' class='form-control text-right' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Kondisi Saluran</td>" +
              "<td class='text-center'><input type='text' id='kondisi' name='kondisi' class='form-control' value=''/></td>" +
            "</tr>" +
          "</tbody>" +
        "</table>" +
      "";
    var modalfooter = "" +
      "<button type='button' id='canceldigitize' class='btn btn-default' data-dismiss='modal'><i class='fa fa-power-off'></i>&nbsp;Cancel</button>" +
      "<button type='button' id='savegeometrydata' class='btn btn-primary'><i class='fa fa-floppy-o'></i>&nbsp;Save</button>" +
      "";
    $("#form_modal_body").empty();
    $("#form_modal_footer").empty().html(modalfooter);
    $("#form_modal_body").removeClass().addClass('modal-body');
    $("#form_modal_size").removeClass().addClass('modal-dialog');
    $("#form_modal_body").html(htmlformcomponent);
    $("#form_modal_label").html("<i class='fa fa-pencil'></i>&nbsp;Saluran Irigasi");
    $.ajax({
      url: "../dataservice/getDataTableDaerahIrigasi.php",
      method: "GET",
      dataType: "json",
      data: {dataid:'default'},
      success: function (data) {
        if(data.status == 200){
          var _data = data.dataarray;
          var _htmlrow = "<option value=''>Pilih Daerah Irigasi</option>";
          var rowcount = 1;
          $.each(_data, function(key, value){
            _htmlrow += "<option value='"+ value.gid +"|"+ value.nama_di +"'>"+ value.nama_di +"</option>";
            rowcount++;
          });
          $('#namadi').html(_htmlrow);
        } else {
          var _htmlrow = "<option value=''>Pilih Daerah Irigasi</option>";
          $('#namadi').html(_htmlrow);
        }
      },
      username: null,
      password: null
    });
    $('#'+targetmodal+'').modal({show:true, backdrop:'static', keyboard:false});
  } else if(context == 'POLYGON'){
    var htmlformcomponent = "" +
        "<input type='hidden' id='command' name='command' value='"+context+"'/>" +
        "<input type='hidden' id='geometry' name='geometry' value='"+geometry+"'/>" +
        "<table id='feature_data' class='table table-condensed table-bordered table-striped'>" +
          "<thead>" +
            "<tr>" +
              "<th colspan='2' class='text-center'>Data Petak Irigasi</th>" +
            "</tr>" +
          "</thead>" +
          "<tbody>" +
            "<tr>" +
              "<td class=''>Kecamatan</td>" +
              "<td class='text-center'><input type='text' id='kecamatan' name='kecamatan' class='form-control' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Desa</td>" +
              "<td class='text-center'><input type='text' id='desa' name='desa' class='form-control' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Nama DI</td>" +
              "<td class='text-center'><select id='namadi' name='namadi' class='form-control'></select></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Luas Petak</td>" +
              "<td class='text-center'><input type='text' id='luas' name='luas' class='form-control text-right' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Tahun</td>" +
              "<td class='text-center'><input type='text' id='tahun' name='tahun' class='form-control text-right' value=''/></td>" +
            "</tr>" +
            "<tr>" +
              "<td class=''>Nama Pemilik</td>" +
              "<td class='text-center'><input type='text' id='namapemilik' name='namapemilik' class='form-control' value=''/></td>" +
            "</tr>" +
          "</tbody>" +
        "</table>" +
      "";
    var modalfooter = "" +
      "<button type='button' id='canceldigitize' class='btn btn-default' data-dismiss='modal'><i class='fa fa-power-off'></i>&nbsp;Cancel</button>" +
      "<button type='button' id='savegeometrydata' class='btn btn-primary'><i class='fa fa-floppy-o'></i>&nbsp;Save</button>" +
      "";
    $("#form_modal_body").empty();
    $("#form_modal_footer").empty().html(modalfooter);
    $("#form_modal_body").removeClass().addClass('modal-body');
    $("#form_modal_size").removeClass().addClass('modal-dialog');
    $("#form_modal_body").html(htmlformcomponent);
    $("#form_modal_label").html("<i class='fa fa-pencil'></i>&nbsp;Petak Irigasi");
    $.ajax({
      url: "../dataservice/getDataTableDaerahIrigasi.php",
      method: "GET",
      dataType: "json",
      data: {dataid:'default'},
      success: function (data) {
        if(data.status == 200){
          var _data = data.dataarray;
          var _htmlrow = "<option value=''>Pilih Daerah Irigasi</option>";
          var rowcount = 1;
          $.each(_data, function(key, value){
            _htmlrow += "<option value='"+ value.gid +"|"+ value.nama_di +"'>"+ value.nama_di +"</option>";
            rowcount++;
          });
          $('#namadi').html(_htmlrow);
        } else {
          var _htmlrow = "<option value=''>Pilih Daerah Irigasi</option>";
          $('#namadi').html(_htmlrow);
        }
      },
      username: null,
      password: null
    });
    $('#'+targetmodal+'').modal({show:true, backdrop:'static', keyboard:false});
  } else {
    console.log('__undefined__');
  }
}
function _activateFeatureSave () {
  $("#savegeometrydata").on('click', function(evt){
    evt.stopImmediatePropagation();
    var commandContext = $('#command').val();
    var noteString = $('#notes').val();
    var geometry = $('#geometry').val();
    if (commandContext == "POINT") {
      $.ajax({
        url: "../dataservice/create_bangunan_irigasi.php",
        method: "POST",
        dataType: "json",
        data: $('#dynamicform').serialize(),
        success: function (data) {
          if (data.response=="200") {
            $("#modalform").modal('hide');
          } else {
            $("#modalform").modal('hide');
            console.log('Failed to save.');
          }
        },
        username: null,
        password: null
      });
    } else if (commandContext == "LINESTRING") {
      $.ajax({
        url: "../dataservice/create_saluran_irigasi.php",
        method: "POST",
        dataType: "json",
        data: $('#dynamicform').serialize(),
        success: function (data) {
          if (data.response=="200") {
            $("#modalform").modal('hide');
          } else {
            $("#modalform").modal('hide');
            console.log('Failed to save.');
          }
        },
        username: null,
        password: null
      });
    } else if (commandContext == "POLYGON") {
      $.ajax({
        url: "../dataservice/create_petak_irigasi.php",
        method: "POST",
        dataType: "json",
        data: $('#dynamicform').serialize(),
        success: function (data) {
          if (data.response=="200") {
            $("#modalform").modal('hide');
          } else {
            $("#modalform").modal('hide');
            console.log('Failed to save.');
          }
        },
        username: null,
        password: null
      });
    } else {
      console.log('__undefined__');
    }
    return false;
  });
}
