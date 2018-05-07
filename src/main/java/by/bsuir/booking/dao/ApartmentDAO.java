package by.bsuir.booking.dao;

import by.bsuir.booking.bean.Apartment;
import by.bsuir.booking.util.DBConnection;
import by.bsuir.booking.util.EntityConventor;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ApartmentDAO {
    private static final String SELECT_APARTMENTS_BY_CITY_ID = "SELECT * FROM apartment WHERE `cityId` = ?";
    private static final String SELECT_APARTMENTS_BY_ID = "SELECT * FROM apartment WHERE `id` = ?";
    private static final String SELECT_APARTMENTS = "SELECT * FROM apartment";
    private static final String INSERT_APARTMENTS = "INSERT INTO apartment (`name`, `description`, `rating`, `cityId`, `photo`, `type`, `address`, `cost`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    private static final String DELETE_APARTMENTS = "DELETE FROM apartment WHERE `id` = ?";
    private static final String UPDATE_APARTMENTS = "UPDATE apartment SET `name` = ?, `description` = ?, `rating` = ?, `cityId` = ?, `photo` = ?, `type` = ?, `address` = ?, `cost` = ? WHERE id =?";


    public static List<Apartment> selectApartmentsByCityId(int id){
        ArrayList<Apartment> apartments = null;
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(SELECT_APARTMENTS_BY_CITY_ID);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            apartments = new ArrayList<>();
            while (rs.next()){
                apartments.add(EntityConventor.getApartment(rs));
            }
        }catch (SQLException e){
            System.err.println(e.getMessage());
        }
        return apartments;
    }
    public static Apartment selectApartmentsById(int id){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(SELECT_APARTMENTS_BY_ID);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            if (rs.next()){
                return EntityConventor.getApartment(rs);
            }
        }catch (SQLException e){
            System.err.println(e.getMessage());
        }
        return null;
    }
    public static List<Apartment> selectApartment(){
        ArrayList<Apartment> apartments = null;
        try {
            Statement statement = DBConnection.getInstance().getConnection().createStatement();
            ResultSet rs = statement.executeQuery(SELECT_APARTMENTS);
            apartments = new ArrayList<>();
            while (rs.next()){
                apartments.add(EntityConventor.getApartment(rs));
            }
        }catch (SQLException e){
            System.err.println(e.getMessage());
        }
        return apartments;
    }
    public static boolean updateApartment(Apartment apartment){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(UPDATE_APARTMENTS);
            statement.setString(1, apartment.getName());
            statement.setString(2, apartment.getDescription());
            statement.setFloat(3, apartment.getRating());
            statement.setInt(4, apartment.getCityId());
            statement.setString(5, apartment.getPhoto());
            statement.setString(6, apartment.getType().toString());
            statement.setString(7, apartment.getAddress());
            statement.setFloat(8, apartment.getCost());
            statement.setInt(9, apartment.getId());
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean createApartment(Apartment apartment){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(INSERT_APARTMENTS);
            statement.setString(1, apartment.getName());
            statement.setString(2, apartment.getDescription());
            statement.setFloat(3, apartment.getRating());
            statement.setInt(4, apartment.getCityId());
            statement.setString(5, apartment.getPhoto());
            statement.setString(6, apartment.getType());
            statement.setString(7, apartment.getAddress());
            statement.setFloat(8, apartment.getCost());
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean deleteApartment(int id){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(DELETE_APARTMENTS);
            statement.setInt(1, id);
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
}
