package com.blog.personalBlog.repository;

import com.blog.personalBlog.entity.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, Integer> {

    List<Post> findByTitle(String title);

    void deleteByTitle(String title);

}
