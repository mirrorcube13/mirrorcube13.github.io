<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Registration</title>

    <script src="js/libs/jquery-3.2.0.min.js"></script>
    <script src="js/libs/knockout-3.4.2.js"></script>
    <script src="js/libs/bootstrap.js"></script>
    <script src="js/libs/axios.js"></script>
    <script src="js/GlobalService.js"></script>
    <script src="js/controllers/CountryController.js"></script>
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
    <form class="form-horizontal" method="post" action="/webapi/users/registration">

        <div class="row">
            <div class="col-sm-12">
                <h3>Registration data</h3>
            </div>
            <div class="col-sm-6">
                <label for="inputLogin" class="col-sm-2 control-label">Login</label>
                <div class="col-sm-10">
                    <input type="text" name="login" class="form-control" id="inputLogin" placeholder="Login">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" name="email" class="form-control" id="inputEmail" placeholder="Email">
                </div>
            </div>
            <div class="col-sm-6">
                <label for="inputPassword" class="col-sm-1 control-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" name="password" class="form-control" id="inputPassword" placeholder="Password">
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-sm-12">
                <h3>Personal data</h3>
            </div>
            <div class="col-sm-6">
                <label for="inputName" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                    <input type="text" name="name" class="form-control" id="inputName" placeholder="Name">
                </div>
            </div>
            <div class="col-sm-6">
                <label for="inputSurname" class="col-sm-1 control-label">Surname</label>
                <div class="col-sm-10">
                    <input type="text" name="surname" class="form-control" id="inputSurname" placeholder="Surname">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <label for="inputCountry" class="col-sm-2 control-label">Country</label>
                <div class="col-sm-10">
                    <select name="country" class="form-control" id="inputCountry" data-bind="options: countries,
                       optionsText: 'name',
                       optionsValue: 'id'">
                    </select>
                </div>
            </div>
            <div class="col-sm-6">
                <label for="inputAddress" class="col-sm-1 control-label">Address</label>
                <div class="col-sm-10">
                    <input type="text" name="address" class="form-control" id="inputAddress" placeholder="Address">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <h3>Contact data</h3>
            </div>

            <div class="col-sm-6">
                <label for="inputPhone" class="col-sm-2 control-label">Phone</label>
                <div class="col-sm-10">
                    <input type="text" name="phone" class="form-control" id="inputPhone" placeholder="Phone">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-success">Register</button>
                </div>
            </div>
        </div>
    </form>
</main>

</body>
</html>
