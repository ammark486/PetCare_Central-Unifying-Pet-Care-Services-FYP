package com.example.demo.repository;

import com.example.demo.model.MasterOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MasterOrderRepo extends JpaRepository<MasterOrder, Long> {
    Page<MasterOrder> findByStatus(Boolean status, Pageable pageable);

    @Query(value = "select sum(mo.totalAmount) as totalSales from MasterOrder mo where mo.status = true")
    Long getTotalSales();

    @Query(value = "SELECT SUM(total_amount) AS totalSales FROM master_order WHERE status = true AND YEAR(order_date) = :year", nativeQuery = true)
    Long getTotalSalesByYear(String year);

    @Query(value = "WITH Months AS ( " +
            "    SELECT 1 AS month_number " +
            "    UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 " +
            "    UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 " +
            ") " +
            "SELECT " +
            "    IFNULL(SUM(mo.total_amount), 0) AS total_amount, " +
            "    m.month_number AS month " +
            "FROM " +
            "    Months m " +
            "LEFT JOIN " +
            "    master_order mo ON MONTH(mo.order_date) = m.month_number AND YEAR(mo.order_date) = :year  and mo.status = true " +
            "GROUP BY " +
            "    m.month_number " +
            "ORDER BY " +
            "    m.month_number", nativeQuery = true)
    List<Object[]> getTotalAmountByMonthAndYear(String year);

}
