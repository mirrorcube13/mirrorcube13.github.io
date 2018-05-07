package by.bsuir.booking.service;

import by.bsuir.booking.bean.Country;
import by.bsuir.booking.dao.CountryDAO;

import javax.ws.rs.core.Response;
import java.util.List;

public class CountryService {
    public static List<Country> getCountries(){
        return CountryDAO.selectCountries();
    }

    public static Response createCountry(Country country){
        return (CountryDAO.createCountry(country)) ? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    public static Response deleteCountry(int id){
        return (CountryDAO.deleteCountry(id)) ? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    public static Response updateCountry(Country country){
        return (CountryDAO.updateCountry(country)) ? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}
