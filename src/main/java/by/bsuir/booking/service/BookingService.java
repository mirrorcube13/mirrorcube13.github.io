package by.bsuir.booking.service;

import by.bsuir.booking.bean.Apartment;
import by.bsuir.booking.bean.Booking;
import by.bsuir.booking.dao.ApartmentDAO;
import by.bsuir.booking.dao.BookingDAO;
import com.google.gson.Gson;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.concurrent.TimeUnit;

public class BookingService {
    private static final Gson GSON = new Gson();

    public static Response selectBooking(int userId){
        if (userId<=0)
            return Response.status(Response.Status.BAD_REQUEST).build();
        return Response.ok(GSON.toJson(BookingDAO.selectBooking(userId)), MediaType.APPLICATION_JSON).build();
    }

    public static Response cancelBooking(int id){
        if (id<=0)
            return Response.status(Response.Status.BAD_REQUEST).build();
        return BookingDAO.removeBooking(id)? Response.ok().build(): Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    public static Response insertBooking(Booking booking){
        if (booking==null)
            return Response.status(Response.Status.BAD_REQUEST).build();
        Apartment apartment = ApartmentDAO.selectApartmentsById(booking.getApartmentId());
        if (apartment!=null){
            long diff = booking.getEndDate().getTime() - booking.getStartDate().getTime();
            double totalCost = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS) * apartment.getCost();
            if (totalCost>=0) {
                booking.setCost(totalCost);
                return (BookingDAO.insertBooking(booking)) ? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
            else
                return Response.status(Response.Status.BAD_REQUEST).build();
        }
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}
