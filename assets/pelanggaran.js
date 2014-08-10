//LIHAT SEMUA DATA PELANGGARAN
function get_all_report(){	
	$.mobile.loading("show"); //show loading
	//$('#tabverifikasi').show();//show tab
	$('#mysingle').hide();
	$('#title').html('<h3>Semua Pelanggaran</h3>');
	$.ajax({
		url: 'http://api.pemiluapi.org/laporan_pelanggaran/api/reports?apiKey=81467a5060215a1ec4cad4e21164f454&limit=10&offset=0',
		type: 'GET',
		dataType: 'json',
		json: 'jsoncallback',
		timeout: 100000,
		async: true,
		success: function (response) {
			$('#mycontent').show();
			$('#list-berita').show();
			$('#list-berita').html('');
			var AmbilData = response.data.results.reports;
			$.each(AmbilData, function(index, loadata){
				$('#list-berita').append('<li><a class="show-page-loading-msg" data-textonly="true" data-textvisible="true" data-msgtext="Text only loader" data-inline="true" onclick="get_det_report(\''+loadata.id+'\')" ><br/><h2>'+loadata.judul_laporan+'</h2><p>'+loadata.keterangan+'<br/><strong>Lokasi :'+loadata.alamat+'</strong></p><p style="margin-bottom:10px" class="ui-li-aside">'+loadata.tanggal_kejadian+'</br></p></a></li>');
				$('#list-berita').listview('refresh');
			});
			$('#list-berita').append('<li><center><a onclick="get_more_report(5,10)" style="color:#000;text-decoration:none;" href="">lihat berikutnya</a></center</li>');			
			$('#list-berita').listview('refresh');
   			$.mobile.loading("hide"); //hide loading
   		},
   		error: function (request,error) {
   			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });	
}

//LIHAT BERIKUTNYA
function get_more_report(l,o){
	$.mobile.loading("show"); //show loading
	var limit = l;//untuk limitnya
	var offset = o;//untuk offsetnya
	var nextoffset = o + 5;//untuk next offset 
	$.ajax({
		url: 'http://api.pemiluapi.org/laporan_pelanggaran/api/reports?apiKey=81467a5060215a1ec4cad4e21164f454&limit='+l+'&offset='+o+'',
		type: 'GET',
		dataType: 'json',
		json: 'jsoncallback',
		timeout: 100000,
		async: true,
		success: function (response) {
			var AmbilData = response.data.results.reports;
			$.each(AmbilData, function(index, loadata){
				$('#list-berita').append('<li><a class="show-page-loading-msg" data-textonly="true" data-textvisible="true" data-msgtext="Text only loader" data-inline="true" onclick="get_det_report(\''+loadata.id+'\')" ><br/><h2>'+loadata.judul_laporan+'</h2><p>'+loadata.keterangan+'<br/><strong>Lokasi :'+loadata.alamat+'</strong></p><p style="margin-bottom:10px" class="ui-li-aside">'+loadata.tanggal_kejadian+'</br></p></a></li>');
				$('#list-berita').listview('refresh');
			});
			$('#list-berita').append('<li><center><a onclick="get_more_report(5,'+nextoffset+')" style="color:#000;text-decoration:none;" href="">lihat berikutnya</a></center</li>');			
			$('#list-berita').listview('refresh');
   			$.mobile.loading("hide"); //hide loading
   		},
   		error: function (request,error) {
   			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });
}

// //laporan yang sudah diverifikasi
function show_report_status(x){ //x verified
	var status = x;//set status
	$.mobile.loading("show"); //show loading
	$.ajax({
		url: 'http://api.pemiluapi.org/laporan_pelanggaran/api/reports?apiKey=81467a5060215a1ec4cad4e21164f454&limit=10&offset=0',
		type: 'GET',
		dataType: 'json',
		json: 'jsoncallback',
		timeout: 100000,
		async: true,
		success: function (response) {
			$('#mycontent').show();
			$('#mysingle').hide();
			$('#list-berita').show();
			$('#list-berita').html('');
			var AmbilData = response.data.results.reports;
			$.each(AmbilData, function(index, loadata){
				//data yang ditampilkan adalah data yang sesuai dengan parameter
				if(loadata.status == status){
					$('#title').html('Pelanggaran Terverifikasi');
					$('#list-berita').append('<li><a class="show-page-loading-msg" data-textonly="true" data-textvisible="true" data-msgtext="Text only loader" data-inline="true" onclick="get_det_report(\''+loadata.id+'\')" ><br/><h2>'+loadata.judul_laporan+'</h2><p>'+loadata.keterangan+'<br/><strong>Lokasi :'+loadata.alamat+'</strong></p><p style="margin-bottom:10px" class="ui-li-aside">'+loadata.tanggal_kejadian+'</br></p></a></li>');
					$('#list-berita').listview('refresh');
					$.mobile.loading("hide"); //hide loading
				} else {
					$('#title').html('Pelanggaran Belum Terverifikasi');
					$('#mycontent').hide();
					$.mobile.loading("hide"); //hide loading
				}				
			});
			
   		},
   		error: function (request,error) {
   			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });
}

//LIST LOCATION
function get_location_report(){
	$('#tabverifikasi').hide();//show tab
	$.mobile.loading("show"); //show loading
	$('#mysingle').hide();
	$('#title').html('<h3>menunggu...</h3>');
	var list = ""; //save location
	$.ajax({
		url: 'http://api.pemiluapi.org/laporan_pelanggaran/api/reports?apiKey=81467a5060215a1ec4cad4e21164f454',
		type: 'GET',
		dataType: 'json',
		json: 'jsoncallback',
		timeout: 100000,
		async: true,
		success: function (response) {
			$('#mycontent').show();
			$('#title').html('Lokasi Pelanggaran');
			$('#list-berita').show();
			$('#list-berita').html('');
			var AmbilData = response.data.results.reports;
			$.each(AmbilData, function(i, loaddata){
				if ( loaddata.provinsi != list ){
				//if(loaddata.provinsi != list) {
					$('#list-berita').append('<li><a onclick="get_report_by_location(\''+loaddata.provinsi+'\')" href="#">'+loaddata.provinsi+'<span style="color:#000" class="ui-li-count">data count</span></a></li>');
					$('#list-berita').listview('refresh');		
					list = loaddata.provinsi; //menambah lokasi di array				
				}						
			});
			$.mobile.loading("hide"); //hide loading
		},
		error: function (request,error) {
			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });	
}

//LIST REPORT BY LOCATION
function get_report_by_location(x){
	$.mobile.loading("show"); //show loading
	var lokasi = x;//get location
	$('#tabverifikasi').show();//show tab
	$('#mysingle').hide();
	$('#title').html('<h3>Location : '+x+'</h3>');
	$.ajax({
		url: 'http://api.pemiluapi.org/laporan_pelanggaran/api/reports?apiKey=81467a5060215a1ec4cad4e21164f454',
		type: 'GET',
		dataType: 'json',
		json: 'jsoncallback',
		timeout: 100000,
		async: true,
		success: function (response) {
			$('#mycontent').show();
			$('#list-berita').show();
			$('#list-berita').html('');
			var AmbilData = response.data.results.reports;
			$.each(AmbilData, function(index, loadata){
				if(loadata.provinsi == lokasi) {
					$('#list-berita').append('<li><a class="show-page-loading-msg" data-textonly="true" data-textvisible="true" data-msgtext="Text only loader" data-inline="true" onclick="get_det_report(\''+loadata.id+'\')" ><br/><h2>'+loadata.judul_laporan+'</h2><p>'+loadata.keterangan+'<br/><strong>Lokasi :'+loadata.alamat+'</strong></p><p style="margin-bottom:10px" class="ui-li-aside">'+loadata.tanggal_kejadian+'</br></p></a></li>');
					$('#list-berita').listview('refresh');
				}				
			});
			// $('#list-berita').append('<li><center><a onclick="get_more_report(5,10)" style="color:#000;text-decoration:none;" href="">lihat berikutnya</a></center</li>');			
			// $('#list-berita').listview('refresh');
   			$.mobile.loading("hide"); //hide loading
   		},
   		error: function (request,error) {
   			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });	
}

//LIST TAGS
function get_tags_report(){
	$('#tabverifikasi').hide();//show tab
	$.mobile.loading("show"); //show loading
	$('#mysingle').hide();
	$('#title').html('<h3>Semua Tags Pelanggaran</h3>');
	$.ajax({
		url: 'http://api.pemiluapi.org/laporan_pelanggaran/api/tags?apiKey=81467a5060215a1ec4cad4e21164f454',
		type: 'GET',
		dataType: 'json',
		json: 'jsoncallback',
		timeout: 100000,
		async: true,
		success: function (response) {
			$('#mycontent').show();
			$('#list-berita').show();
			$('#list-berita').html('');
			var AmbilData = response.data.results.tags;
			$.each(AmbilData, function(i, loaddata){
				$('#list-berita').append('<li><a onclick="get_report_by_tags(\''+loaddata.tag+'\')" href="#">'+loaddata.tag+'<span style="color:#000" class="ui-li-count">'+loaddata.report_count+'</span></a></li>');
				$('#list-berita').listview('refresh');
			});
			$.mobile.loading("hide"); //hide loading
		},
		error: function (request,error) {
			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });	
}

//LIHAT ISI PELANGGARAN BERDASARKAN TAGS
function get_report_by_tags(x){
	$.mobile.loading("show"); //show loading
	$('#tabverifikasi').show();//show tab
	$('#mysingle').hide();
	$('#title').html('<h3>Tags : '+x+'</h3>');
	$.ajax({
		url: 'http://api.pemiluapi.org/laporan_pelanggaran/api/reports?tags='+x+'&apiKey=81467a5060215a1ec4cad4e21164f454&limit=10&offset=0',
		type: 'GET',
		dataType: 'json',
		json: 'jsoncallback',
		timeout: 100000,
		async: true,
		success: function (response) {
			$('#mycontent').show();
			$('#list-berita').show();
			$('#list-berita').html('');
			var AmbilData = response.data.results.reports;
			$.each(AmbilData, function(index, loadata){
				$('#list-berita').append('<li><a class="show-page-loading-msg" data-textonly="true" data-textvisible="true" data-msgtext="Text only loader" data-inline="true" onclick="get_det_report(\''+loadata.id+'\')" ><br/><h2>'+loadata.judul_laporan+'</h2><p>'+loadata.keterangan+'<br/><strong>Lokasi :'+loadata.alamat+'</strong></p><p style="margin-bottom:10px" class="ui-li-aside">'+loadata.tanggal_kejadian+'</br></p></a></li>');
				$('#list-berita').listview('refresh');
			});
			$('#list-berita').append('<li><center><a onclick="get_more_report(5,10)" style="color:#000;text-decoration:none;" href="">lihat berikutnya</a></center</li>');			
			$('#list-berita').listview('refresh');
   			$.mobile.loading("hide"); //hide loading
   		},
   		error: function (request,error) {
   			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });	
}

//LIHAT DETAIL PELANGGARAN
function get_det_report(x){
	$('#tabverifikasi').hide();//show tab
	$.mobile.loading("show"); //hide loading
	var id_pelanggaran = String(x)
	$.getJSON('http://api.pemiluapi.org/laporan_pelanggaran/api/reports/'+id_pelanggaran+'?apiKey=81467a5060215a1ec4cad4e21164f454', function(response) {
		var loaddata = response.data.results.report;
		$('#title').html(loaddata[0].judul_laporan);
		$('#mysingle').show();
		$('#mycontent').hide();
		$('#mysingle').html('<p class="small-text" >Lokasi : '+loaddata[0].alamat+',Kel/Desa. '+loaddata[0].kelurahan_desa+',Kec. '+loaddata[0].kecamatan+' Kab/Kota.'+loaddata[0].kab_kota+'</p>'+
			'<p class="small-text">Status : '+loaddata[0].status+'</p>'+
			'<p class="small-text">Kategori : '+loaddata[0].kategori+'</p>'+
			'<p class="normal-text">'+loaddata[0].keterangan+'</p>'
			);
		$.mobile.loading("hide"); //hide loading
	});		
	
}

/*MENU PERTANYAAN*/
function get_all_tanya(){	
	$.mobile.loading("show"); //show loading
	//$('#tabverifikasi').show();//show tab
	$('#title').html('<h3>Semua Pertanyaan</h3>');
	$.ajax({
		url: 'http://api.pemiluapi.org/pertanyaan/api/questions?apiKey=81467a5060215a1ec4cad4e21164f454&limit=10&offset=0',
		type: 'GET',
		dataType: 'json',
		json: 'jsoncallback',
		timeout: 100000,
		async: true,
		success: function (response) {
			$('#tanya-single').hide();
			$('#list-pertanyaan').show();
			$('#list-pertanyaan').html('');
			var AmbilData = response.data.results.questions;
			$.each(AmbilData, function(index, loadata){
				$('#list-pertanyaan').append('<li class="ui-first-child"><a onclick="get_det_tanya(\''+loadata.id+'\')" href=""><p><strong>'+loadata.question+'</strong></p></a></li>');
				$('#list-pertanyaan').listview('refresh');
			});
			$('#list-pertanyaan').append('<li><center><a onclick="get_more_tanya(5,10)" style="color:#000;text-decoration:none;" href="">lihat berikutnya</a></center</li>');			
			$('#list-pertanyaan').listview('refresh');
   			$.mobile.loading("hide"); //hide loading
   		},
   		error: function (request,error) {
   			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });	
}

//LIHAT BERIKUTNYA
function get_more_tanya(l,o){
	$.mobile.loading("show"); //show loading
	var limit = l;//untuk limitnya
	var offset = o;//untuk offsetnya
	var nextoffset = o + 5;//untuk next offset 
	$.ajax({
		url: 'http://api.pemiluapi.org/pertanyaan/api/questions?apiKey=81467a5060215a1ec4cad4e21164f454&limit='+l+'&offset='+o+'',
		type: 'GET',
		dataType: 'json',
		json: 'jsoncallback',
		timeout: 100000,
		async: true,
		success: function (response) {
			var AmbilData = response.data.results.questions;
			$.each(AmbilData, function(index, loadata){
				$('#tanya-single').hide();
				$('#list-pertanyaan').append('<li class="ui-first-child"><a href=""><p><strong>'+loadata.question+'</strong></p></a></li>');
				$('#list-pertanyaan').listview('refresh');
				$('#list-pertanyaan').listview('refresh');
			});
			$('#list-pertanyaan').append('<li><center><a onclick="get_more_tanya(5,'+nextoffset+')" style="color:#000;text-decoration:none;" href="">lihat berikutnya</a></center</li>');			
			$('#list-pertanyaan').listview('refresh');
   			$.mobile.loading("hide"); //hide loading
   		},
   		error: function (request,error) {
   			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });
}

//LIHAT DETAIL PERTANYAAN
function get_det_tanya(x){
	$.mobile.loading("show"); //hide loading
	var id_pertanyaan = String(x);
	$.getJSON('http://api.pemiluapi.org//pertanyaan/api/questions/'+id_pertanyaan+'?apiKey=81467a5060215a1ec4cad4e21164f454', function(response) {
		var loaddata = response.data.results.questions;
		$('#list-pertanyaan').hide();
		$('#title').html('Pertanyaan');
		$('#tanya-single').show();
		$('#tanya-single').html(
			'<p style="background-color:#fff;padding:5px" class="normal-text"><strong>'+loaddata[0].question+'</strong>'+
			'<br/><br/><strong>Jawab : </strong>'+loaddata[0].answer+
			'<br/><br/><strong>Referensi UU : </strong>'+loaddata[0].reference_law+
			'<br/><br/><strong>Kutipan UU : </strong>sdsd'+loaddata[0].excerpt_law+
			'</p>'
			);
		$.mobile.loading("hide"); //hide loading
	});		
	
}




