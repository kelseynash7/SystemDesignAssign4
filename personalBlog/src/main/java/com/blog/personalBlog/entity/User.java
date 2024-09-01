package com.blog.personalBlog.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "displayName")
    private String displayName;

    //Constructors
    public User() {
    }

    public User(Integer userId, String username, String password, String displayname) {
        this.user_id = userId;
        this.username = username;
        this.password = password;
        this.displayName = displayname;
    }

    //Setters and Getters
    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String name) {
        this.displayName = name;
    }

    public String getUserName() {
        return username;
    }

    public void setUsername(String name) {
        this.username = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String passwordString) {
        this.password = passwordString;
    }

    public Integer getUser_id() {
        return user_id;
    }
    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }
}
