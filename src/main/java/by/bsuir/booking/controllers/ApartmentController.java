package by.bsuir.booking.controllers;

import by.bsuir.booking.bean.Apartment;
import by.bsuir.booking.service.ApartmentService;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/apartment")
public class ApartmentController {
    @GET
    @Produces(APPLICATION_JSON)
    public Response retrieveAllApartments(){
        return ApartmentService.getAllApartments();
    }

    @GET
    @Path("{id}")
    @Produces(APPLICATION_JSON)
    public Response retrieveApartmentsByCityId(@PathParam("id") int id){
        return ApartmentService.getApartment(id);
    }

    @POST
    @Path("{id}")
    @Produces(APPLICATION_JSON)
    public Response retrieveApartmentsById(@PathParam("id") int id){
        return ApartmentService.getApartmentById(id);
    }


    @POST
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response createApartments(Apartment apartment){
        return ApartmentService.createApartment(apartment);
    }

    @PUT
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response updateApartments(Apartment apartment){
        return ApartmentService.updateApartment(apartment);
    }

    @DELETE
    @Path("{id}")
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response deleteApartments(@PathParam("id") int id){
        return ApartmentService.deleteApartment(id);
    }

}
