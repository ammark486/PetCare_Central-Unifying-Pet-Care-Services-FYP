package com.example.demo.repository;

import com.example.demo.model.MasterOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterOrderRepo extends JpaRepository<MasterOrder, Long> {
    Page<MasterOrder> findByStatus(Boolean status, Pageable pageable);
}
