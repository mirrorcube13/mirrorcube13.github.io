package by.bsuir.booking.controllers;

import by.bsuir.booking.bean.Booking;
import by.bsuir.booking.service.BookingService;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/booking")
public class BookingController {
    @GET
    @Path("{id}")
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response getBooking(@PathParam("id") int id){
        return BookingService.selectBooking(id);
    }

    @POST
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response bookApartment(Booking booking){
        return BookingService.insertBooking(booking);
    }

    @DELETE
    @Path("{id}")
    @Produces(APPLICATION_JSON)
    @Consumes(APPLICATION_JSON)
    public Response cancelBooking(@PathParam("id") int id){
        return BookingService.cancelBooking(id);
    }
}
