function Apartment(id, name, description, rating, cityId, photo, type, address, cost) {
    var self = this;
    self.id = id;
    self.name = name;
    self.description = description;
    self.rating = rating;
    self.cityId = cityId;
    self.photo = photo;
    self.type = type;
    self.address = address;
    self.cost = cost;
}

function Booking(userId, apartmentId, startDate, endDate) {
    var self = this;
    self.userId= userId;
    self.apartmentId = apartmentId;
    self.startDate = startDate;
    self.endDate = endDate;
}

function Country(id, name, description) {
    var self = this;
    self.id = id;
    self.name = name;
    self.description = description;
}


function ApartmentViewModel() {
    var self = this;

    self.defaultDate = function() {
        var date = new Date(Date.now());
        var d = date.getDate(),
            m = date.getMonth()+1,
            y = date.getFullYear();

        if(d < 10){
            d = "0"+d;
        }
        if(m < 10){
            m = "0"+m;
        }

        return (y+"-"+m+"-"+d);
    };

    self.countries = ko.observableArray([]);
    self.apartment = ko.observableArray([]);
    self.cityId = getUrlVars()["id"];
    self.selectedApartment = ko.observable({});
    self.startDate = ko.observable(self.defaultDate());
    self.endDate = ko.observable(self.defaultDate());
    self.total = ko.computed(function() {
        return dateDifference(self.startDate(), self.endDate())*self.selectedApartment().cost;
    });
    self.types = [
        'APARTMENT','GUESTING','VILLA','HOTEL','HOSTEL'
    ];

    self.deleteApartmentModal = function(apartment) {
        self.selectedApartment(apartment);
        $("#deleteModal").modal("show");
    };
    self.editApartmentModal = function(apartment) {
        self.selectedApartment(apartment);
        $("#editModal").modal("show");
    };
    self.createApartmentModal = function() {
        self.selectedApartment({});
        $("#createCity").modal("show");
    };

    self.bookingApartmentModal = function (apartment) {
        self.selectedApartment(apartment);
        $("#bookingModal").modal("show");
    };

    self.deleteApartment = function(){
        axios.delete('webapi/apartment/'+ self.selectedApartment().id)
            .then(function (response) {
                $("#deleteModal").modal("hide");
                $("#"+self.selectedApartment().id).remove();
                self.selectedApartment([]);
            })
            .catch(function (error) {
                console.error('Failed delete apartment', error);
            });
    };
    self.updateApartment =function() {
        axios.put('webapi/apartment/', self.selectedApartment())
            .then(function (response) {

            })
            .catch(function (error) {
                console.error('Failed update apartment',error);
            });
    };
    self.createApartment =function() {
        axios.post('webapi/apartment/', self.selectedApartment())
            .then(function (response) {

            })
            .catch(function (error) {
                console.error('Failed update apartment',error);
            });
    };

    self.bookApartment = function () {
        var booking = new Booking(JSON.parse(getCookie("user")).id, self.selectedApartment().id, self.startDate(), self.endDate());
        axios.post('webapi/booking/', booking)
        .then(function (response) {

        })
        .catch(function (error) {
            console.error('Failed update apartment',error);
        });
    };

    axios.get('webapi/apartment/'+ parseInt(self.cityId))
        .then(function (response) {
            var apartments = [];
            response.data.forEach(function (item) {
                var apartment = new Apartment(item.id, item.name, item.description, item.rating, item.cityId, item.photo, item.type, item.address, item.cost);
                apartments.push(apartment);
            });
            self.apartment(apartments);
        })
        .catch(function (error) {
            console.error('Failed city loading',error);
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
        });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars;
}

function dateDifference(startDate, endDate) {

    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    var msecPerDay = msecPerHour * 24;

    var interval = parseDate(endDate).getTime() - parseDate(startDate).getTime();
    return Math.floor(interval / msecPerDay );
}

function parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
}

document.addEventListener('DOMContentLoaded', function(){
    ko.applyBindings(new ApartmentViewModel());
});