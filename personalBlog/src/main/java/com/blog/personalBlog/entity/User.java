package com.blog.personalBlog.entity;

public class User {

    //Attributes
    private String displayName;
    private String username;
    private String password;

    //Constructors
    public User() {
        displayName = "";
        username = "";
        password = "";
    }

    public User(String displayname, String username, String password) {
        this.displayName = displayname;
        this.username = username;
        this.password = password;
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
}
