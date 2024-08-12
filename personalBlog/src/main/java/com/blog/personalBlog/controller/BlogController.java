package com.blog.personalBlog.controller;

import com.blog.personalBlog.service.BlogService;
import com.blog.personalBlog.model.Post;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path= "/posts")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public Iterable<Post> getAllBlogPosts() {
        return blogService.getAllBlogPosts();
    }

    @GetMapping("/{title}")
    public List<Post> getByTitle(@PathVariable String title) {
        return blogService.getByTitle(title);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Post create(@RequestBody Post post) {
        return blogService.save(post);
    }

    @PutMapping
    public Post update(@RequestBody Post post) {
        return blogService.save(post);
    }

    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/title/{title}")
    public void deleteByTitle(@PathVariable String title) {
        blogService.deleteByTitle(title);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/id/{id}")
    public void deleteById(@PathVariable Integer id) {
        blogService.deleteById(id);
    }
}
