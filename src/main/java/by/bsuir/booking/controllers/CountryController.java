package by.bsuir.booking.controllers;

import by.bsuir.booking.bean.Country;
import by.bsuir.booking.service.CountryService;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/country")
public class CountryController {
    private static final Gson GSON = new Gson();
    @GET
    @Produces(APPLICATION_JSON)
    public Response retrieveCountries(){
        return Response.ok(GSON.toJson(CountryService.getCountries()), MediaType.APPLICATION_JSON).build();
    }

    @DELETE
    @Path("{id}")
    @Produces(APPLICATION_JSON)
    public Response deleteCountry(@PathParam("id") int id){
        return CountryService.deleteCountry(id);
    }

    @PUT
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response updateCountry(Country country){
        return CountryService.updateCountry(country);
    }

    @POST
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response createCountry(Country country){
        return CountryService.createCountry(country);
    }
}
