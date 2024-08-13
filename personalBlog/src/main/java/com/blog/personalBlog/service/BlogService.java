package com.blog.personalBlog.service;

import com.blog.personalBlog.entity.Post;
import com.blog.personalBlog.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public Iterable<Post> getAllBlogPosts() {
        return blogRepository.findAll();
    }

    public List<Post> getByTitle(String title) {
        return blogRepository.findByTitle(title);
    }

    public Post save(Post post) {
        return blogRepository.save(post);
    }

//    public Post update(Post post, String title) {
//        return blogRepository.save(post, title);
//    }

    public void deleteByTitle(String title) {
        blogRepository.deleteByTitle(title);
    }

    public void deleteById(Integer id) {
        blogRepository.deleteById(id);
    }
}
