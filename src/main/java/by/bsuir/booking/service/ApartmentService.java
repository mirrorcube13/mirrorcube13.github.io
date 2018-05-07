package by.bsuir.booking.service;

import by.bsuir.booking.bean.Apartment;
import by.bsuir.booking.dao.ApartmentDAO;
import com.google.gson.Gson;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class ApartmentService {
    private static final Gson GSON = new Gson();

    public static Response getApartmentById(int id){
        return Response.ok(GSON.toJson(ApartmentDAO.selectApartmentsById(id)), MediaType.APPLICATION_JSON).build();
    }

    public static Response getApartment(int id){
        return Response.ok(GSON.toJson(ApartmentDAO.selectApartmentsByCityId(id)), MediaType.APPLICATION_JSON).build();
    }

    public static Response createApartment(Apartment apartment){
        return ApartmentDAO.createApartment(apartment)? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    public static Response updateApartment(Apartment apartment){
        return ApartmentDAO.updateApartment(apartment)? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    public static Response deleteApartment(int id) {
        return ApartmentDAO.deleteApartment(id)? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    public static Response getAllApartments() {
        return Response.ok(GSON.toJson(ApartmentDAO.selectApartment())).build();
    }
}
