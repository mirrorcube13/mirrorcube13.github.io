package by.bsuir.booking.dao;

import by.bsuir.booking.bean.Booking;
import by.bsuir.booking.util.DBConnection;
import by.bsuir.booking.util.EntityConventor;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BookingDAO {
    private static final String SELECT_BOOKING = "SELECT * FROM booking WHERE `userId` = ?";

    private static final String INSERT_BOOKING = "INSERT INTO booking (`userId`, `apartmentId`, `startDate`, `endDate`, `cost`) VALUES (?, ?, ?, ?, ?)";
    private static final String REMOVE_BOOKING = "UPDATE booking SET `status` = 'CANCELED' WHERE id = ?";

    public static List<Booking> selectBooking(int userId){
        ArrayList<Booking> bookings = null;
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(SELECT_BOOKING);
            statement.setInt(1, userId);
            ResultSet rs = statement.executeQuery();
            bookings = new ArrayList<>();
            while (rs.next()){
                bookings.add(EntityConventor.getBooking(rs));
            }
        }catch (SQLException e){
            System.err.println(e.getMessage());
        }
        return bookings;
    }

    public static boolean insertBooking(Booking booking){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(INSERT_BOOKING);
            statement.setInt(1, booking.getUserId());
            statement.setInt(2, booking.getApartmentId());
            statement.setDate(3, booking.getStartDate());
            statement.setDate(4, booking.getEndDate());
            statement.setDouble(5, booking.getCost());
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    public static boolean removeBooking(int id){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(REMOVE_BOOKING);
            statement.setInt(1, id);
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
}
