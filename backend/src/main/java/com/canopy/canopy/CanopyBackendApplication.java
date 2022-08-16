package com.canopy.canopy;

import com.canopy.canopy.entity.User;
import com.canopy.canopy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class CanopyBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(CanopyBackendApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;

	@Override
	public void run(String... args) throws Exception {
		User user = User.builder()
				.username("lward")
				.firstName("Louis")
				.lastName("Ward")
				.email("louis.ward@ocgsoftware.com")
				.build();
		System.out.println(user.getId());
		User user2 = User.builder()
				.username("dluck")
				.firstName("Dale")
				.lastName("Luck")
				.email("dale.luck@ocgsoftware.com")
				.build();
		User user3 = User.builder()
				.username("mmills")
				.firstName("Marc")
				.lastName("Mills")
				.email("marc.mills@ocgsoftware.com")
				.build();
		userRepository.save(user);
		userRepository.save(user2);
		userRepository.save(user3);
	}
}
