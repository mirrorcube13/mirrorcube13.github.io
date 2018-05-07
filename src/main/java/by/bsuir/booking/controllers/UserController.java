package by.bsuir.booking.controllers;

import by.bsuir.booking.bean.Credentials;
import by.bsuir.booking.bean.User;
import by.bsuir.booking.service.UserService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/users")
public class UserController {
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserById(@PathParam("id") int id) {
        return UserService.getUserById(id);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers(){
        return UserService.getUsers();
    }

    @GET
    @Path("/logout")
    public Response logoutUser(){
        return UserService.logoutUser();
    }

    @POST
    @Path("/authentication")
    @Produces(MediaType.APPLICATION_JSON)
    public Response authenticateUser(
            @FormParam("email")String email,
            @FormParam("password")String password) {
        Credentials credentials = new Credentials();
        credentials.setEmail(email);
        credentials.setPassword(password);
        return UserService.authorizeUser(credentials);
    }

    @POST
    @Path("/registration")
    @Produces (MediaType.APPLICATION_JSON)
    public Response registerUser(
            @FormParam("login") String login,
            @FormParam("email") String email,
            @FormParam("password") String password,
            @FormParam("name") String name,
            @FormParam("surname") String surname,
            @FormParam("country") Integer country,
            @FormParam("address") String address,
            @FormParam("phone") String number){
        User user = new User();
        user.setLogin(login);
        user.setEmail(email);
        user.setPassword(password);
        user.setName(name);
        user.setSurname(surname);
        user.setCountryId(country);
        user.setAddress(address);
        user.setNumber(number);
        return UserService.registerUser(user);
    }
    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteUser(@PathParam("id") int id){
        return UserService.removeUser(id);
    }

}
