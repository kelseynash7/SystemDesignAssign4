package com.blog.personalBlog;

import com.blog.personalBlog.logger.Logger;
import com.blog.personalBlog.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class PersonalBlogApplication {

	private static final Logger log = Logger.getLogger();

	public static void main(String[] args) {
		log.log("LOG: staring Personal Blog Application");
		SpringApplication.run(PersonalBlogApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "PUT", "POST", "DELETE", "OPTIONS");
			}
		};
	}

	@Autowired
	BlogRepository blogRepository;
}
