<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <script src="js/libs/jquery-3.2.0.min.js"></script>
    <script src="js/libs/knockout-3.4.2.js"></script>
    <script src="js/libs/bootstrap.js"></script>
    <script src="js/libs/axios.js"></script>
    <script src="js/controllers/ApartmentController.js"></script>
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
                    <div>Do you really want to remove <span data-bind="text: $data.selectedApartment().name"></span>?</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" data-bind="click: $data.deleteApartment.bind($data)">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div id="editModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Editing city info</h4>
                </div>
                <div class="modal-body">
                    <label for="inputApartmentId">Id</label>
                    <input name="cityId" type="text" class="form-control" id="inputApartmentId" placeholder="Id" data-bind="value: $data.selectedApartment().id" disabled>

                    <label for="inputApartmentName">Name</label>
                    <input name="cityName" type="text" class="form-control" id="inputApartmentName" placeholder="Name" data-bind="value: $data.selectedApartment().name">


                    <label for="inputApartmentDescription">Description</label>
                    <input name="apartmentDescription" type="text" class="form-control" id="inputApartmentDescription" placeholder="Description" data-bind="value: $data.selectedApartment().description">


                    <label for="inputApartmentRating">Rating</label>
                    <input name="apartmentRating" type="number" class="form-control" id="inputApartmentRating" placeholder="Rating" data-bind="value: $data.selectedApartment().rating">


                    <label for="inputApartmentPhoto">Photo</label>
                    <input name="apartmentPhoto" type="text" class="form-control" id="inputApartmentPhoto" placeholder="Photo" data-bind="value: $data.selectedApartment().photo">


                    <label for="inputApartmentType">Type</label>

                    <select name="type" class="form-control" id="inputApartmentType" data-bind="options: types,
                            value: $data.selectedApartment().type">
                    </select>

                    <label for="inputApartmentAddress">Address</label>
                    <input name="cityAddress" type="text" class="form-control" id="inputApartmentAddress" placeholder="Address" data-bind="value: $data.selectedApartment().address">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bind="click: $data.updateApartment.bind($data)">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div id="createCity" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Inserting new city</h4>
                </div>
                <div class="modal-body">
                    <label for="cityName">Name</label>
                    <input name="cityName" type="text" class="form-control" id="cityName" placeholder="Name" data-bind="value: $data.selectedApartment().name">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bind="click: ">Create city</button>
                </div>
            </div>
        </div>
    </div>
    <div id="bookingModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Подтверждение бронирования</h4>
                </div>
                <div class="modal-body">
                    <div>Апартаменты: <span data-bind="text: $data.selectedApartment().name"></span></div>
                    <div>Стоимость за ночь: <span data-bind="text: $data.selectedApartment().cost"></span></div>
                    <div><p>Начало заезда: <input type="date" id="startDate" data-bind="value: $data.startDate, attr: {min: defaultDate(), value: defaultDate()}"></p></div>
                    <div><p>Конец заезда: <input type="date" id="endDate" data-bind="value: $data.endDate, attr: {min: defaultDate(), value: defaultDate()}"></p></div>
                    <div>Полная стоимость: <span data-bind="text: $data.total"></span></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Отменить</button>
                    <button type="button" class="btn btn-primary" data-bind="click: $data.bookApartment">Забронировать</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ko if: $data.apartment().length!==0 -->
    <div class="row" data-bind="foreach: apartment">
        <div class="col-sm-6 col-md-4">
            <div class="thumbnail">
                <img data-bind="attr: {src: $data.photo}" alt="Picture">
                <div class="caption">
                    <span>
                        <h3><span data-bind="text: $data.name"></span></h3>
                        <span class="label label-success" data-bind="text: $data.type"></span>
                        <span class="label label-warning"><span data-bind="text: $data.cost"></span> $</span>
                    </span>
                    <hr>
                    <p>
                        <span><h5>Адрес: </h5></span>
                        <span data-bind="text: $data.address"></span>
                    </p>
                    <hr>
                    <p data-bind="text: $data.description"></p>
                    <hr>
                    <p>
                        Рейтинг:
                        <span class="badge" data-bind="text: $data.rating">0</span>
                    </p>

                    <div class="btn-toolbar" role="toolbar" aria-label="...">
                        <div class="btn-group" role="group" aria-label="...">
                            <a class="btn btn-primary" role="button" data-bind="click: $parent.bookingApartmentModal.bind($data)">Забронировать</a>
                        </div>
                        <!-- ko if: getCookie('user') && JSON.parse(getCookie('user')).status === "ADMIN" -->
                        <div class="btn-group" role="group" aria-label="...">
                            <a class="btn btn-warning" role="button" data-bind="click: $parent.editApartmentModal.bind($data)">Редактировать</a>
                        </div>
                        <div class="btn-group" role="group" aria-label="...">
                            <a class="btn btn-danger" role="button" data-bind="click: $parent.deleteApartmentModal.bind($data)">Удалить</a>
                        </div>
                        <!-- /ko -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /ko -->
    <!-- ko ifnot: $data.apartment().length!==0 -->
    <div class="text-center">
        <h1>Простите, но на данный момент ничего нет</h1>
    </div>
    <!-- /ko -->


</main>
</body>
</html>
