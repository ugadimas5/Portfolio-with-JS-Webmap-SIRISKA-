function _downloadGeoJSONPetakIrigasi(){
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadpetakirigasi.php')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'petak_irigasi_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadGeoJSONETO(){
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadeto.php')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'evapotranspirasi_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadSingleGeoJSONETO(){
  let _dataid = $('#_dataid').val();
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadsingleeto.php?dataid='+_dataid+'')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'evapotranspirasi_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadGeoJSONPOR(){
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadpor.php')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'porositas_tanah_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadSingleGeoJSONPOR(){
  let _dataid = $('#_dataid').val();
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadsinglepor.php?dataid='+_dataid+'')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'porositas_tanah_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadGeoJSONCHE(){
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadche.php')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'curah_hujan_efektif_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadSingleGeoJSONCHE(){
  let _dataid = $('#_dataid').val();
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadsingleche.php?dataid='+_dataid+'')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'curah_hujan_efektif_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadGeoJSONWIR(){
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadwir.php')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'kehilangan_air_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadSingleGeoJSONWIR(){
  let _dataid = $('#_dataid').val();
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadsinglewir.php?dataid='+_dataid+'')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'kehilangan_air_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadGeoJSONDR(){
  let dt = new Date().valueOf();
  fetch('../dataservice/downloaddr.php')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'kebutuhan_air_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};

function _downloadSingleGeoJSONDR(){
  let dt = new Date().valueOf();
  fetch('../dataservice/downloadsingledr.php?dataid='+_dataid+'')
  .then(response => response.blob())
  .then(blobdata => {
    const url = window.URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'kebutuhan_air_'+dt+'.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(() => alert('Data gagal diunduh!'));
};