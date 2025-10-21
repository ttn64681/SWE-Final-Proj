package com.acm.cinema_ebkg_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.acm.cinema_ebkg_system.dto.payment.PaymentRequest;
import com.acm.cinema_ebkg_system.model.User;
import com.acm.cinema_ebkg_system.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/add/{userId}")
    public ResponseEntity<User> addPaymentInfo(@PathVariable Long userId, @RequestBody PaymentRequest paymentRequest) {
        try {
            User user = paymentService.addPaymentInfo(userId, paymentRequest);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update/{userId}/{paymentInfoId}")
    public ResponseEntity<User> updatePaymentInfo(@PathVariable Long userId, @PathVariable Long paymentInfoId, @RequestBody PaymentRequest paymentRequest) {
        try {
            User user = paymentService.updatePaymentInfo(userId, paymentInfoId, paymentRequest);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{userId}/{paymentInfoId}")
    public ResponseEntity<User> deletePaymentInfo(@PathVariable Long userId, @PathVariable Long paymentInfoId) {
        try {
            User user = paymentService.deletePaymentInfo(userId, paymentInfoId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // GET /api/users/{userId}/payment - Get user's payment information
    @GetMapping("/")
    public List<PaymentInfo> getUserPaymentInfo(@PathVariable Long userId) throws Exception {
        return paymentService.getUserPaymentInfo(userId);
    }

    // POST /api/users/{userId}/payment - Add new payment info for user
    @PostMapping("/")
    public User addPaymentInfo(@PathVariable Long userId, @RequestBody PaymentRequest dtoPayment) throws Exception {
        return paymentService.addPaymentInfo(userId, dtoPayment);
    }

    @PutMapping("/{paymentId}")
    public User updatePaymentInfo(@PathVariable Long userId, @PathVariable Long paymentId, @RequestBody PaymentRequest dtoPayment) throws Exception {
        return paymentService.updatePaymentInfo(userId, paymentId, dtoPayment);
    }

    @DeleteMapping("/{paymentId}")
    public User deletePaymentInfo(@PathVariable Long userId, @PathVariable Long paymentId) {
        return paymentService.deletePaymentInfo(userId, paymentId);        
    }
}
