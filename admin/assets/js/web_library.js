$(document).ready(function() {
  $('#web_submit').click(function(){	
		addToWeb(13);	
	});

	$("#web_form input").keypress(function(e) {
	  if (e.which == 13) {
	    event.preventDefault();
	    addToWeb(13);	
	  }
	});

	$("#to_webform").click(function() {
	  scrollToAnchor('web_lib_edit');
	});

	$("#to_photo_wall_edit").click(function() {
	  scrollToAnchor('photo_wall_edit');
	});

	$('#web_category_select').select2();
 	
	$('#web_div').on('click', '#testiframe', function(e) {
		e.preventDefault();
		$('.analyze-result').find('iframe').attr('src', 'web_lib_view.php');
		if (!$('.analyze-result').hasClass('slide-up')) {
			$('.analyze-result').addClass('slide-up', 1000, 'swing');
		}
		$('.analyze-result').slideDown();
  	});

  	$('.analyze-result').on('click', '.analyze-close', function(e) {
		e.preventDefault();
		$('.analyze-result').slideUp();
		$('.analyze-result').find('iframe').attr('src', '');
	});
});



function scrollToAnchor(aid) {
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

function addToWeb(keycode) {
	if(keycode == 13) {
		var inputValidated	=	true;
		var uri				= 	$.trim($("#uri").val());
		var note			= 	$.trim($("#note").val());
		var webCategories = [];
		$('#web_category_select :selected').each(function(i, selected){ 
		  webCategories[i] = $(selected).text(); 
		});	
		// var alertMsg = "";		
		if(uri == "") {
			inputValidated = false;
			// alertMsg	+= "<br>";
			// alertMsg	+=	"<font color='red'>&raquo; URI Required.</font>";
		}
		if(webCategories.length == 0) {
			inputValidated = false;
			// alertMsg	+= "<br>";
			// alertMsg	+=	"<font color='red'>&raquo; Categories Required.</font>";
		}	
		if(inputValidated) {
			$.ajax({
				type: "POST",
				url: "ajax/ajax_webSubmit.php",
				data: {
					webCategories: webCategories,
					uri: uri,
					note: note
				},
				success: function(ajaxResponse) {	
					var addResponse	=	($.trim(ajaxResponse));
					if(addResponse == 'SUCCESS') {
						$(location).attr('href', 'admin_home.php');
					} else {
						//...
					}
				}
			});	//ajax
		}
		//else handled by form attribute "required"
	}
}
