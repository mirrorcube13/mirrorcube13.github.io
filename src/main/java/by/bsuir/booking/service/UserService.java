package by.bsuir.booking.service;

import by.bsuir.booking.bean.Credentials;
import by.bsuir.booking.bean.User;
import by.bsuir.booking.dao.UserDAO;
import by.bsuir.booking.exception.UserException;
import com.google.gson.Gson;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Random;


public class UserService {

    private static final Gson GSON = new Gson();

    public static Response getUsers(){
        return Response.ok(GSON.toJson(UserDAO.selectAllUsers()), MediaType.APPLICATION_JSON).build();
    }

    public static Response getUserById(int id){
        return Response.ok(GSON.toJson(UserDAO.selectUserById(id)), MediaType.APPLICATION_JSON).build();
    }

    public static Response removeUser(int id){
        return UserDAO.removeUserById(id)? Response.ok().build() : Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    public static Response authorizeUser(Credentials credentials){
        URI success = null, failure = null;
        try{
            User user = authenticateUser(credentials);

            NewCookie tokenCookie = new NewCookie("token", generateToken(credentials), "/", "", "Session", 10000, false);
            NewCookie userCookie = new NewCookie("user", GSON.toJson(user), "/", "", "User", 10000, false);
            try {
                success = new URI("../index.jsp");
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
            return Response.temporaryRedirect(success).cookie(tokenCookie, userCookie).build();
        } catch (UserException e){
            try {
                failure = new URI("../login.jsp");
            } catch (URISyntaxException ex) {
                ex.printStackTrace();
            }
            return Response.temporaryRedirect(failure).build();
        }
    }

    public static Response logoutUser(){
            URI location = null;
            try {
                location = new URI("../index.jsp");
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
            NewCookie tokenCookie = new NewCookie("token", "", "/", "", "Session", 0, false);
            NewCookie userCookie = new NewCookie("user", "", "/", "", "User", 0, false);
            return Response.temporaryRedirect(location).cookie(tokenCookie, userCookie).build();
    }

    public static Response registerUser(User user){
        try{
            if (UserDAO.createUser(user))
                return authorizeUser(new Credentials(user.getEmail(), user.getPassword()));
            else
                throw new UserException();
        } catch (UserException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    private static User authenticateUser(Credentials credentials) throws UserException {
        User user = UserDAO.selectUserByEmail(credentials.getEmail());
        if ( user != null && credentials.getEmail().equalsIgnoreCase(user.getEmail()))
            return user;
        else
            throw new UserException();
    }

    private static String generateToken(Credentials credentials){
        try{
            Random random = new SecureRandom();
            String jwt = Jwts.builder()
                    .setSubject("user/identify")
                    .setExpiration(new Date(10000))
                    .claim("name", "Token")
                    .claim("email", credentials.getEmail())
                    .signWith(
                            SignatureAlgorithm.HS256,
                            "secret".getBytes("UTF-8")
                    )
                    .compact();
            return new BigInteger(130, random).toString(32);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return "";
    }


}
