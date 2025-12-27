package com.infosys.inventoryApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.inventoryApplication.bean.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
}
