package com.blog.personalBlog.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class Category {

    //category_id
    //category_name

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Integer category_id;

    @Column(name = "category_name", unique = true, nullable = false)
    private String category_name;


    public void setCategory_id(Integer category_id) {
        this.category_id = category_id;
    }

    public Integer getCategory_id() {
        return category_id;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public String getCategory_name() {
        return category_name;
    }
}
