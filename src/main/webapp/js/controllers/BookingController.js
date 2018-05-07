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

function Booking(id, apartmentId, startDate, endDate, cost, apartment, status) {
    var self = this;
    self.id= id;
    self.apartmentId = apartmentId;
    self.startDate = startDate;
    self.endDate = endDate;
    self.cost = cost;
    self.apartment = apartment;
    self.status = status;
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
    self.bookings = ko.observableArray([]);
    self.countries = ko.observableArray([]);
    self.apartments = ko.observableArray([]);
    self.selectedBooking = ko.observable({});
    self.types = [
        'APARTMENT','GUESTING','VILLA','HOTEL','HOSTEL'
    ];

    self.deleteBookingModal = function(apartment) {
        self.selectedBooking(apartment);
        $("#deleteModal").modal("show");
    };

    self.deleteBooking = function(){
        axios.delete('webapi/booking/'+ self.selectedBooking().id)
            .then(function (response) {
                self.selectedBooking([]);
            })
            .catch(function (error) {
                console.error('Failed delete apartment', error);
            });
    };

    axios.get('webapi/apartment')
        .then(function (response) {
            var apartments = [];
            response.data.forEach(function (item) {
                var apartment = new Apartment(item.id, item.name, item.description, item.rating, item.cityId, item.photo, item.type, item.address, item.cost);
                apartments.push(apartment);
            });
            self.apartments(apartments);
        })
        .catch(function (error) {
            console.error('Failed city loading',error);
        });

    axios.get('webapi/booking/' + JSON.parse(getCookie("user")).id)
        .then(function (response) {
            var bookings = new Array();
            response.data.forEach(function (item) {
                var booking = new Booking(item.id, item.apartmentId, item.startDate, item.endDate, item.cost, self.getApartmentById(item.apartmentId), item.status);
                bookings.push(booking);
            });
            self.bookings(bookings);
        })
        .catch(function (error) {
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

    self.getApartmentById = function(id) {
        var apt;
        self.apartments().forEach(function (apartment) {
            if(id === apartment.id){
                apt =  apartment;
                return;
            }
        });
        return apt;
    }

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