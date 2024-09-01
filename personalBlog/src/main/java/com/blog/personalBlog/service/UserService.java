package com.blog.personalBlog.service;

import com.blog.personalBlog.entity.User;
import com.blog.personalBlog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByDisplayName(String displayName) {
        return userRepository.findByDisplayName(displayName);
    }

    public Optional<User> findByUserId(Integer user_id) {
        return userRepository.findById(user_id);
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
