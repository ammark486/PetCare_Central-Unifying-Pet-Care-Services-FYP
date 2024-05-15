package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long>, JpaSpecificationExecutor<User> {
    User findByUserName(String username);

    @Query(value = "SELECT COUNT(id) AS users FROM user WHERE YEAR(registration_date) = :year", nativeQuery = true)
    Long countAllUsersByYear(String year);
}

