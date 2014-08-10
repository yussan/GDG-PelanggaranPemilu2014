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
			$('#list-pertanyaan').show();
			$('#list-pertanyaan').html('');
			var AmbilData = response.data.results.questions;
			$.each(AmbilData, function(index, loadata){
				$('#list-pertanyaan').append('<li class="ui-first-child"><a href=""><p>Dari : Ahmad</p><p><strong>Apakah saya sehat?</strong></p></a></li>');
				$('#list-pertanyaan').listview('refresh');
			});
			$('#list-pertanyaan').append('<li><center><a onclick="get_more_report(5,10)" style="color:#000;text-decoration:none;" href="">lihat berikutnya</a></center</li>');			
			$('#list-pertanyaan').listview('refresh');
   			$.mobile.loading("hide"); //hide loading
   		},
   		error: function (request,error) {
   			alert('Masalah Pada Jaringan, Silahkan Coba Lagi!');
            $.mobile.loading("hide"); //hide loading
        }
    });	
}

