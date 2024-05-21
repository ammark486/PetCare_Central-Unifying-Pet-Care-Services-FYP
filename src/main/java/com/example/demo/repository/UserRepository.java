package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long>, JpaSpecificationExecutor<User> {
    User findByUserName(String username);

    @Query(value = "SELECT COUNT(id) AS users FROM user WHERE YEAR(registration_date) = :year", nativeQuery = true)
    Long countAllUsersByYear(String year);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :role")
    List<User> getUsersByRole(String role);

    @Query(value = "select count(u.id) as totalVets from user u \n" +
            "inner join user_roles ur on u.id = ur.user_id\n" +
            "inner join role r on r.id = ur.role_id\n" +
            "where r.name = 'ROLE_VET'", nativeQuery = true)
    Long getAllVets();

    @Query(value = "select count(u.id) as totalVets from user u \n" +
            "inner join user_roles ur on u.id = ur.user_id\n" +
            "inner join role r on r.id = ur.role_id\n" +
            "where r.name = 'ROLE_VET' and YEAR(u.registration_date) = :year", nativeQuery = true)
    Long getAllVetsYearly(String year);
}

