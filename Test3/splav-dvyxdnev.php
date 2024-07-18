<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Двухдневный сплав по реке Ислочь</title>
	<!-- bootstrap -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<!-- fontawesome -->
	<link href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" rel="stylesheet">
	<!-- fancybox -->
	<link href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" rel="stylesheet"/>
	<!-- my css -->
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
<?php require "blocks/header.php" ?>

<div class="header-block">
	<h1>Brodyaga</h1>
	<hr>
	<h3>Двухдневный сплав по реке Ислочь</h3>
</div>




<div class="container text-block">
	  <h2 class="centered">Двухдневный сплав по реке Ислочь</h2>
	  <div class="row alloys-info align-items-center">
	  	<div class="col-lg-6 col-12">
	  		<img src="img/splav/p4.jpg" alt="" class="img-fluid">
	  	</div>
	  	<div class="col-lg-6 col-12">
	  		<h3><i class="fas fa-coins"></i> Стоимость: 60р</h3>
	  		<p><ul>В стоимость входит:
	  			<li><i class="fa fa-check green" aria-hidden="true"></i> аренда байдарки, весел, жилетов</li>
	  			<li><i class="fa fa-check green" aria-hidden="true"></i> сопровождение гида на маршруте</li>
	  			<li><i class="fa fa-check green" aria-hidden="true"></i> доставка водителей к месту старта (либо финиша)*</li>
	  			<li><i class="fa fa-check green" aria-hidden="true"></i> био-туалет, умывальник в лагере</li>
	  		</ul></p>
	  	</div>
	  </div>  	  
</div>

<div class="container text-block block-tabs">
	<div class="row centered">
		<div class="col-md-6 col-sm-12">
			<button class="tablinks" onclick="openTime(event, 'Morning')" id="defaultOpen">Утренний cплав</button></div>
		<div class="col-md-6 col-sm-12">
			<button class="tablinks" onclick="openTime(event, 'Evening')">Вечерний cплав</button></div>
	</div>	
</div>

<div class="container text-block"><br>
	<div id="Morning" class="tabcontent">
		<p><i class="far fa-clock"></i> 09:00 - 14:00</p>
	  	<p><i class="fas fa-map-marker-alt"></i> Маршрут сплава: д.Междуречье - д.Падневичи</p>
	  	<p><i class="far fa-map"></i> Протяженность ~ 13км</p>
	  	<br>
	  	<h3>Тайминг программы:</h3>
	  	<p><ul>
	  		<li>9:00 - Встреча на старте</li>
	  		<li>9:00 - 10:00 Парковка личного транспорта, переодевание, инструктаж по ТБ и управлению байдаркой.</li>
	  		<li>10:00 - Старт</li>
	  		<li>14:00 - Финиш. Окончание программы.</li>
	  	</ul></p>
	</div>
	<div id="Evening" class="tabcontent">
		<p><i class="far fa-clock"></i> 14:00 - 18:00</p>
		<p><i class="fas fa-map-marker-alt"></i> Маршрут сплава: д.Падневичи - д.Боровиковщина</p>
		<p><i class="far fa-map"></i> Протяженность ~ 11км</p>
		<br> 
		<h3>Тайминг программы:</h3>
		<p><ul>
			<li>14:00 - Встреча на старте</li>
			<li>14:00 - 15:00 Парковка личного транспорта, переодевание, инструктаж по ТБ и управлению байдаркой.</li>
			<li>15:00 - Старт</li>
			<li>18:00 - Финиш. Окончание программы.</li>
		</ul></p>
	</div>
</div>

<br><br>

<div class="container text-block">
	<h3>Дополнительные услуги:</h3>
	<p>Походная баня на берегу - 130 руб./группа</p>
	<p>Пневматический тир - 10 руб./чел. (20 пулек/чел.)</p>
</div>
<div class="container text-block">
	<h3>Акции</h3>
	<p>Именинники (в составе группы) - <span class="red"><i>БЕСПЛАТНО</i></span></p>
	<p>Для групп более 20 чел.по тарифу "Все включено" - походная баня <span class="red"><i>БЕСПЛАТНО</i></span></p>
</div>
<div class="container text-block">
	<h3>Важно</h3>
	<p>В байдарку можно брать только предметы первой необходимости. Все личные вещи участников - находятся в лагере или промежуточном пункте следования.</p>
</div>







<!-- <hr>
<div class="container text-block block-tabs">
	<div class="row align-items-center centered">
		<div class="col-6">
			<button class="tablinks" onclick="location.href='alloys2.html';">Экспресс сплав<br> по реке Ислочь</button>
		</div>
		<div class="col-6">
			<button class="tablinks" onclick="location.href='alloys3.html';">Однодневный сплав "Все включено"<br> по реке Ислочь</button>
		</div>		
		<div class="col-4">
			<button class="tablinks" onclick="location.href='alloys3.html';">Двухдневный сплав<br> по реке Ислочь</button>
		</div>
		<div class="col-4">
			<button class="tablinks" onclick="location.href='alloys3.html';">Двухдневный сплав "Все включено"<br> по реке Ислочь</button>
		</div>
		<div class="col-4">
			<button class="tablinks" onclick="location.href='alloys3.html';">Двухдневная программа<br> Активного отдыха</button>
		</div>
	</div>	
</div> -->


<hr>
<div class="programs mini">
	<div class="container-fluid">
		<h2>Другие сплавы по реке Ислочь</h2>
		<div class="row justify-content-center">
			<div class="col-lg-2 col-6">
				<div class="programs-block">
					<a href="alloys1.html">
						<img src="img/prorgam/p1.jpg" alt="" class="img-fluid">
						<p class="programs-block_text">Однодневный сплав</p>
					</a>
				</div>
			</div>
			<div class="col-lg-2 col-6">
				<div class="programs-block">
					<a href="alloys3.html">
						<img src="img/prorgam/p3.jpg" alt="" class="img-fluid">
						<p class="programs-block_text">Однодневный сплав "Все включено"</p>
					</a>
				</div>
			</div>
			<div class="col-lg-2 col-6">
				<div class="programs-block">
					<a href="alloys1.html">
						<img src="img/prorgam/p3.jpg" alt="" class="img-fluid">
						<p class="programs-block_text">Двухдневный сплав</p>
					</a>
				</div>
			</div>
			<div class="col-lg-2 col-6">
				<div class="programs-block">
					<a href="alloys2.html">
						<img src="img/prorgam/p2.jpg" alt="" class="img-fluid">
						<p class="programs-block_text">Двухдневный сплав "Все включено"</p>
					</a>
				</div>
			</div>
			<div class="col-lg-2 col-6">
				<div class="programs-block">
					<a href="alloys3.html">
						<img src="img/prorgam/p1.jpg" alt="" class="img-fluid">
						<p class="programs-block_text">Двухдневная программа<br> Активного отдыха</p>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>



<?php require "blocks/footer.php" ?>

	<!-- scripts -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
	<script src="script/script.js"></script>

	<script>
	function openTime(evt, timeName) {
	  var i, tabcontent, tablinks;
	  tabcontent = document.getElementsByClassName("tabcontent");
	  for (i = 0; i < tabcontent.length; i++) {
	    tabcontent[i].style.display = "none";
	  }
	  tablinks = document.getElementsByClassName("tablinks");
	  for (i = 0; i < tablinks.length; i++) {
	    tablinks[i].className = tablinks[i].className.replace(" active", "");
	  }
	  document.getElementById(timeName).style.display = "block";
	  evt.currentTarget.className += " active";
	}
	document.getElementById("defaultOpen").click();
	</script>

</body>
</html>