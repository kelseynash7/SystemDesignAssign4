package com.blog.personalBlog.controller;

import com.blog.personalBlog.PersonalBlogApplication;
import com.blog.personalBlog.logger.Logger;
import com.blog.personalBlog.service.BlogService;
import com.blog.personalBlog.entity.Post;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path= "/posts")
public class BlogController {

    private static Logger log = Logger.getLogger();

    @Autowired
    private BlogService blogService;

    @GetMapping
    public Iterable<Post> getAllBlogPosts() {
        log.log("LOG: Getting all blog posts");
        return blogService.getAllBlogPosts();
    }

    @GetMapping("/{title}")
    public List<Post> getByTitle(@PathVariable String title) {
        log.log("LOG: Getting blog post: " + title);
        return blogService.getByTitle(title);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Post create(@RequestBody Post post) {
        log.log("LOG: Creating new blog post titled: " + post.getTitle());
        return blogService.save(post);
    }

    @PutMapping
    public Post update(@RequestBody Post post) {
        log.log("LOG: Updating blog post titled: " + post.getTitle());
        return blogService.save(post);
    }

    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/title/{title}")
    public void deleteByTitle(@PathVariable String title) {
        log.log("LOG: Deleting blog post titled: " + title);
        blogService.deleteByTitle(title);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/id/{id}")
    public void deleteById(@PathVariable Integer id) {
        log.log("LOG: Deleting blog post with id: " + id.toString());
        blogService.deleteById(id);
    }
}
