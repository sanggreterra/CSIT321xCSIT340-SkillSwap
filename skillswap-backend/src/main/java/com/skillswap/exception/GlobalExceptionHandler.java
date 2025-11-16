package com.skillswap.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.validation.FieldError;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneral(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(com.skillswap.exception.EmailAlreadyExistsException.class)
    public ResponseEntity<String> handleEmailExists(com.skillswap.exception.EmailAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrity(DataIntegrityViolationException ex) {
        // Generic catch for DB constraint violations (unique/index). Return 409 Conflict.
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Database constraint violation: " + ex.getMostSpecificCause().getMessage());
    }

    @ExceptionHandler(com.skillswap.exception.InvalidCredentialsException.class)
    public ResponseEntity<String> handleInvalidCredentials(com.skillswap.exception.InvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        StringBuilder sb = new StringBuilder();
        for (FieldError err : ex.getBindingResult().getFieldErrors()) {
            sb.append(err.getField()).append(": ").append(err.getDefaultMessage()).append("; ");
        }
        String message = sb.toString().trim();
        if (message.endsWith(";")) message = message.substring(0, message.length()-1);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }
}
