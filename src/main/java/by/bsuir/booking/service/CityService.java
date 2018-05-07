package by.bsuir.booking.service;

import by.bsuir.booking.bean.City;
import by.bsuir.booking.dao.CityDAO;
import com.google.gson.Gson;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class CityService {
    private static final Gson GSON = new Gson();

    public static Response getCitiesByCountryId(int id){
        return Response.ok(GSON.toJson(CityDAO.selectCitiesByCountryId(id)), MediaType.APPLICATION_JSON).build();
    }

    public static Response getCities(){
        return Response.ok(GSON.toJson(CityDAO.selectCities()), MediaType.APPLICATION_JSON).build();
    }

    public static Response removeCity(int id){
        return Response.ok(GSON.toJson(CityDAO.deleteCity(id)), MediaType.APPLICATION_JSON).build();
    }

    public static Response updateCity(City city){
        return (CityDAO.updateCity(city))? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    public static Response insertCity(City city) {
        return (CityDAO.createCity(city))? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}
