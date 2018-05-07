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

function ProfileViewModel() {
    var self = this;
    self.currentUser = ko.observable({});
    self.countries = ko.observableArray([]);

    axios.get('webapi/users/' + JSON.parse(getCookie("user")).id)
        .then(function (response) {
            self.currentUser(response.data);
        })
        .catch(function (error) {
            console.error('Failed user loading',error);
        })

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
    ko.applyBindings(new ProfileViewModel());
});