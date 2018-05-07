<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <script src="js/libs/jquery-3.2.0.min.js"></script>
    <script src="js/libs/knockout-3.4.2.js"></script>
    <script src="js/libs/bootstrap.js"></script>
    <script src="js/libs/axios.js"></script>
    <script src="js/controllers/CityController.js"></script>
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
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Delete confirmation</h4>
                </div>
                <div class="modal-body">
                    <div>Do you really want to remove <span data-bind="text: $data.selectedCity().name"></span>?</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" data-bind="click: $data.deleteCity">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div id="editModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Editing city info</h4>
                </div>
                <div class="modal-body">
                    <label for="inputCityId">Id</label>
                    <input name="cityId" type="text" class="form-control" id="inputCityId" placeholder="Id"
                           data-bind="value: $data.selectedCity().id" disabled>

                    <label for="inputCityName">Name</label>
                    <input name="cityName" type="text" class="form-control" id="inputCityName" placeholder="Name"
                           data-bind="value: $data.selectedCity().name">

                    <label for="inputCountryId">Country</label>
                    <select name="country" class="form-control" id="inputCountryId" data-bind="options: countries,
                            optionsText: 'name',
                            optionsValue: 'id',
                            value: $data.selectedCity().countryId">
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bind="click: $data.updateCity.bind($data)">Save
                        changes
                    </button>
                </div>
            </div>
        </div>
    </div>


    <div id="createCity" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Inserting new city</h4>
                </div>
                <div class="modal-body">
                    <label for="cityName">Name</label>
                    <input name="cityName" type="text" class="form-control" id="cityName" placeholder="Name"
                           data-bind="value: $data.selectedCity().name">

                    <label for="countryId">Country</label>
                    <select name="country" class="form-control" id="countryId" data-bind="options: countries,
                            optionsText: 'name',
                            optionsValue: 'id',
                            value: $data.selectedCity().countryId">
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bind="click: $data.createCity.bind($data)">Create
                        city
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- ko if: $data.cities().length!==0 -->
    <div class="row" data-bind="foreach: cities">
        <div class="col-sm-6 col-md-4" data-bind="attr: {id: $data.id}">
            <div class="thumbnail">
                <img width="100%" data-bind="attr: {src: $data.photo}"/>
                <div class="caption">
                    <div>
                        <h2 class="city-name" data-bind="text: $data.name"></h2>
                    </div>

                    <div class="btn-toolbar" role="toolbar" aria-label="...">
                        <div class="btn-group" role="group" aria-label="...">
                            <a data-bind="attr: {'href' : '/apartment.jsp?id='+$data.id}" class="btn btn-primary"
                               role="button">Show variants</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--/ko -->
    <!-- ko ifnot: $data.cities().length!==0 -->
    <div class="text-center">
        <h1>Простите, но на данный момент ничего нет</h1>
    </div>
    <!--/ko -->
</main>
</body>
</html>
