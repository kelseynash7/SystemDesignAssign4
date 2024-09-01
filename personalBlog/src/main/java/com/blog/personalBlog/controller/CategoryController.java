package com.blog.personalBlog.controller;

import com.blog.personalBlog.entity.Category;
import com.blog.personalBlog.logger.Logger;
import com.blog.personalBlog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/categories")
public class CategoryController {

    private static Logger log = Logger.getLogger();

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public Iterable<Category> getAllCategories() {
        log.log("LOG: Getting all categories");
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Optional<Category> getById(@PathVariable Integer id) {
        log.log("LOG: getting category: " + id);
        return categoryService.findByCategoryId(id);
    }

}
