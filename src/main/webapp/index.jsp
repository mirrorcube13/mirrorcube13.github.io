<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <script src="js/libs/jquery-3.2.0.min.js"></script>
    <script src="js/libs/knockout-3.4.2.js"></script>
    <script src="js/libs/bootstrap.js"></script>
    <script src="js/libs/axios.js"></script>
    <script src="js/controllers/CountryController.js"></script>
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
<main>
    <div class="container-fluid bg-3 text-center">
        <h3 class="margin">Where To Find Me?</h3><br>
        <div class="row">
            <div class="col-sm-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <img src="https://www.w3schools.com/bootstrap/birds1.jpg" class="img-responsive margin" style="width:100%" alt="Image">
            </div>
            <div class="col-sm-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <img src="https://www.w3schools.com/bootstrap/birds2.jpg" class="img-responsive margin" style="width:100%" alt="Image">
            </div>
            <div class="col-sm-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <img src="https://www.w3schools.com/bootstrap/birds3.jpg" class="img-responsive margin" style="width:100%" alt="Image">
            </div>
        </div>
        <h3 class="margin">Where To Find Me?</h3><br>
        <div class="row">

            <div class="col-sm-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <img src="https://www.w3schools.com/bootstrap/birds1.jpg" class="img-responsive margin" style="width:100%" alt="Image">
            </div>
            <div class="col-sm-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <img src="https://www.w3schools.com/bootstrap/birds2.jpg" class="img-responsive margin" style="width:100%" alt="Image">
            </div>
            <div class="col-sm-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <img src="https://www.w3schools.com/bootstrap/birds3.jpg" class="img-responsive margin" style="width:100%" alt="Image">
            </div>
        </div>
    </div>



    <!-- ko if: $data.countries().length!==0 -->
    <div class="container">
        <div class="row">
            <h2 class="text-center">Список стран для путешествий</h2>
            <div class="row" data-bind="foreach: countries">
                <div class="col-md-4 text-center">
                    <div class="box">
                        <div class="box-content">
                            <h1 class="tag-title" data-bind="text: $data.name"></h1>
                            <hr />
                            <p data-bind="text: $data.description"></p>
                            <br />
                            <a data-bind="attr: {'href' : '/city.jsp?id='+$data.id}" class="btn btn-block btn-primary">Показать города</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /ko -->
    <!-- ko ifnot: $data.countries().length!==0 -->
    <div class="text-center">
        <h1>Простите, но на данный момент ничего нет</h1>
    </div>
    <!-- /ko -->

</main>
</body>
</html>
