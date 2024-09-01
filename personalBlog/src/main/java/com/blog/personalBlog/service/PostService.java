package com.blog.personalBlog.service;

import com.blog.personalBlog.entity.Post;
import com.blog.personalBlog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Iterable<Post> getAllBlogPosts() {
        return postRepository.findAll();
    }

    public List<Post> getByTitle(String title) {
        return postRepository.findByTitle(title);
    }

    public Post save(Post post) {
        return postRepository.save(post);
    }

//    public Post update(Post post, String title) {
//        return blogRepository.save(post, title);
//    }

    public void deleteByTitle(String title) {
        postRepository.deleteByTitle(title);
    }

    public void deleteById(Integer id) {
        postRepository.deleteById(id);
    }
}
