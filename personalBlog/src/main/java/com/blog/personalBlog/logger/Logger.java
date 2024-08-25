package com.blog.personalBlog.logger;

public class Logger {

    private static Logger logger = new Logger();
    private Logger(){}

    public static Logger getLogger() {
        return logger;
    }

    public void log(String message) {
        System.out.println(message);
    }
}
