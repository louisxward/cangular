package com.canopy.canopy.controller;

import com.canopy.canopy.entity.User;
import com.canopy.canopy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users/{id}")
    public User one(@PathVariable Long id) {
        return userRepository.findById(id).get();
        //.orElseThrow(() -> new EmployeeNotFoundException(id)
    }
    @GetMapping("/users")
    public List<User> fetchUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public User newUser(@RequestBody User user){

        System.out.println("newUser()");
        User user2 = userRepository.save(user);
        System.out.println(user2.getId());
        return user2;
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }

    @PutMapping("/users/{id}")
    public void saveUser(@RequestBody User user, @PathVariable Long id) {
        userRepository.save(user);
        //return ResponseEntity.ok("resource saved");
    }

}
