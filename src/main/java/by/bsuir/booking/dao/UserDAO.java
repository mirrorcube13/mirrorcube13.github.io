package by.bsuir.booking.dao;

import by.bsuir.booking.bean.User;
import by.bsuir.booking.util.DBConnection;
import by.bsuir.booking.util.EntityConventor;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {
    private static final String CREATE_USER = "INSERT INTO `users` (`name`, `surname`, `login`, `password`, `email`, `countryId`, `phone`, `address`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    private static final String SELECT_USER_BY_ID = "SELECT * FROM users WHERE `id` = ?";
    private static final String SELECT_USER_BY_EMAIL = "SELECT * FROM users WHERE `email` = ?";
    private static final String SELECT_ALL_USERS = "SELECT * FROM users";
    private static final String BLOCK_USER = "UPDATE users SET `status` = 'BLOCKED' WHERE `id` = ?";
    private static final String REMOVE_USER = "DELETE FROM users WHERE `id` = ?";

    public static List<User> selectAllUsers(){
        List <User> users = null;
        try {
            Statement statement = DBConnection.getInstance().getConnection().createStatement();
            ResultSet rs = statement.executeQuery(SELECT_ALL_USERS);
            users = new ArrayList<>();
            while (rs.next()){
                users.add(EntityConventor.getUser(rs));
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        return users;
    }
    public static User selectUserById(int id){
        User user = null;
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(SELECT_USER_BY_ID);
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            if (rs.next()){
                return EntityConventor.getUser(rs);
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    public static User selectUserByEmail(String email){
        User user = null;
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(SELECT_USER_BY_EMAIL);
            statement.setString(1, email);
            ResultSet rs = statement.executeQuery();
            if (rs.next()){
                return EntityConventor.getUser(rs);
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        return null;
    }
    public static boolean blockUserById(int id){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(BLOCK_USER);
            statement.setInt(1, id);
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean removeUserById(int id){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(REMOVE_USER);
            statement.setInt(1, id);
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
    public static boolean createUser(User user){
        try {
            PreparedStatement statement = DBConnection.getInstance().getConnection().prepareStatement(CREATE_USER);
            statement.setString(1, user.getName());
            statement.setString(2, user.getSurname());
            statement.setString(3, user.getLogin());
            statement.setString(4, user.getPassword());
            statement.setString(5, user.getEmail());
            statement.setInt(6, user.getCountryId());
            statement.setString(7, user.getNumber());
            statement.setString(8, user.getAddress());
            statement.executeUpdate();
            return true;
        }catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }
}
