package com.canopy.canopy.controller;

public class EmployeeNotFoundException extends Throwable {
    public EmployeeNotFoundException(Long id) {
        System.out.printf("User not found Id: %s \n", id);
    }
}
