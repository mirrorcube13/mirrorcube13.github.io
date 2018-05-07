package by.bsuir.booking.dao;

import by.bsuir.booking.bean.Country;
import by.bsuir.booking.util.DBConnection;
import by.bsuir.booking.util.EntityConventor;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CountryDAO {
    private static final String SELECT_COUNTRIES = "SELECT id, name, description FROM country";
    private static final String INSERT_COUNTRY = "INSERT INTO country (`name`, `description`) VALUES (?, ?)";
    private static final String UPDATE_COUNTRY = "UPDATE country SET `name` = ?, `description` = ? WHERE id =?";
    private static final String DELETE_COUNTRY = "DELETE FROM country WHERE `id` = ?";

    public static List<Country> selectCountries(){
        ArrayList<Country> countries = null;
        try {
            Statement statement = DBConnection.getInstance().getConnection().createStatement();
            ResultSet rs = statement.executeQuery(SELECT_COUNTRIES);
            countries = new ArrayList<>();
            while (rs.next()){
                countries.add(EntityConventor.getCountry(rs));
            }
        }catch (SQLException e){
            System.err.println(e.getMessage());
        }
        return countries;
    }
    public static boolean createCountry(Country country){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(INSERT_COUNTRY);
            statement.setString(1, country.getName());
            statement.setString(2, country.getDescription());
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean updateCountry(Country country){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(UPDATE_COUNTRY);
            statement.setString(1, country.getName());
            statement.setString(2, country.getDescription());
            statement.setInt(3, country.getId());
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean deleteCountry(int id) {
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(DELETE_COUNTRY);
            statement.setInt(1, id);
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
}
