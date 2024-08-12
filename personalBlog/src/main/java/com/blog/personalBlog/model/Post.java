package com.blog.personalBlog.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Post {

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer post_id;
    private Integer author;
    private Integer category;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String body;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDate date;

    //Constructors
    public Post() {
    }

    public Post(Integer postId, Integer authorId, Integer categoryId, String title, String body, LocalDate date) {
        this.post_id = postId;
        this.author = authorId;
        this.category = categoryId;
        this.title = title;
        this.body = body;
        this.date = date;
    }

    //Setters and Getters
    public Integer getAuthor() {
        return author;
    }

    public void setAuthor(Integer author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public Integer getPost_id() {
        return post_id;
    }

    public void setPost_id(Integer post_id) {
        this.post_id = post_id;
    }
}

