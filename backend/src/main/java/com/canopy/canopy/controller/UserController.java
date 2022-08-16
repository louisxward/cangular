package com.canopy.canopy.controller;

import com.canopy.canopy.entity.User;
import com.canopy.canopy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> fetchUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public User newUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }

}
