README: 
=================================================

Daftar Isi
-----------------

* [Pengantar](#pengantar)
* [Data](#data)
* [Desain Sistem](#desain-sistem)
* [Skema Basisdata](#skema-basisdata)
* [Live Demo](#live-demo)
* [Issue](#issue)
* [Acknowledgments](#acknowledgments)



Pengantar
------------
Project ini merupakan hasil dari pengembangan tesis saya di Prodi Master Teknik Geomatika, Departemen Teknik Geodesi, Universitas Gadjah Mada. 


Data
------------

Data irigasi (bangunan irigasi, saluran irigasi dan petak irigasi) Kecamatan Matesih dan Kecamatan KarangpandanKabupaten Karanganyar yang diperoleh dari DPUPKP Kabupaten Karanganyar. Data irigasi tersebut merupakan data spasial berformat vektor berupa data shapefile dengan luas wilayah kurang dari 10.000 ha.

Data iklim (suhu udara dengan satuan ℃, kelembaban udara rata-rata dengan satuan %, kecepatan angin rata-rata dengan satuan %, dan curah hujan dengan satuan mm) Kecamatan Matesih dan Kecamatan Karangpandan Kabupaten Karanganyar. Data tersebut merupakan data nonspasial diperoleh dari Stasiun Staklim BMKG Kelas I Semarang.

Data Porositas Tanah kecamatan Matesih dan Kecamatan KarangpandanKabupaten Karanganyar. Data tersebut merupakan data nonspasial yang diperoleh dari Dinas Pertanian dan Pangan Kabupaten Karanganyar.


Desain Sistem
------------
Berdasarkan analisis kebutuhan pengguna dan kebutuhan sistem didapatkan infrastruktur sistem backend yang dibuat yaitu terdiri atas tiga komponen utama yaitu web server, server side scripting dan database. Untuk infrastruktur frontend yang dibuat terdiri atas tiga komponen utama yaitu HTML5, CSS dan JavaScript.
Salah satu kelebihan dari webmap **SIRISKA** ini yaitu selain memiliki fungsi CRUD (Create Read Update Delete) juga dapat melakukan perhitungan otomatis kebutuhan air  

![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/Tesis_Dimas-Backend%20dan%20frontend.png)


Skema Basidata
------------
Pembangunan basisdata yang dilakukan terdiri atas dua tahapan utama yaitu konseptual, fisikal
* Basisdata Konseptual

![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/Tesis_Dimas-Basis%20Data%20konseptual.png)

* Basisdata Fisikal

![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/Tesis_Dimas-Basisdata%20Fisikal.png)

Use Case dan Activity Diagram
-----

 * Activity Diagram

![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/Activity%20Diagram.jpg)
 
 * Use Case Diagram

![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/Tesis_Dimas-Use%20case%20diagram.png)


Skema Perhitungan Otomatis Kebutuhan Air Irigasi
---------------
![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/Tesis_Dimas-Workflow%20Kalkulasi.png)


Interface
---------------

1. Tampilan Sebelum Login
![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/interface_sebelum_login.jpg)

  * Read data Tabular
![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/read_data_fix.jpg)

  * Read data spasial
![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/spasial_read_fix.jpg)


2. Tampilan Setelah Login
![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/interface_setelah_login.jpg)

 * Form Create Data Irigasi
![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/form_create_data_irigasi.jpg)

 * Form Update Data Irigasi
![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/form_Update_data_irigasi.jpg)

 * Download Data
![](https://github.com/ugadimas25/siriska_apps/blob/main/assets/images/download.jpg)



Acknowledgments
---------------
Terima kasih saya ucapkan terutama kepada Orang Tua dan Dosen Pembimbing Tesis Saya yaitu Pak [Dr. Trias Aditya](https://www.linkedin.com/in/trias-aditya-a9964715/) yang telah sangat berjasa atas pembuatan tesis ini. Selain itu saya ucapkan secara khusus kepada Pak [Andy Prasetya](https://www.linkedin.com/in/andy-prasetya-40662ba5/) yang telah banyak membantu saya dalam pembuatan webmap yang merupakan salah satu hasil dari produk tesis saya. 


