function Country(id, name, description) {
    var self = this;
    self.id = id;
    self.name = name;
    self.description = description;
}

function CountriesViewModel() {
    var self = this;
    self.countries = ko.observableArray([]);
    self.selectedCountry = ko.observable({});

    self.deleteCountryModal = function(country) {
        self.selectedCountry(country);
        $("#deleteModal").modal("show");
    };
    self.editCountryModal = function(country) {
        self.selectedCountry(country);
        $("#editModal").modal("show");
    };
    self.createCountryModal = function() {
        self.selectedCountry({});
        $("#createModal").modal("show");
    };

    self.deleteCountry = function(){
        axios.delete('webapi/country/'+ self.selectedCountry().id)
            .then(function (response) {
                $("#deleteModal").modal("hide");
                $("#"+self.selectedCountry().id).remove();
                self.selectedCountry([]);
            })
            .catch(function (error) {
                console.error('Failed delete city',error);
            });
    };
    self.updateCountry =function() {
        axios.put('webapi/country/', self.selectedCountry())
            .then(function (response) {

            })
            .catch(function (error) {
                console.error('Failed update city',error);
            });
    };

    self.createCountry =function() {
        axios.post('webapi/country/', self.selectedCountry())
            .then(function (response) {

            })
            .catch(function (error) {
                console.error('Failed update city',error);
            });
    };

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
    ko.applyBindings(new CountriesViewModel());
});