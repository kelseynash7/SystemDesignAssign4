package com.blog.personalBlog.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "post")
public class Post {

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer post_id;

    @ManyToOne
    @JoinColumn(name = "author", referencedColumnName = "user_id", nullable = false)
    private User author;

    @ManyToOne
    @JoinColumn(name = "category", referencedColumnName = "category_id")
    private Category category;

    @Column(name = "title")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String body;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDate date;

    //Constructors
    public Post() {
    }

    public Post(Integer postId, User author, Category category, String title, String body, LocalDate date) {
        this.post_id = postId;
        this.author = author;
        this.category = category;
        this.title = title;
        this.body = body;
        this.date = date;
    }

    //Setters and Getters
    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getPost_id() {
        return post_id;
    }

    public void setPost_id(Integer post_id) {
        this.post_id = post_id;
    }
}

