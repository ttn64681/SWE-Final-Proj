package com.acm.cinema_ebkg_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.acm.cinema_ebkg_system.model.PaymentInfo;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Long> {

    
}
