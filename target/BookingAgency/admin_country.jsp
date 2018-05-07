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
    <div id="deleteModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Delete confirmation</h4>
                </div>
                <div class="modal-body" >
                    <div>Do you really want to remove <span data-bind="text: $data.selectedCountry().name"></span>?</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" data-bind="click: $data.deleteCountry">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div id="editModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Editing country info</h4>
                </div>
                <div class="modal-body">
                    <label for="inputCountryId">Id</label>
                    <input name="countryId" type="text" class="form-control" id="inputCountryId" placeholder="Id" data-bind="value: $data.selectedCountry().id" disabled>

                    <label for="inputCountryName">Name</label>
                    <input name="countryName" type="text" class="form-control" id="inputCountryName" placeholder="Name" data-bind="value: $data.selectedCountry().name">

                    <label for="inputCountryDescription">Description</label>
                    <input name="countryName" type="text" class="form-control" id="inputCountryDescription" placeholder="Description" data-bind="value: $data.selectedCountry().description">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bind="click: $data.updateCountry.bind($data)">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <div id="createModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"><button class="close" type="button" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Inserting new country</h4>
                </div>
                <div class="modal-body">
                    <label for="countryName">Name</label>
                    <input name="countryName" type="text" class="form-control" id="countryName" placeholder="Name" data-bind="value: $data.selectedCountry().name">

                    <label for="countryDescription">Description</label>
                    <input name="countryDescription" type="text" class="form-control" id="countryDescription" placeholder="Description" data-bind="value: $data.selectedCountry().description">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bind="click: $data.createCountry.bind($data)">Create country</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ko if: $data.countries().length!==0 -->
    <div class="panel panel-default">
        <div class="panel-heading"><h3>Countries configuration page</h3>
            <button type="button" class="btn btn-success" data-bind="click: $data.createCountryModal">Create country</button>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th style="width:25%">Name</th>
                <th style="width:60%">Description</th>
                <th style="width:15%">Controls</th>
            </tr>
            </thead>
            <tbody data-bind="foreach: countries">
            <tr>
                <td><h4 data-bind="text: $data.name"></h4></td>
                <td  data-bind="text: $data.description"></td>
                <td style="width:15%">
                    <div class="btn-group btn-group-sm city-name-button" role="group" aria-label="...">
                        <button type="button" class="btn btn-warning" data-bind="click: $parent.editCountryModal.bind($data)">
                            Edit
                        </button>
                        <button type="button" class="btn btn-danger" data-bind="click: $parent.deleteCountryModal.bind($data)">
                            Delete
                        </button>
                        <a type="button" class="btn btn-success" data-bind="attr: {'href' : '/admin_city.jsp?id='+$data.id}">
                            Show
                        </a>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--/ko -->
    <!-- ko ifnot: $data.countries().length!==0 -->
    <div class="text-center">
        <h1>Простите, но на данный момент ничего нет</h1>
    </div>
    <!--/ko -->

</main>
</body>
</html>