package com.blog.personalBlog.repository;

import com.blog.personalBlog.entity.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
}
