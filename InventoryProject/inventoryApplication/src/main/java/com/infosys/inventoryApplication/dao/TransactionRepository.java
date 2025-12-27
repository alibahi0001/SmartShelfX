package com.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.infosys.inventoryApplication.bean.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

@Query("select max (transactionId) from Transaction t")
public Long findMaxTransactionId();

@Query("select a from Transaction a where transactionType=?1 type ")
public List< > findTransactionsByType (String type);

/*@Query("SELECT new com.infosys.inventoryApplication.bean.ProductSales (p.productName, SUM(s.transactionVa

"FROM Product p JOIN Transaction s ON p.productId = s.productId " + "WHERE s.transactionType='OUT' GROUP BY p.productId ")

public List<ProductSales> getProductWiseTotalSale();*/

@Query("SELECT s.transactionValue from Transactions WHERE s.transactionType='OUT' and productId=?1 produc

public List<Double> getDemandByProduct (String productId);