function User(id, name, surname, login, email, countryId, phone, address, status) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.login = login;
    this.email = email;
    this.countryId = countryId;
    this.phone = phone;
    this.address = address;
    this.status = status;
}

function Country(id, name, description) {
    var self = this;
    self.id = id;
    self.name = name;
    self.description = description;
}


function UsersViewModel() {
    var self = this;
    self.users = ko.observableArray([]);
    self.countries = ko.observableArray([]);
    self.selectedUser = ko.observable({});

    self.deleteUserModal = function(user) {
        self.selectedUser(user);
        $("#deleteModal").modal("show");
    };

    self.deleteUser = function(){
        axios.delete('webapi/users/'+ self.selectedUser().id)
            .then(function (response) {

            })
            .catch(function (error) {
                console.error('Failed delete city',error);
            });
    };

    axios.get('webapi/users')
        .then(function (response) {
            var users = [];
            response.data.forEach(function (item) {
                var user = new User(item.id, item.name, item.surname, item.login, item.email, item.countryId, item.number, item.address, item.status);
                users.push(user);
            });
            self.users(users);
        })
        .catch(function (error) {
            console.error('Failed user loading',error);
        });

    axios.get('webapi/country')
        .then(function (response) {
            var countries = [];
            response.data.forEach(function (item) {
                var country = new Country(item.id, item.name, item.description);
                countries.push(country);
            });
            self.countries(countries);
        })
        .catch(function (error) {
            console.error('Failed country loading',error);
        })
}

document.addEventListener('DOMContentLoaded', function(){
    ko.applyBindings(new UsersViewModel());
});