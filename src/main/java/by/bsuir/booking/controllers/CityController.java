package by.bsuir.booking.controllers;

import by.bsuir.booking.bean.City;
import by.bsuir.booking.service.CityService;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/city")
public class CityController {
    @GET
    @Produces(APPLICATION_JSON)
    public Response retrieveCities(){
        return CityService.getCities();
    }

    @GET
    @Path("{id}")
    @Produces(APPLICATION_JSON)
    public Response retrieveCitiesByCountryId(@PathParam("id") int countryId){ return CityService.getCitiesByCountryId(countryId); }

    @POST
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response createCity(City city){
        return CityService.insertCity(city);
    }

    @DELETE
    @Path("{id}")
    @Produces(APPLICATION_JSON)
    public Response deleteCity(@PathParam("id") int id){
        return CityService.removeCity(id);
    }

    @PUT
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response updateCity(City city){
        return CityService.updateCity(city);
    }
}
