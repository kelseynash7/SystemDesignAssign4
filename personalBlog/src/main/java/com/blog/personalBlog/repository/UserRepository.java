package com.blog.personalBlog.repository;

import com.blog.personalBlog.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByDisplayName(@Param("displayName") String displayName);
}
