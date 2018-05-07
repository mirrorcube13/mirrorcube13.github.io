package by.bsuir.booking.util;

import by.bsuir.booking.bean.*;

import java.sql.ResultSet;
import java.sql.SQLException;

public class EntityConventor {
    public static Country getCountry(ResultSet rs) throws SQLException {
        if (rs != null && !rs.isBeforeFirst()) {
            Country country = new Country();
            country.setId(rs.getInt("id"));
            country.setName(rs.getString("name"));
            country.setDescription(rs.getString("description"));
            return country;
        }
        return null;
    }

    public static User getUser (ResultSet rs) throws SQLException {
        if (rs!=null && !rs.isBeforeFirst()){
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setSurname(rs.getString("surname"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setLogin(rs.getString("login"));
            user.setNumber(rs.getString("phone"));
            user.setAddress(rs.getString("address"));
            user.setStatus(rs.getString("status"));
            return user;
        }
        return null;
    }

    public static City getCity(ResultSet rs) throws SQLException{
        if (rs!=null && !rs.isBeforeFirst()){
            City city = new City();
            city.setId(rs.getInt("id"));
            city.setName(rs.getString("name"));
            city.setCountryId(rs.getInt("countryId"));
            city.setPhoto(rs.getString("photo"));
            return city;
        }
        return null;
    }

    public static Apartment getApartment(ResultSet rs) throws SQLException{
        if (rs!=null && !rs.isBeforeFirst()){
            Apartment apartment = new Apartment();
            apartment.setId(rs.getInt("id"));
            apartment.setName(rs.getString("name"));
            apartment.setDescription(rs.getString("description"));
            apartment.setRating(rs.getFloat("rating"));
            apartment.setCost(rs.getFloat("cost"));
            apartment.setCityId(rs.getInt("cityId"));
            apartment.setPhoto(rs.getString("photo"));
            apartment.setType(rs.getString("type"));
            apartment.setAddress(rs.getString("address"));
            return apartment;
        }
        return null;
    }

    public static Booking getBooking(ResultSet rs) throws SQLException{
        if (rs!=null && !rs.isBeforeFirst()) {
            Booking booking = new Booking();
            booking.setId(rs.getInt("id"));
            booking.setUserId(rs.getInt("userId"));
            booking.setApartmentId(rs.getInt("apartmentId"));
            booking.setStartDate(rs.getDate("startDate"));
            booking.setEndDate(rs.getDate("endDate"));
            booking.setCost(rs.getFloat("cost"));
            booking.setStatus(rs.getString("status"));
            return booking;
        }
        return null;
    }
}
