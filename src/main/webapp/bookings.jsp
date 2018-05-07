<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <script src="js/libs/jquery-3.2.0.min.js"></script>
    <script src="js/libs/knockout-3.4.2.js"></script>
    <script src="js/libs/bootstrap.js"></script>
    <script src="js/libs/axios.js"></script>
    <script src="js/controllers/BookingController.js"></script>
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
                    <div>Do you really want to discard booking?</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" data-bind="click: $data.deleteBooking.bind($data)">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- ko if: $data.bookings().length!==0 -->
    <div class="row" data-bind="foreach: bookings">
        <div class="col-sm-6 col-md-4">
            <div class="thumbnail">
                <img data-bind="attr: {src: $data.apartment.photo}" alt="Picture">
                <div class="caption">
                    <span>
                        <h3><span data-bind="text: $data.apartment.name"></span></h3>
                        <span class="label label-success" data-bind="text: $data.apartment.type"></span>
                        <span class="label label-warning"><span data-bind="text: $data.cost"></span> $</span>
                    </span>
                    <span>
                        <!-- ko if: $data.status !== 'BOOKED' -->
                        <span class="label label-danger"><span data-bind="text: $data.status"></span></span>
                            <!-- /ko -->
                            <!-- ko ifnot:$data.status !== 'BOOKED' -->
                            <span class="label label-success"><span data-bind="text: $data.status"></span></span>
                            <!-- /ko -->
                    </span>
                    <hr>
                    <p>
                        <span>Дата заезда:<span data-bind="text: $data.startDate"></span></span>

                    </p>
                    <p>
                        <span>Дата отъезда:<span data-bind="text: $data.endDate"></span></span>

                    </p>
                    <hr>
                    <p>
                        <span><h5>Адрес: </h5></span>
                        <span data-bind="text: $data.apartment.address"></span>
                    </p>
                    <hr>
                    <p data-bind="text: $data.apartment.description"></p>
                    <hr>
                    <p>
                        Рейтинг:
                        <span class="badge" data-bind="text: $data.apartment.rating">0</span>
                    </p>
                    <!-- ko if: $data.status === 'BOOKED' -->
                    <div class="btn-toolbar" role="toolbar" aria-label="...">
                        <div class="btn-group" role="group" aria-label="...">
                            <a class="btn btn-danger" role="button" data-bind="click: $parent.deleteBookingModal.bind($data)">Отменить бронирование</a>
                        </div>
                    </div>
                    <!-- /ko  -->
                </div>
            </div>
        </div>
    </div>
    <!--/ko -->
    <!-- ko ifnot: $data.bookings().length!==0 -->
    <div class="text-center">
        <h1>Простите, но на данный момент ничего нет</h1>
    </div>
    <!--/ko -->
</main>
</body>
</html>
