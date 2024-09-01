package com.blog.personalBlog.service;

import com.blog.personalBlog.entity.Category;
import com.blog.personalBlog.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Optional<Category> findByCategoryId(Integer categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public Iterable<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
