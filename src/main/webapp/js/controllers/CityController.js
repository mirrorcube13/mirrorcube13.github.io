function City(id, name, countryId, photo) {
    var self = this;
    self.id = id;
    self.name = name;
    self.countryId = countryId;
    self.photo = photo;
}

function Country(id, name, description) {
    var self = this;
    self.id = id;
    self.name = name;
    self.description = description;
}

function CitiesViewModel() {
    var self = this;
    self.cities = ko.observableArray([]);
    self.countries = ko.observableArray([]);
    self.countryId = getUrlVars()["id"];
    self.selectedCity = ko.observable({});

    self.deleteCityModal = function(city) {
        self.selectedCity(city);
        $("#deleteModal").modal("show");
    };
    self.editCityModal = function(city) {
        self.selectedCity(city);
        $("#editModal").modal("show");
    };
    self.createCityModal = function() {
        self.selectedCity({});
        $("#createCity").modal("show");
    };

    self.deleteCity = function(){
        axios.delete('webapi/city/'+ self.selectedCity().id)
            .then(function (response) {
                $("#deleteModal").modal("hide");
                $("#"+self.selectedCity().id).remove();
                self.selectedCity([]);
            })
            .catch(function (error) {
                console.error('Failed delete city',error);
            });
    };
    self.updateCity =function() {
        axios.put('webapi/city/', self.selectedCity())
            .then(function (response) {

            })
            .catch(function (error) {
                console.error('Failed update city',error);
            });
    };

    self.createCity =function() {
        axios.post('webapi/city/', self.selectedCity())
            .then(function (response) {

            })
            .catch(function (error) {
                console.error('Failed update city',error);
            });
    };


    axios.get('webapi/city/'+ parseInt(self.countryId))
        .then(function (response) {
            var cities = [];
            response.data.forEach(function (item) {
                var city = new City(item.id, item.name, item.countryId, item.photo);
                cities.push(city);
            });
            self.cities(cities);
        })
        .catch(function (error) {
            console.error('Failed city loading',error);
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
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars;
}

document.addEventListener('DOMContentLoaded', function(){
    ko.applyBindings(new CitiesViewModel());
});