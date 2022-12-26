function _updateEvapotranspirasi(){
  var _dataid = $('#objectid').val();
  var _anchorElement = document.getElementById('app');
  $.ajax({
    url: "../dataservice/get_evapotranspirasi_data.php",
    method: "GET",
    dataType: "json",
    data: {dataid:_dataid},
    success: function (data) {
      _anchorElement.innerHTML = '';
      var _data = data.dataarray[0];
      var htmlDOM = `<div class='container' style='margin-top:10px;'>
          <div class='row'>
            <div class='col'>
              <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-map'></i>&nbsp;Kembali ke Peta</button></p>
              <hr/>
              <form id='updateform' name='updateform'>
                <input type='hidden' id='dataid' name='dataid' value='`+ _data.ident +`'/>
                <input type='hidden' id='tahun' name='tahun' value='`+ _data.tahun +`'/>
                <table class='table table-condensed table-striped table-bordered'>
                  <thead>
                    <tr>
                      <th colspan='2' class='text-center'>Pembaruan Data Evapotranspirasi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th class=''><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-power-off'></i>&nbsp;Batal / Kembali ke Peta</button></th>
                      <th class='text-right'><button type='submit' class='btn btn-primary btn-sm'><i class='fa fa-floppy-o'></i>&nbsp;Simpan Data</button></th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Kecamatan</td>
                      <td>`+ _data.kecamatan +`</td>
                    </tr>
                    <tr>
                      <td>Desa</td>
                      <td>`+ _data.desa +`</td>
                    </tr>
                    <tr>
                      <td>Nama DI</td>
                      <td>`+ _data.nama_di +`</td>
                    </tr>
                    <tr>
                      <td>Tahun</td>
                      <td>`+ _data.tahun +`</td>
                    </tr>
                    <tr>
                      <th colspan='2' class='text-center'>Data Evapotranspirasi</td>
                    </tr>
                    <tr>
                      <td>Januari</td>
                      <td><input type='text' id='eto_jan' name='eto_jan' class='form-control text-right' value='`+ _data.eto_jan +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Februari</td>
                      <td><input type='text' id='eto_feb' name='eto_feb' class='form-control text-right' value='`+ _data.eto_feb +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Maret</td>
                      <td><input type='text' id='eto_mar' name='eto_mar' class='form-control text-right' value='`+ _data.eto_mar +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>April</td>
                      <td><input type='text' id='eto_apr' name='eto_apr' class='form-control text-right' value='`+ _data.eto_apr +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Mei</td>
                      <td><input type='text' id='eto_mei' name='eto_mei' class='form-control text-right' value='`+ _data.eto_mei +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juni</td>
                      <td><input type='text' id='eto_jun' name='eto_jun' class='form-control text-right' value='`+ _data.eto_jun +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juli</td>
                      <td><input type='text' id='eto_jul' name='eto_jul' class='form-control text-right' value='`+ _data.eto_jul +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Agustus</td>
                      <td><input type='text' id='eto_ags' name='eto_ags' class='form-control text-right' value='`+ _data.eto_ags +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>September</td>
                      <td><input type='text' id='eto_sept' name='eto_sept' class='form-control text-right' value='`+ _data.eto_sept +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Oktober</td>
                      <td><input type='text' id='eto_okt' name='eto_okt' class='form-control text-right' value='`+ _data.eto_okt +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>November</td>
                      <td><input type='text' id='eto_nov' name='eto_nov' class='form-control text-right' value='`+ _data.eto_nov +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Desember</td>
                      <td><input type='text' id='eto_des' name='eto_des' class='form-control text-right' value='`+ _data.eto_des +`' autocomplete='off'/></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>`;
      _anchorElement.innerHTML = htmlDOM;
      _applyUpdateEvapotranspirasi();
    },
    username: null,
    password: null
  });
}

function _applyUpdateEvapotranspirasi(){
  $('#updateform').on('submit', function(evt){
    evt.preventDefault();
    $.ajax({
      url: "../dataservice/update_data_evapotranspirasi.php",
      method: "POST",
      dataType: "json",
      data: $('#updateform').serialize(),
      success: function (data) {
        if (data.response=="200") {
          _displayMapUpdateParamsKebAir('app');
        } else {
          console.log('Failed to save.');
        }
      },
      username: null,
      password: null
    });
  });
}

function _updatePorositas(){
  var _dataid = $('#objectid').val();
  var _anchorElement = document.getElementById('app');
  $.ajax({
    url: "../dataservice/get_porositas_data.php",
    method: "GET",
    dataType: "json",
    data: {dataid:_dataid},
    success: function (data) {
      _anchorElement.innerHTML = '';
      var _data = data.dataarray[0];
      var htmlDOM = `<div class='container' style='margin-top:10px;'>
          <div class='row'>
            <div class='col'>
              <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-map'></i>&nbsp;Kembali ke Peta</button></p>
              <hr/>
              <form id='updateform' name='updateform'>
                <input type='hidden' id='dataid' name='dataid' value='`+ _data.ident +`'/>
                <input type='hidden' id='tahun' name='tahun' value='`+ _data.tahun +`'/>
                <table class='table table-condensed table-striped table-bordered'>
                  <thead>
                    <tr>
                      <th colspan='2' class='text-center'>Pembaruan Data Porositas Tanah</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th class=''><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-power-off'></i>&nbsp;Batal / Kembali ke Peta</button></th>
                      <th class='text-right'><button type='submit' class='btn btn-primary btn-sm'><i class='fa fa-floppy-o'></i>&nbsp;Simpan Data</button></th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Kecamatan</td>
                      <td>`+ _data.kecamatan +`</td>
                    </tr>
                    <tr>
                      <td>Desa</td>
                      <td>`+ _data.desa +`</td>
                    </tr>
                    <tr>
                      <td>Nama DI</td>
                      <td>`+ _data.nama_di +`</td>
                    </tr>
                    <tr>
                      <td>Tahun</td>
                      <td>`+ _data.tahun +`</td>
                    </tr>
                    <tr>
                      <th colspan='2' class='text-center'>Data Porositas Tanah</td>
                    </tr>
                    <tr>
                      <td>Januari</td>
                      <td><input type='text' id='por_jan' name='por_jan' class='form-control text-right' value='`+ _data.por_jan +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Februari</td>
                      <td><input type='text' id='por_feb' name='por_feb' class='form-control text-right' value='`+ _data.por_feb +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Maret</td>
                      <td><input type='text' id='por_mar' name='por_mar' class='form-control text-right' value='`+ _data.por_mar +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>April</td>
                      <td><input type='text' id='por_apr' name='por_apr' class='form-control text-right' value='`+ _data.por_apr +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Mei</td>
                      <td><input type='text' id='por_mei' name='por_mei' class='form-control text-right' value='`+ _data.por_mei +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juni</td>
                      <td><input type='text' id='por_jun' name='por_jun' class='form-control text-right' value='`+ _data.por_jun +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juli</td>
                      <td><input type='text' id='por_jul' name='por_jul' class='form-control text-right' value='`+ _data.por_jul +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Agustus</td>
                      <td><input type='text' id='por_ags' name='por_ags' class='form-control text-right' value='`+ _data.por_ags +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>September</td>
                      <td><input type='text' id='por_sept' name='por_sept' class='form-control text-right' value='`+ _data.por_sept +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Oktober</td>
                      <td><input type='text' id='por_okt' name='por_okt' class='form-control text-right' value='`+ _data.por_okt +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>November</td>
                      <td><input type='text' id='por_nov' name='por_nov' class='form-control text-right' value='`+ _data.por_nov +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Desember</td>
                      <td><input type='text' id='por_des' name='por_des' class='form-control text-right' value='`+ _data.por_des +`' autocomplete='off'/></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>`;
      _anchorElement.innerHTML = htmlDOM;
      _applyUpdatePorositas();
    },
    username: null,
    password: null
  });
}

function _applyUpdatePorositas(){
  $('#updateform').on('submit', function(evt){
    evt.preventDefault();
    $.ajax({
      url: "../dataservice/update_data_porositas.php",
      method: "POST",
      dataType: "json",
      data: $('#updateform').serialize(),
      success: function (data) {
        if (data.response=="200") {
          _displayMapUpdateParamsKebAir('app');
        } else {
          console.log('Failed to save.');
        }
      },
      username: null,
      password: null
    });
  });
}

function _updateCurahHujanEfektif(){
  var _dataid = $('#objectid').val();
  var _anchorElement = document.getElementById('app');
  $.ajax({
    url: "../dataservice/get_che_data.php",
    method: "GET",
    dataType: "json",
    data: {dataid:_dataid},
    success: function (data) {
      _anchorElement.innerHTML = '';
      var _data = data.dataarray[0];
      var htmlDOM = `<div class='container' style='margin-top:10px;'>
          <div class='row'>
            <div class='col'>
              <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-map'></i>&nbsp;Kembali ke Peta</button></p>
              <hr/>
              <form id='updateform' name='updateform'>
                <input type='hidden' id='dataid' name='dataid' value='`+ _data.ident +`'/>
                <input type='hidden' id='tahun' name='tahun' value='`+ _data.tahun +`'/>
                <table class='table table-condensed table-striped table-bordered'>
                  <thead>
                    <tr>
                      <th colspan='2' class='text-center'>Pembaruan Data Curah Hujan Efektif</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th class=''><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-power-off'></i>&nbsp;Batal / Kembali ke Peta</button></th>
                      <th class='text-right'><button type='submit' class='btn btn-primary btn-sm'><i class='fa fa-floppy-o'></i>&nbsp;Simpan Data</button></th>
                    </tr>
                  </tfoot>
                  <tbody>
                   <tr>
                      <td>Kecamatan</td>
                      <td>`+ _data.kecamatan +`</td>
                    </tr>
                    <tr>
                      <td>Desa</td>
                      <td>`+ _data.desa +`</td>
                    </tr>
                    <tr>
                      <td>Nama DI</td>
                      <td>`+ _data.nama_di +`</td>
                    </tr>
                    <tr>
                      <td>Tahun</td>
                      <td>`+ _data.tahun +`</td>
                    </tr>
                    <tr>
                      <th colspan='2' class='text-center'>Data Curah Hujan Efektif</td>
                    </tr>
                    <tr>
                      <td>Januari</td>
                      <td><input type='text' id='che_jan' name='che_jan' class='form-control text-right' value='`+ _data.che_jan +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Februari</td>
                      <td><input type='text' id='che_feb' name='che_feb' class='form-control text-right' value='`+ _data.che_feb +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Maret</td>
                      <td><input type='text' id='che_mar' name='che_mar' class='form-control text-right' value='`+ _data.che_mar +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>April</td>
                      <td><input type='text' id='che_apr' name='che_apr' class='form-control text-right' value='`+ _data.che_apr +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Mei</td>
                      <td><input type='text' id='che_mei' name='che_mei' class='form-control text-right' value='`+ _data.che_mei +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juni</td>
                      <td><input type='text' id='che_jun' name='che_jun' class='form-control text-right' value='`+ _data.che_jun +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juli</td>
                      <td><input type='text' id='che_jul' name='che_jul' class='form-control text-right' value='`+ _data.che_jul +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Agustus</td>
                      <td><input type='text' id='che_ags' name='che_ags' class='form-control text-right' value='`+ _data.che_ags +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>September</td>
                      <td><input type='text' id='che_sept' name='che_sept' class='form-control text-right' value='`+ _data.che_sept +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Oktober</td>
                      <td><input type='text' id='che_okt' name='che_okt' class='form-control text-right' value='`+ _data.che_okt +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>November</td>
                      <td><input type='text' id='che_nov' name='che_nov' class='form-control text-right' value='`+ _data.che_nov +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Desember</td>
                      <td><input type='text' id='che_des' name='che_des' class='form-control text-right' value='`+ _data.che_des +`' autocomplete='off'/></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>`;
      _anchorElement.innerHTML = htmlDOM;
      _applyUpdateCurahHujanEfektif()
    },
    username: null,
    password: null
  });
}

function _applyUpdateCurahHujanEfektif(){
  $('#updateform').on('submit', function(evt){
    evt.preventDefault();
    $.ajax({
      url: "../dataservice/update_data_che.php",
      method: "POST",
      dataType: "json",
      data: $('#updateform').serialize(),
      success: function (data) {
        if (data.response=="200") {
          _displayMapUpdateParamsKebAir('app');
        } else {
          console.log('Failed to save.');
        }
      },
      username: null,
      password: null
    });
  });
}

function _updateKehilanganair(){
  var _dataid = $('#objectid').val();
  var _anchorElement = document.getElementById('app');
  $.ajax({
    url: "../dataservice/get_wlr_data.php",
    method: "GET",
    dataType: "json",
    data: {dataid:_dataid},
    success: function (data) {
      _anchorElement.innerHTML = '';
      var _data = data.dataarray[0];
      var htmlDOM = `<div class='container' style='margin-top:10px;'>
          <div class='row'>
            <div class='col'>
              <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-map'></i>&nbsp;Kembali ke Peta</button></p>
              <hr/>
              <form id='updateform' name='updateform'>
                <input type='hidden' id='dataid' name='dataid' value='`+ _data.ident +`'/>
                <input type='hidden' id='tahun' name='tahun' value='`+ _data.tahun +`'/>
                <table class='table table-condensed table-striped table-bordered'>
                  <thead>
                    <tr>
                      <th colspan='2' class='text-center'>Pembaruan Data Kehilangan Air</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th class=''><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-power-off'></i>&nbsp;Batal / Kembali ke Peta</button></th>
                      <th class='text-right'><button type='submit' class='btn btn-primary btn-sm'><i class='fa fa-floppy-o'></i>&nbsp;Simpan Data</button></th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Kecamatan</td>
                      <td>`+ _data.kecamatan +`</td>
                    </tr>
                    <tr>
                      <td>Desa</td>
                      <td>`+ _data.desa +`</td>
                    </tr>
                    <tr>
                      <td>Nama DI</td>
                      <td>`+ _data.nama_di +`</td>
                    </tr>
                    <tr>
                      <td>Tahun</td>
                      <td>`+ _data.tahun +`</td>
                    </tr>
                    <tr>
                      <th colspan='2' class='text-center'>Data Kehilangan Air</td>
                    </tr>
                    <tr>
                      <td>Januari</td>
                      <td><input type='text' id='wir_jan' name='wir_jan' class='form-control text-right' value='`+ _data.wir_jan +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Februari</td>
                      <td><input type='text' id='wir_feb' name='wir_feb' class='form-control text-right' value='`+ _data.wir_feb +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Maret</td>
                      <td><input type='text' id='wir_mar' name='wir_mar' class='form-control text-right' value='`+ _data.wir_mar +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>April</td>
                      <td><input type='text' id='wir_apr' name='wir_apr' class='form-control text-right' value='`+ _data.wir_apr +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Mei</td>
                      <td><input type='text' id='wir_mei' name='wir_mei' class='form-control text-right' value='`+ _data.wir_mei +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juni</td>
                      <td><input type='text' id='wir_jun' name='wir_jun' class='form-control text-right' value='`+ _data.wir_jun +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juli</td>
                      <td><input type='text' id='wir_jul' name='wir_jul' class='form-control text-right' value='`+ _data.wir_jul +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Agustus</td>
                      <td><input type='text' id='wir_ags' name='wir_ags' class='form-control text-right' value='`+ _data.wir_ags +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>September</td>
                      <td><input type='text' id='wir_sept' name='wir_sept' class='form-control text-right' value='`+ _data.wir_sept +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Oktober</td>
                      <td><input type='text' id='wir_okt' name='wir_okt' class='form-control text-right' value='`+ _data.wir_okt +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>November</td>
                      <td><input type='text' id='wir_nov' name='wir_nov' class='form-control text-right' value='`+ _data.wir_nov +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Desember</td>
                      <td><input type='text' id='wir_des' name='wir_des' class='form-control text-right' value='`+ _data.wir_des +`' autocomplete='off'/></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>`;
      _anchorElement.innerHTML = htmlDOM;
      _applyUpdateKehilanganAir();
    },
    username: null,
    password: null
  });
}

function _applyUpdateKehilanganAir(){
  $('#updateform').on('submit', function(evt){
    evt.preventDefault();
    $.ajax({
      url: "../dataservice/update_data_wlr.php",
      method: "POST",
      dataType: "json",
      data: $('#updateform').serialize(),
      success: function (data) {
        if (data.response=="200") {
          _displayMapUpdateParamsKebAir('app');
        } else {
          console.log('Failed to save.');
        }
      },
      username: null,
      password: null
    });
  });
}

function _updateEfisiensiIrigasi(){
  var _dataid = $('#objectid').val();
  var _anchorElement = document.getElementById('app');
  $.ajax({
    url: "../dataservice/get_efisiensiirigasi_data.php",
    method: "GET",
    dataType: "json",
    data: {dataid:_dataid},
    success: function (data) {
      _anchorElement.innerHTML = '';
      var _data = data.dataarray[0];
      var htmlDOM = `<div class='container' style='margin-top:10px;'>
          <div class='row'>
            <div class='col'>
              <p class='text-right'><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-map'></i>&nbsp;Kembali ke Peta</button></p>
              <hr/>
              <form id='updateform' name='updateform'>
                <input type='hidden' id='dataid' name='dataid' value='`+ _data.ident +`'/>
                <input type='hidden' id='tahun' name='tahun' value='`+ _data.tahun +`'/>
                <table class='table table-condensed table-striped table-bordered'>
                  <thead>
                    <tr>
                      <th colspan='2' class='text-center'>Pembaruan Data Efisiensi Irigasi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th class=''><button type='button' class='btn btn-primary btn-sm' onclick="_displayMapUpdateParamsKebAir('app')"><i class='fa fa-power-off'></i>&nbsp;Batal / Kembali ke Peta</button></th>
                      <th class='text-right'><button type='submit' class='btn btn-primary btn-sm'><i class='fa fa-floppy-o'></i>&nbsp;Simpan Data</button></th>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>Kecamatan</td>
                      <td>`+ _data.kecamatan +`</td>
                    </tr>
                    <tr>
                      <td>Desa</td>
                      <td>`+ _data.desa +`</td>
                    </tr>
                    <tr>
                      <td>Nama DI</td>
                      <td>`+ _data.nama_di +`</td>
                    </tr>
                    <tr>
                      <td>Tahun</td>
                      <td>`+ _data.tahun +`</td>
                    </tr>
                    <tr>
                      <th colspan='2' class='text-center'>Data Efisiensi Irigasi</td>
                    </tr>
                    <tr>
                      <td>Januari</td>
                      <td><input type='text' id='rerata_ei_jan' name='rerata_ei_jan' class='form-control text-right' value='`+ _data.rerata_ei_jan +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Februari</td>
                      <td><input type='text' id='rerata_ei_feb' name='rerata_ei_feb' class='form-control text-right' value='`+ _data.rerata_ei_feb +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Maret</td>
                      <td><input type='text' id='rerata_ei_mar' name='rerata_ei_mar' class='form-control text-right' value='`+ _data.rerata_ei_mar +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>April</td>
                      <td><input type='text' id='rerata_ei_apr' name='rerata_ei_apr' class='form-control text-right' value='`+ _data.rerata_ei_apr +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Mei</td>
                      <td><input type='text' id='rerata_ei_mei' name='rerata_ei_mei' class='form-control text-right' value='`+ _data.rerata_ei_mei +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juni</td>
                      <td><input type='text' id='rerata_ei_jun' name='rerata_ei_jun' class='form-control text-right' value='`+ _data.rerata_ei_jun +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Juli</td>
                      <td><input type='text' id='rerata_ei_jul' name='rerata_ei_jul' class='form-control text-right' value='`+ _data.rerata_ei_jul +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Agustus</td>
                      <td><input type='text' id='rerata_ei_ags' name='rerata_ei_ags' class='form-control text-right' value='`+ _data.rerata_ei_ags +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>September</td>
                      <td><input type='text' id='rerata_ei_sept' name='rerata_ei_sept' class='form-control text-right' value='`+ _data.rerata_ei_sept +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Oktober</td>
                      <td><input type='text' id='rerata_ei_okt' name='rerata_ei_okt' class='form-control text-right' value='`+ _data.rerata_ei_okt +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>November</td>
                      <td><input type='text' id='rerata_ei_nov' name='rerata_ei_nov' class='form-control text-right' value='`+ _data.rerata_ei_nov +`' autocomplete='off'/></td>
                    </tr>
                    <tr>
                      <td>Desember</td>
                      <td><input type='text' id='rerata_ei_des' name='rerata_ei_des' class='form-control text-right' value='`+ _data.rerata_ei_des +`' autocomplete='off'/></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>`;
      _anchorElement.innerHTML = htmlDOM;
      _applyUpdateEfisiensiIrigasi();
    },
    username: null,
    password: null
  });
}

function _applyUpdateEfisiensiIrigasi(){
  $('#updateform').on('submit', function(evt){
    evt.preventDefault();
    $.ajax({
      url: "../dataservice/update_data_efisiensi.php",
      method: "POST",
      dataType: "json",
      data: $('#updateform').serialize(),
      success: function (data) {
        if (data.response=="200") {
          _displayMapUpdateParamsKebAir('app');
        } else {
          console.log('Failed to save.');
        }
      },
      username: null,
      password: null
    });
  });
}