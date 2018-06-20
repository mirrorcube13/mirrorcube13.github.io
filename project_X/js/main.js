$(document).ready(function(){

	var show = true;
	var countbox = "#counts";
	$(window).on("scroll load resize", function(){

		if(!show) return false;

		var w_top = $(window).scrollTop();
		var e_top = $(countbox).offset().top;

		var w_height = $(window).height();
		var d_height = $(document).height();

		var e_height = $(countbox).outerHeight();

		if(w_top + 200 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
			$(".spincrement").spincrement({
				thousandSeparator: "",
				duration: 1200
			});

			show = false;
		}
	});
});
// arrow
$(document).ready(function(){
    $("#arrow").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

// удаление
		$('#btnDel').click(function(){

			swal({
			    title: "Внимание!!!",
			    text: "При удалении аккаунта ваш профиль, фото, данные удаляются навсегда.",
			   	type: "warning",
			   	showCancelButton: true,
			   	confirmButtonColor: "#CE2525",
			   	confirmButtonText: "Удалить",
			   	cancelButtonText: "Отмена",
			   	closeOnConfirm: false,
			   	closeOnCancel: false },
			   		function(isConfirm){
			   	        if (isConfirm) {
			   	               swal("Удалено!", "Аккаунт удален", "success");
			   	               document.getElementById('del').style.display='none';return false;
			   	          } 
			   	        else {
			   	               swal("Отменена", "Аккаунт не удален", "error"); 

			   	                }
			   	        });
		});


// регистрация
	$('#regist').click(function(){

			swal({
			    title: "Регистрация выполнена успешно!",
			    text: "Нажмите 'OK' чтобы продолжить",
			   	type: "success" },
			   		function(){
						window.location = "index2.html";
			   	  
			   	        });
		});

		$('#more-info').click(function(){

			swal({
			    title: "Регистрация выполнена успешно!",
			    text: "Нажмите чтобы продолжить",
			   	type: "info" }
			   // 		function(){
						// window.location = "index2.html";
			   	  
			   // 	        }
			   	        );
		});

// dsad
		$('#bron').click(function(){

swal("Ваша заявка на бронирование отправлена", "В ближайшее время с Вами свяжется наш менеджер", "success");
		});

				$('#dobavl').click(function(){

swal("Отель добавлен", "Нажмите 'OK' чтобы продолжить", "success");
		});