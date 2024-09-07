package com.example.flypatternlib.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Make uploads to endpoint images save files to C:
        registry.addResourceHandler("/images/**")
            .addResourceLocations("file:C:/uploads/images/");
    }
}