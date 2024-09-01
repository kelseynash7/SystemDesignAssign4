package com.blog.personalBlog.controller;

import com.blog.personalBlog.entity.User;
import com.blog.personalBlog.logger.Logger;
import com.blog.personalBlog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/users")
public class UserController {

    private static Logger log = Logger.getLogger();

    @Autowired
    private UserService userService;

    @GetMapping
    public Iterable<User> getAllUsers() {
        log.log("LOG: getting all users");
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getById(@PathVariable Integer id) {
        log.log("LOG: getting user: " + id);
        return userService.findByUserId(id);
    }
}
