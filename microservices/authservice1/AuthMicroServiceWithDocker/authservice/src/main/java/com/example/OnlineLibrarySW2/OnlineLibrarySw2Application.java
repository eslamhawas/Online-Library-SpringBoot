package com.example.OnlineLibrarySW2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@ComponentScan(basePackages = {"com.example.OnlineLibrarySW2"})
@EnableAspectJAutoProxy
@SpringBootApplication
public class OnlineLibrarySw2Application {

	public static void main(String[] args) {
		SpringApplication.run(OnlineLibrarySw2Application.class, args);
	}

}
