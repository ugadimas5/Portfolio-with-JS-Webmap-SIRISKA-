function _displayDataDaerahIrigasi (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='3' class='text-center'>Data Daerah Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Nama Daerah Irigasi</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTableDaerahIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.nama_di +"</td><td class='text-center'><a href='../assets/img/skema/"+ value.skema +"' class='btn btn-primary btn-sm' target='_blank'>Download</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
      } else {
        var _htmlrow = "<tr><td colspan='3' class='text-center text-danger'>Tidak ada data</td></tr>";
      }
    },
    username: null,
    password: null
  });
};

function _displayDataDownloadSkemaIrigasi (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='3' class='text-center'>Data Skema Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Nama Daerah Irigasi</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTableDaerahIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.nama_di +"</td><td class='text-center'><a href='../assets/img/skema/"+ value.skema +"' class='btn btn-primary btn-sm' target='_blank'>Download Skema Irigasi</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
      } else {
        var _htmlrow = "<tr><td colspan='3' class='text-center text-danger'>Tidak ada data</td></tr>";
      }
    },
    username: null,
    password: null
  });
};

function _displayDataDownloadKebutuhanAirMasaTanam (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'>
            <button type='button' class='btn btn-success btn-sm' onclick="_downloadGeoJSONPetakIrigasi()"><i class='fa fa-download'></i>&nbsp;Petak Irigasi</button>
            <button type='button' class='btn btn-success btn-sm' onclick="_downloadGeoJSONETO()"><i class='fa fa-download'></i>&nbsp;Evapotranspirasi</button>
            <button type='button' class='btn btn-success btn-sm' onclick="_downloadGeoJSONPOR()"><i class='fa fa-download'></i>&nbsp;Porositas Tanah</button>
            <button type='button' class='btn btn-success btn-sm' onclick="_downloadGeoJSONCHE()"><i class='fa fa-download'></i>&nbsp;Curah Hujan Efektif</button>
            <button type='button' class='btn btn-success btn-sm' onclick="_downloadGeoJSONWIR()"><i class='fa fa-download'></i>&nbsp;Kehilangan Air</button>
            <button type='button' class='btn btn-success btn-sm' onclick="_downloadGeoJSONDR()"><i class='fa fa-download'></i>&nbsp;Kebutuhan Air</button>
            <button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button>
          </p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='6' class='text-center'>Data Petak Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Nama Daerah Irigasi</th>
                <th class='text-center'>Kecamatan</th>
                <th class='text-center'>Desa</th>
                <th class='text-center'>Luas</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <hr/>
      <div class='row'>
        <div id='ext-data' class='col'></div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTablePetakIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.nama_di +"</td><td>"+ value.kecamatan +"</td><td>"+ value.desa +"</td><td class='text-right'>"+ value.luas +"</td><td class='text-center'><a id='"+ value.ident +"' href='#' class='btn btn-primary btn-sm viewdetaileddata'><i class='fa fa-eye'></i>&nbsp;Data</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
        $('#datatable').DataTable({
          pageLength: 10,
          deferRender: true,
          lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
          initComplete: function(){
            _applyDataDetailPetakIrigasiForDownloadKebAir();
          }
        });
        $("#datatable").on('draw.dt', function(){
          _applyDataDetailPetakIrigasiForDownloadKebAir();
        });
        $("#datatable").on('search.dt', function(e){
          _applyDataDetailPetakIrigasiForDownloadKebAir();
        });
      } else {
        var _htmlrow = "<tr><td colspan='6' class='text-center text-danger'>Tidak ada data</td></tr>";
        $('#datatable tbody').append(_htmlrow);
      }
    },
    username: null,
    password: null
  });
};

function _applyDataDetailPetakIrigasiForDownloadKebAir(){
  $('a.viewdetaileddata').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _dataid = $(this).attr('id');
    $.ajax({
      url: "../dataservice/getSelectedDataParameter.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#ext-data').empty();
        if(data.status == 200){
          var _dataeto = data.dataeto[0], _datapor = data.datapor[0], _datache = data.datache[0], _datawir = data.datawir[0], _datadr = data.datadr[0];
          var htmlTables = `<table class='table table-condensed table-striped table-bordered'>
              <input type='hidden' id='_dataid' value='`+ _datadr.identpetak +`'/>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Nilai Kebutuhan Air</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colspan='12' class='text-right'>
                    <button type='button' id='`+ _datadr.identpetak +`' class='btn btn-success btn-sm' onclick="_downloadSingleGeoJSONETO()"><i class='fa fa-download'></i>&nbsp;Evapotranspirasi</button>
                    <button type='button' id='`+ _datadr.identpetak +`' class='btn btn-success btn-sm' onclick="_downloadSingleGeoJSONPOR()"><i class='fa fa-download'></i>&nbsp;Porositas Tanah</button>
                    <button type='button' id='`+ _datadr.identpetak +`' class='btn btn-success btn-sm' onclick="_downloadSingleGeoJSONCHE()"><i class='fa fa-download'></i>&nbsp;Curah Hujan Efektif</button>
                    <button type='button' id='`+ _datadr.identpetak +`' class='btn btn-success btn-sm' onclick="_downloadSingleGeoJSONWIR()"><i class='fa fa-download'></i>&nbsp;Kehilangan Air</button>
                    <button type='button' id='`+ _datadr.identpetak +`' class='btn btn-success btn-sm' onclick="_downloadSingleGeoJSONDR()"><i class='fa fa-download'></i>&nbsp;Kebutuhan Air</button>
                    <a href='#' id='`+ _datadr.identpetak +`' class='btn btn-danger btn-sm pdfdownloaddatadr'><i class='fa fa-file-pdf-o'></i>&nbsp;PDF Kebutuhan Air</a></th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datadr.nama_di +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_datadr.dr_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>
            <div class='d-none'>
              <div id='printed'>
                <table cellspacing='0' cellpadding='0' border='0' style='width:100%;'>
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
                </table>
              </div>
            </div>`;
          $('#ext-data').html(htmlTables);
          $('a.pdfdownloaddatadr').on('click', function(evt){
            evt.stopImmediatePropagation();
            var _dataid = $(this).attr('id');
            var element = document.getElementById('printed');
            var opt = {
              margin: 1,
              filename: ''+_dataid+'.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 1 },
              jsPDF: { unit: 'cm', format: 'letter', orientation: 'landscape' }
            };
            html2pdf().set(opt).from(element).save();
            return false;
          });
        } else {
          var _notice = "<p class='text-center text-danger'>Data tidak ditemukan.</p>";
          $('#ext-data').html(_notice);
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _displayDataPetakIrigasi (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='6' class='text-center'>Data Petak Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Nama Daerah Irigasi</th>
                <th class='text-center'>Kecamatan</th>
                <th class='text-center'>Desa</th>
                <th class='text-center'>Luas</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <hr/>
      <div class='row'>
        <div id='ext-data' class='col'></div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTablePetakIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.nama_di +"</td><td>"+ value.kecamatan +"</td><td>"+ value.desa +"</td><td class='text-right'>"+ value.luas +"</td><td class='text-center'><a id='"+ value.ident +"' href='#' class='btn btn-primary btn-sm viewdetaileddata'>Data</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
        $('#datatable').DataTable({
          pageLength: 10,
          deferRender: true,
          lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
          initComplete: function(){
            _applyDataDetailPetakIrigasi();
          }
        });
        $("#datatable").on('draw.dt', function(){
          _applyDataDetailPetakIrigasi();
        });
        $("#datatable").on('search.dt', function(e){
          _applyDataDetailPetakIrigasi();
        });
      } else {
        var _htmlrow = "<tr><td colspan='6' class='text-center text-danger'>Tidak ada data</td></tr>";
        $('#datatable tbody').append(_htmlrow);
      }
    },
    username: null,
    password: null
  });
};

function _applyDataDetailPetakIrigasi(){
  $('a.viewdetaileddata').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _dataid = $(this).attr('id');
    $.ajax({
      url: "../dataservice/getSelectedDataParameter.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#ext-data').empty();
        if(data.status == 200){
          var _dataeto = data.dataeto[0], _datapor = data.datapor[0], _datache = data.datache[0], _datawir = data.datawir[0], _datadr = data.datadr[0];
          var htmlTables = `<table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Evapotranspirasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _dataeto.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _dataeto.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _dataeto.desa +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_dataeto.eto_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>
            <hr/>
            <table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Porositas Tanah</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datapor.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _datapor.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _datapor.desa +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                 <tr>
                  <td class='text-right'>`+ numeral(_datapor.por_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>
            <hr/>
            <table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Curah Hujan Efektif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datache.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _datache.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _datache.desa +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_datache.che_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>
            <hr/>
            <table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Kehilangan Air</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datawir.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _datawir.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _datawir.desa +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_datawir.wir_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>
            <hr/>
            <table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Nilai Kebutuhan Air</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datadr.nama_di +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_datadr.dr_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datadr.dr_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>`;
          $('#ext-data').html(htmlTables);
        } else {
          var _notice = "<p class='text-center text-danger'>Data tidak ditemukan.</p>";
          $('#ext-data').html(_notice);
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _displayDataSaluranIrigasi (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='9' class='text-center'>Data Saluran Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Kode</th>
                <th class='text-center'>No. Urut Saluran</th>
                <th class='text-center'>Nama</th>
                <th class='text-center'>Nama D.I.</th>
                <th class='text-center'>Nomenklatur</th>
                <th class='text-center'>Kecamatan</th>
                <th class='text-center'>Desa</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <hr/>
      <div class='row'>
        <div id='ext-data' class='col'></div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTableSaluranIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.k_saluran +"</td><td class='text-center'>"+ numeral(value.urut).format('0,0') +"</td><td>"+ value.nama +"</td><td>"+ value.nama_di +"</td><td>"+ value.nomenklatu +"</td><td>"+ value.kecamatan +"</td><td>"+ value.desa +"</td><td class='text-center'><a id='"+ value.ident +"' href='#' class='btn btn-primary btn-sm viewdetaileddata'>Data</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
        $('#datatable').DataTable({
          pageLength: 10,
          deferRender: true,
          lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
          initComplete: function(){
            _applyDataDetailSaluranIrigasi();
          }
        });
        $("#datatable").on('draw.dt', function(){
          _applyDataDetailSaluranIrigasi();
        });
        $("#datatable").on('search.dt', function(e){
          _applyDataDetailSaluranIrigasi();
        });
      } else {
        var _htmlrow = "<tr><td colspan='9' class='text-center text-danger'>Tidak ada data</td></tr>";
        $('#datatable tbody').append(_htmlrow);
      }
    },
    username: null,
    password: null
  });
};

function _applyDataDetailSaluranIrigasi(){
  $('a.viewdetaileddata').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _dataid = $(this).attr('id');
    $.ajax({
      url: "../dataservice/getSelectedDataSaluranIrigasi.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#ext-data').empty();
        if(data.status == 200){
          var _datasli = data.datasli[0], _dataei = data.dataei[0];
          var htmlTables = `<table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Saluran Irigasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datasli.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Nama</td>
                  <td colspan='9'>`+ _datasli.nama +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kode</td>
                  <td colspan='9'>`+ _datasli.k_saluran +`</td>
                </tr>
                <tr>
                  <td colspan='3'>No. Urut</td>
                  <td colspan='9'>`+ numeral(_datasli.urut).format('0,0') +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Nomenklatur</td>
                  <td colspan='9'>`+ _datasli.nomenklatu +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _datasli.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _datasli.desa +`</td>
                </tr>
                <tr>
                  <th colspan='12' class='text-center'>Data Efisiensi Irigasi</th>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>`;
          $('#ext-data').html(htmlTables);
        } else {
          var _notice = "<p class='text-center text-danger'>Data tidak ditemukan.</p>";
          $('#ext-data').html(_notice);
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _displayDataBangunanIrigasi (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='5' class='text-center'>Data Bangunan Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Kode Bangunan</th>
                <th class='text-center'>Nomenklatur</th>
                <th class='text-center'>Nama Bangunan</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <hr/>
      <div class='row'>
        <div id='ext-data' class='col'></div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTableBangunanIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.k_bangunan +"</td><td>"+ value.nomenklatu +"</td><td>"+ value.nama +"</td><td class='text-center'><a id='"+ value.gid +"' href='#' class='btn btn-primary btn-sm viewdetaileddata'>Data</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
        $('#datatable').DataTable({
          pageLength: 10,
          deferRender: true,
          lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
          initComplete: function(){
            _applyDataDetailBangunanIrigasi();
          }
        });
        $("#datatable").on('draw.dt', function(){
          _applyDataDetailBangunanIrigasi();
        });
        $("#datatable").on('search.dt', function(e){
          _applyDataDetailBangunanIrigasi();
        });
      } else {
        var _htmlrow = "<tr><td colspan='5' class='text-center text-danger'>Tidak ada data</td></tr>";
        $('#datatable tbody').append(_htmlrow);
      }
    },
    username: null,
    password: null
  });
};

function _applyDataDetailBangunanIrigasi(){
  $('a.viewdetaileddata').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _dataid = $(this).attr('id');
    $.ajax({
      url: "../dataservice/getSelectedDataBangunanIrigasi.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#ext-data').empty();
        if(data.status == 200){
          var _data = data.dataarray[0];
          var htmlTables = `<table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='2' class='text-center'>Data Bangunan Irigasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nama DI</td>
                  <td>`+ _data.nama_di +`</td>
                </tr>
                <tr>
                  <td>Nama</td>
                  <td>`+ _data.nama +`</td>
                </tr>
                <tr>
                  <td>Kode</td>
                  <td>`+ _data.k_bangunan +`</td>
                </tr>
                <tr>
                  <td>No. Urut</td>
                  <td>`+ numeral(_data.urut).format('0,0') +`</td>
                </tr>
                <tr>
                  <td>Nomenklatur</td>
                  <td>`+ _data.nomenklatu +`</td>
                </tr>
                <tr>
                  <td>Kondisi</td>
                  <td>`+ _data.kondisi +`</td>
                </tr>
              </tbody>
            </table>`;
          $('#ext-data').html(htmlTables);
        } else {
          var _notice = "<p class='text-center text-danger'>Data tidak ditemukan.</p>";
          $('#ext-data').html(_notice);
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _displayDataETO (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='6' class='text-center'>Data Petak Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Nama Daerah Irigasi</th>
                <th class='text-center'>Kecamatan</th>
                <th class='text-center'>Desa</th>
                <th class='text-center'>Luas</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <hr/>
      <div class='row'>
        <div id='ext-data' class='col'></div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTablePetakIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.nama_di +"</td><td>"+ value.kecamatan +"</td><td>"+ value.desa +"</td><td class='text-right'>"+ value.luas +"</td><td class='text-center'><a id='"+ value.ident +"' href='#' class='btn btn-primary btn-sm viewdetaileddata'>Data</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
        $('#datatable').DataTable({
          pageLength: 10,
          deferRender: true,
          lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
          initComplete: function(){
            _applyDataDetailETO();
          }
        });
        $("#datatable").on('draw.dt', function(){
          _applyDataDetailETO();
        });
        $("#datatable").on('search.dt', function(e){
          _applyDataDetailETO();
        });
      } else {
        var _htmlrow = "<tr><td colspan='6' class='text-center text-danger'>Tidak ada data</td></tr>";
        $('#datatable tbody').append(_htmlrow);
      }
    },
    username: null,
    password: null
  });
};

function _applyDataDetailETO(){
  $('a.viewdetaileddata').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _dataid = $(this).attr('id');
    $.ajax({
      url: "../dataservice/getSelectedDataParameter.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#ext-data').empty();
        if(data.status == 200){
          var _dataeto = data.dataeto[0], _datapor = data.datapor[0], _datache = data.datache[0], _datawir = data.datawir[0];
          var htmlTables = `<table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Evapotranspirasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _dataeto.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _dataeto.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _dataeto.desa +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_dataeto.eto_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataeto.eto_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>`;
          $('#ext-data').html(htmlTables);
        } else {
          var _notice = "<p class='text-center text-danger'>Data tidak ditemukan.</p>";
          $('#ext-data').html(_notice);
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _displayDataPOR (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='6' class='text-center'>Data Petak Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Nama Daerah Irigasi</th>
                <th class='text-center'>Kecamatan</th>
                <th class='text-center'>Desa</th>
                <th class='text-center'>Luas</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <hr/>
      <div class='row'>
        <div id='ext-data' class='col'></div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTablePetakIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.nama_di +"</td><td>"+ value.kecamatan +"</td><td>"+ value.desa +"</td><td class='text-right'>"+ value.luas +"</td><td class='text-center'><a id='"+ value.ident +"' href='#' class='btn btn-primary btn-sm viewdetaileddata'>Data</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
        $('#datatable').DataTable({
          pageLength: 10,
          deferRender: true,
          lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
          initComplete: function(){
            _applyDataDetailPOR();
          }
        });
        $("#datatable").on('draw.dt', function(){
          _applyDataDetailPOR();
        });
        $("#datatable").on('search.dt', function(e){
          _applyDataDetailPOR();
        });
      } else {
        var _htmlrow = "<tr><td colspan='6' class='text-center text-danger'>Tidak ada data</td></tr>";
        $('#datatable tbody').append(_htmlrow);
      }
    },
    username: null,
    password: null
  });
};

function _applyDataDetailPOR(){
  $('a.viewdetaileddata').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _dataid = $(this).attr('id');
    $.ajax({
      url: "../dataservice/getSelectedDataParameter.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#ext-data').empty();
        if(data.status == 200){
          var _dataeto = data.dataeto[0], _datapor = data.datapor[0], _datache = data.datache[0], _datawir = data.datawir[0];
          var htmlTables = `<table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Porositas Tanah</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datapor.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _datapor.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _datapor.desa +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                 <tr>
                  <td class='text-right'>`+ numeral(_datapor.por_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datapor.por_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>`;
          $('#ext-data').html(htmlTables);
        } else {
          var _notice = "<p class='text-center text-danger'>Data tidak ditemukan.</p>";
          $('#ext-data').html(_notice);
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _displayDataCHE (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='6' class='text-center'>Data Petak Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Nama Daerah Irigasi</th>
                <th class='text-center'>Kecamatan</th>
                <th class='text-center'>Desa</th>
                <th class='text-center'>Luas</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <hr/>
      <div class='row'>
        <div id='ext-data' class='col'></div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTablePetakIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.nama_di +"</td><td>"+ value.kecamatan +"</td><td>"+ value.desa +"</td><td class='text-right'>"+ value.luas +"</td><td class='text-center'><a id='"+ value.ident +"' href='#' class='btn btn-primary btn-sm viewdetaileddata'>Data</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
        $('#datatable').DataTable({
          pageLength: 10,
          deferRender: true,
          lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
          initComplete: function(){
            _applyDataDetailCHE();
          }
        });
        $("#datatable").on('draw.dt', function(){
          _applyDataDetailCHE();
        });
        $("#datatable").on('search.dt', function(e){
          _applyDataDetailCHE();
        });
      } else {
        var _htmlrow = "<tr><td colspan='6' class='text-center text-danger'>Tidak ada data</td></tr>";
        $('#datatable tbody').append(_htmlrow);
      }
    },
    username: null,
    password: null
  });
};

function _applyDataDetailCHE(){
  $('a.viewdetaileddata').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _dataid = $(this).attr('id');
    $.ajax({
      url: "../dataservice/getSelectedDataParameter.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#ext-data').empty();
        if(data.status == 200){
          var _dataeto = data.dataeto[0], _datapor = data.datapor[0], _datache = data.datache[0], _datawir = data.datawir[0];
          var htmlTables = `<table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Curah Hujan Efektif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datache.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _datache.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _datache.desa +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_datache.che_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datache.che_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>`;
          $('#ext-data').html(htmlTables);
        } else {
          var _notice = "<p class='text-center text-danger'>Data tidak ditemukan.</p>";
          $('#ext-data').html(_notice);
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _displayDataWIR (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='6' class='text-center'>Data Petak Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Nama Daerah Irigasi</th>
                <th class='text-center'>Kecamatan</th>
                <th class='text-center'>Desa</th>
                <th class='text-center'>Luas</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <hr/>
      <div class='row'>
        <div id='ext-data' class='col'></div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTablePetakIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.nama_di +"</td><td>"+ value.kecamatan +"</td><td>"+ value.desa +"</td><td class='text-right'>"+ value.luas +"</td><td class='text-center'><a id='"+ value.ident +"' href='#' class='btn btn-primary btn-sm viewdetaileddata'>Data</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
        $('#datatable').DataTable({
          pageLength: 10,
          deferRender: true,
          lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
          initComplete: function(){
            _applyDataDetailWIR();
          }
        });
        $("#datatable").on('draw.dt', function(){
          _applyDataDetailWIR();
        });
        $("#datatable").on('search.dt', function(e){
          _applyDataDetailWIR();
        });
      } else {
        var _htmlrow = "<tr><td colspan='6' class='text-center text-danger'>Tidak ada data</td></tr>";
        $('#datatable tbody').append(_htmlrow);
      }
    },
    username: null,
    password: null
  });
};

function _applyDataDetailWIR(){
  $('a.viewdetaileddata').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _dataid = $(this).attr('id');
    $.ajax({
      url: "../dataservice/getSelectedDataParameter.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#ext-data').empty();
        if(data.status == 200){
          var _dataeto = data.dataeto[0], _datapor = data.datapor[0], _datache = data.datache[0], _datawir = data.datawir[0];
          var htmlTables = `<table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Kehilangan Air</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datawir.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _datawir.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _datawir.desa +`</td>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_datawir.wir_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_datawir.wir_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>`;
          $('#ext-data').html(htmlTables);
        } else {
          var _notice = "<p class='text-center text-danger'>Data tidak ditemukan.</p>";
          $('#ext-data').html(_notice);
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};

function _displayDataEI (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  var _anchorElement = document.getElementById('app');
  _anchorElement.innerHTML = '';
  var htmlDOM = `<div class='container' style='margin-top:10px;'>
      <div class='row'>
        <div class='col'>
          <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapReadLoggedIn('app')"><i class='fa fa-map'></i>&nbsp;Peta</button></p>
          <hr/>
          <table id='datatable' class='table table-condensed table-striped table-bordered'>
            <thead>
              <tr>
                <th colspan='9' class='text-center'>Data Saluran Irigasi</th>
              </tr>
              <tr>
                <th class='text-center'>No.</th>
                <th class='text-center'>Kode</th>
                <th class='text-center'>No. Urut Saluran</th>
                <th class='text-center'>Nama</th>
                <th class='text-center'>Nama D.I.</th>
                <th class='text-center'>Nomenklatur</th>
                <th class='text-center'>Kecamatan</th>
                <th class='text-center'>Desa</th>
                <th class='text-center'></th>
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <hr/>
      <div class='row'>
        <div id='ext-data' class='col'></div>
      </div>
    </div>`;
  _anchorElement.innerHTML = htmlDOM;
  $.ajax({
    url: "../dataservice/getDataTableSaluranIrigasi.php",
    method: "GET",
    dataType: "json",
    data: {dataid:'default'},
    success: function (data) {
      if(data.status == 200){
        var _data = data.dataarray;
        var _htmlrow = "";
        var rowcount = 1;
        $.each(_data, function(key, value){
          _htmlrow += "<tr><td>"+ rowcount +".</td><td>"+ value.k_saluran +"</td><td class='text-center'>"+ numeral(value.urut).format('0,0') +"</td><td>"+ value.nama +"</td><td>"+ value.nama_di +"</td><td>"+ value.nomenklatu +"</td><td>"+ value.kecamatan +"</td><td>"+ value.desa +"</td><td class='text-center'><a id='"+ value.ident +"' href='#' class='btn btn-primary btn-sm viewdetaileddata'>Data</a></td></tr>";
          rowcount++;
        });
        $('#datatable tbody').append(_htmlrow);
        $('#datatable').DataTable({
          pageLength: 10,
          deferRender: true,
          lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
          initComplete: function(){
            _applyDataDetailEI();
          }
        });
        $("#datatable").on('draw.dt', function(){
          _applyDataDetailEI();
        });
        $("#datatable").on('search.dt', function(e){
          _applyDataDetailEI();
        });
      } else {
        var _htmlrow = "<tr><td colspan='9' class='text-center text-danger'>Tidak ada data</td></tr>";
        $('#datatable tbody').append(_htmlrow);
      }
    },
    username: null,
    password: null
  });
};

function _applyDataDetailEI(){
  $('a.viewdetaileddata').on('click', function(evt){
    evt.stopImmediatePropagation();
    var _dataid = $(this).attr('id');
    $.ajax({
      url: "../dataservice/getSelectedDataSaluranIrigasi.php",
      method: "GET",
      dataType: "json",
      data: {dataid:_dataid},
      success: function (data) {
        $('#ext-data').empty();
        if(data.status == 200){
          var _datasli = data.datasli[0], _dataei = data.dataei[0];
          var htmlTables = `<table class='table table-condensed table-striped table-bordered'>
              <thead>
                <tr>
                  <th colspan='12' class='text-center'>Data Saluran Irigasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan='3'>Nama DI</td>
                  <td colspan='9'>`+ _datasli.nama_di +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Nama</td>
                  <td colspan='9'>`+ _datasli.nama +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kode</td>
                  <td colspan='9'>`+ _datasli.k_saluran +`</td>
                </tr>
                <tr>
                  <td colspan='3'>No. Urut</td>
                  <td colspan='9'>`+ numeral(_datasli.urut).format('0,0') +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Nomenklatur</td>
                  <td colspan='9'>`+ _datasli.nomenklatu +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Kecamatan</td>
                  <td colspan='9'>`+ _datasli.kecamatan +`</td>
                </tr>
                <tr>
                  <td colspan='3'>Desa</td>
                  <td colspan='9'>`+ _datasli.desa +`</td>
                </tr>
                <tr>
                  <th colspan='12' class='text-center'>Data Efisiensi Irigasi</th>
                </tr>
                <tr>
                  <td class='text-center'>Januari</td><td class='text-center'>Februari</td><td class='text-center'>Maret</td><td class='text-center'>April</td><td class='text-center'>Mei</td><td class='text-center'>Juni</td><td class='text-center'>Juli</td><td class='text-center'>Agustus</td><td class='text-center'>September</td><td class='text-center'>Oktober</td><td class='text-center'>November</td><td class='text-center'>Desember</td>
                </tr>
                <tr>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_jan).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_feb).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_mar).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_apr).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_mei).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_jun).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_jul).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_ags).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_sept).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_okt).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_nov).format('0.00') +`</td>
                  <td class='text-right'>`+ numeral(_dataei.rerata_ei_des).format('0.00') +`</td>
                </tr>
              </tbody>
            </table>`;
          $('#ext-data').html(htmlTables);
        } else {
          var _notice = "<p class='text-center text-danger'>Data tidak ditemukan.</p>";
          $('#ext-data').html(_notice);
        }
      },
      username: null,
      password: null
    });
    return false;
  });
};