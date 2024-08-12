package com.blog.personalBlog.repository;

import com.blog.personalBlog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Post, Integer> {

    List<Post> findByTitle(String title);

    void deleteByTitle(String title);

    @Query("SELECT b from Post b WHERE b.date > :passDate")
    List<Post> findByPublishDateAfter(@Param("passDate") LocalDate date);
}
