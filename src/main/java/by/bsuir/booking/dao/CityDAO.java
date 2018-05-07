package by.bsuir.booking.dao;

import by.bsuir.booking.bean.City;
import by.bsuir.booking.util.DBConnection;
import by.bsuir.booking.util.EntityConventor;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CityDAO {
    private static final String SELECT_CITIES_BY_COUNTRY_ID = "SELECT * FROM city WHERE `countryId` = ?;";
    private static final String SELECT_CITY = "SELECT * FROM city";
    private static final String INSERT_CITY = "INSERT INTO city (`name`, `countryId`, `photo`) VALUES (?, ?, ?)";
    private static final String UPDATE_CITY = "UPDATE city SET `name` = ?, `countryId` = ?, `photo`=? WHERE id =?";
    private static final String DELETE_CITY = "DELETE FROM city WHERE `id` = ?";

    public static List<City> selectCitiesByCountryId(int id){
        ArrayList<City> cities = null;
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(SELECT_CITIES_BY_COUNTRY_ID);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            cities = new ArrayList<>();
            while (rs.next()){
                cities.add(EntityConventor.getCity(rs));
            }
        }catch (SQLException e){
            System.err.println(e.getMessage());
        }
        return cities;
    }
    public static List<City> selectCities(){
        ArrayList<City> cities = null;
        try {
            Statement statement = DBConnection.getInstance().getConnection().createStatement();
            ResultSet rs = statement.executeQuery(SELECT_CITY);
            cities = new ArrayList<>();
            while (rs.next()){
                cities.add(EntityConventor.getCity(rs));
            }
        }catch (SQLException e){
            System.err.println(e.getMessage());
        }
        return cities;
    }
    public static boolean createCity(City city){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(INSERT_CITY);
            statement.setString(1, city.getName());
            statement.setInt(2, city.getCountryId());
            statement.setString(3, city.getPhoto());
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean updateCity(City city){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(UPDATE_CITY);
            statement.setString(1, city.getName());
            statement.setInt(2, city.getCountryId());
            statement.setString(3, city.getPhoto());
            statement.setInt(4, city.getId());
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean deleteCity(int id){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(DELETE_CITY);
            statement.setInt(1, id);
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
}
