<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Profile</title>

    <script src="js/libs/jquery-3.2.0.min.js"></script>
    <script src="js/libs/knockout-3.4.2.js"></script>
    <script src="js/libs/bootstrap.js"></script>
    <script src="js/libs/axios.js"></script>
    <script src="js/controllers/ProfileController.js"></script>
    <script src="js/GlobalService.js"></script>
    <link rel="stylesheet" href="css/libs/bootstrap.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<header>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.jsp">Booking Agency</a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <!-- ko if: getCookie('user') && JSON.parse(getCookie('user')).status === "ADMIN" -->
                <ul class="nav navbar-nav">
                    <li><a href="/profile.jsp">Мой профиль</a></li>
                    <li><a href="/bookings.jsp">Мои бронирования</a></li>
                    <li><a href="/admin_country.jsp">Управление странами</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">Управление городами<span class="caret"></span></a>
                        <ul class="dropdown-menu" data-bind="foreach: countries">
                            <li><a data-bind="attr: {'href' : '/admin_city.jsp?id='+$data.id}"><span data-bind="text: $data.name"></span></a></li>
                        </ul>
                    </li>
                    <li><a href="/admin_user.jsp">Управление пользователями</a></li>
                </ul>
                <!-- /ko -->

                <!-- ko if: getCookie('user') && JSON.parse(getCookie('user')).status === "USER" -->
                <ul class="nav navbar-nav">
                    <li><a href="/profile.jsp">Мой профиль</a></li>
                    <li><a href="/bookings.jsp">Мои бронирования</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">Список стран<span class="caret"></span></a>
                        <ul class="dropdown-menu" data-bind="foreach: countries">
                            <li><a data-bind="attr: {'href' : '/city.jsp?id='+$data.id}"><span data-bind="text: $data.name"></span></a></li>
                        </ul>
                    </li>
                </ul>
                <!-- /ko -->

                <ul class="nav navbar-nav navbar-right">
                    <!-- ko if: getCookie('user') == null -->
                    <li><a href="login.jsp">Login</a></li>
                    <li><a href="registration.jsp">Registration</a></li>
                    <!-- /ko -->
                    <!-- ko ifnot: getCookie('user') == null -->
                    <li><a href="webapi/users/logout">Logout</a></li>
                    <!-- /ko -->
                </ul>
            </div>
        </div>
    </nav>
</header>
<div class="container">
    <div class="row">
        <div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
            <div class="well profile">
                <div class="col-sm-12">
                    <div class="col-xs-12 col-sm-8">
                        <h2 data-bind="text: currentUser().name + ' ' + currentUser().surname"></h2>
                        <p><strong>Login: </strong> <span data-bind="text: currentUser().login"></span></p>
                        <p><strong>Email: </strong> <span data-bind="text: currentUser().email"></span></p>
                        <p><strong>Address: </strong> <span data-bind="text: currentUser().address"></span></p>
                        <p><strong>Status: </strong>
                            <span class="tags" data-bind="text: currentUser().status">html5</span>
                        </p>
                    </div>
                    <div class="col-xs-12 col-sm-4 text-center">
                        <figure>
                            <img src="http://dosya.marmara.edu.tr/besyo/idari_personel/Erkek_icon.png" alt="" class="img-circle img-responsive">
                            <figcaption class="ratings">
                                User photo
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
