<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <script src="js/libs/jquery-3.2.0.min.js"></script>
    <script src="js/libs/knockout-3.4.2.js"></script>
    <script src="js/libs/bootstrap.js"></script>
    <script src="js/libs/axios.js"></script>
    <script src="js/controllers/UserController.js"></script>
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
    <div id="deleteModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Delete confirmation</h4>
                </div>
                <div class="modal-body" >
                    <div>Do you really want to block <span data-bind="text: $data.selectedUser().name"></span>?</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" data-bind="click: $data.deleteUser">Confirm</button>
                </div>
            </div>
        </div>
    </div>


    <!-- ko if: $data.users().length!==0 -->
    <div class="row" data-bind="foreach: users">
        <div class="col-sm-3 col-md-3 users">
            <div class="col-sm-4 col-md-4">
                <img src="http://photo-map.ru/img/filter-user.png"
                     alt="" class="img-rounded img-responsive" width="256px"/>
                <button class="btn btn-sm btn-danger" type="button" data-bind="click: $parent.deleteUserModal.bind($data)">Заблокировать</button>
            </div>
            <div class="col-sm-8 col-md-8">
                <blockquote>
                    <p data-bind="text: $data.name + ' ' + $data.surname"></p>
                    <p data-bind="text: $data.login"></p>
                    <small>
                        <!-- ko if: $data.address -->
                        <cite data-bind="text: $data.address"></cite>
                        <!-- /ko -->
                        <!-- ko ifnot: $data.address -->
                        <cite>Адрес не указан</cite>
                        <!-- /ko -->
                    </small>
                </blockquote>
                <p> <i class="glyphicon glyphicon-envelope"></i> <span data-bind="text: $data.email"></span>
                    <br>
                    <!-- ko if: $data.phone -->
                    <i class="glyphicon glyphicon-envelope"></i> <span data-bind="text: $data.phone"></span>
                    <!-- /ko -->
                    <!-- ko ifnot: $data.phone -->
                    <i class="glyphicon glyphicon-envelope"></i> <span>Телефон отсутствует</span>
                    <!-- /ko -->
                <hr>
                <strong>Status: </strong>
                <span class="tags" data-bind="text: $data.status"></span>
                </p>
            </div>
        </div>
    </div>
    <!--/ko -->
    <!-- ko ifnot: $data.users().length!==0 -->
        <div class="text-center">
            <h1>Простите, но на данный момент ничего нет</h1>
        </div>
    <!--/ko -->

</main>
</body>
</html>
