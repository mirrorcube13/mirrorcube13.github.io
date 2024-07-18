<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Шаблон</title>
	<!-- bootstrap -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<!-- fontawesome -->
	<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
	<!-- fancybox -->
	<link href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" rel="stylesheet"/>
	<!-- my css -->
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
  <div class="container">
    <a class="navbar-brand" href="index.html"><img src="img/logo.png" alt="" width="50">Brodyaga</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <a class="nav-link" href="prokat.html">Прокат</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Сплавы
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="alloys1.html">Сплавы по Минску</a></li>
            <li><a class="dropdown-item" href="alloys2.html">Сплавы по Беларуси</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="alloys3.html">Программа Активного отдыха</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://www.poehaly.by/" target="_blank">Продажа</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="trening.html">Тренировки</a>
        </li>
      </ul>
      <button class="nav-btn">Онлайн запись</button>
    </div>
  </div>
</nav>	
</header>

<div class="header-block">
	<h1>Brodyaga</h1>
	<hr>
	<h3>Шаблон</h3>
</div>



<?php require "blocks/footer.php" ?>

	<!-- scripts -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
	<script src="script/script.js"></script>	
</body>
</html>