package com.blog.personalBlog.model;

import java.util.ArrayList;
import java.util.List;

public class PersonalBlog {
    //Attributes
    private User user; //Allow a single User for the personal blog at this time
    private List<Post> blogPosts; //List of blogPosts
    private Boolean isLoggedIn; //keeps track of logged in status for user

    //Constructors
    public PersonalBlog() {
        user = new User();
        blogPosts = new ArrayList<Post>();
        isLoggedIn = false;
    }

    //Setters and Getters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Post> getBlogPosts() {
        return blogPosts;
    }

    public void setBlogPosts(List<Post> blogPosts) {
        this.blogPosts = blogPosts;
    }

    public Boolean getIsLoggedIn() {
        return isLoggedIn;
    }

    public void setIsLoggedIn(Boolean isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
    }

    //Class Methods

    /**
     * Creates a new Blog Post for the user.
     * @param user User creating the blog post
     * @param title Title of the blog post
     * @param body Body of the Blog post
     * @return the newly created Blog post
     */
    public Post createBlogEntry(User user, String title, String body) {
        //To-Do
        return new Post();
    }

    /**
     * Fetches Blog Post by Title.
     * @param title The title of the blog post to be fetched/read
     * @return the Post associated with the requested title
     */
    public Post readBlogEntry(String title) {
        //To-Do
        return new Post();
    }

    /**
     * Fetches All Blog Posts.
     * @return a List of all Posts
     */
    public List<Post> readAllBlogEntries() {
        //To-Do
        return new ArrayList<>();
    }

    /**
     * Makes updates to a blog post with a specific title. Does nothing if no Title Match.
     * @param title The Title of the Blog Post to be updated
     * @param body The New body of the Blog Post
     * @return the Updated Blog Post
     */
    public Post updateBlogEntry(String title, String body) {
        //To-Do
        return new Post();
    }

    /**
     * Deletes a Blog Post by title.
     * @param title The title of the blog post to be deleted
     */
    public void deleteBlogEntry(String title) {
        //To-Do
        return;
    }

    /**
     * Attempts to log in the user who owns the blog.
     * @param username The username of the user
     * @param password The password of the user
     * @return The boolean status of the login - successful or not
     */
    public Boolean logIn(String username, String password) {
        //To-Do
        return false;
    }

    /**
     * Creates a new user if one does not already exist.
     * @param username The desired username for the user
     * @param password The desired password for the user
     * @param displayName The desired displayname for the user. Will display in Blog Posts
     * @return The newly created User.
     */
    public User createUser(String username, String password, String displayName) {
        //To-Do
        return new User();
    }

}
