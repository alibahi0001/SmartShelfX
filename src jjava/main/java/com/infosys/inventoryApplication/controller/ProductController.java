package com.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.inventoryApplication.bean.Product;
import com.infosys.inventoryApplication.dao.ProductDao;

@RestController
@RequestMapping("/invent/")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3131"}, allowedHeaders = "*")
public class ProductController {
	@Autowired
	private ProductDao productDao;
	
	@PostMapping("/product")
	public void saveProduct(@RequestBody Product product) {
		productDao.saveProduct(product);
	}
	
	@PostMapping("/product/add")
	public void addProduct(@RequestBody Product product) {
		productDao.saveProduct(product);
	}

	@GetMapping("/product")
	public List<Product> getAllProducts() {
		return productDao.getAllProducts();
	}

	@GetMapping("/product/{id}")
	public Product getProductById(@PathVariable Long id) {
		return productDao.getProductById(id);
	}
	
	@PutMapping("/product")
	public void updateProduct(@RequestBody Product product) {
		productDao.saveProduct(product);
	}

	@DeleteMapping("/product/{id}")
	public void deleteProductById(@PathVariable Long id) {
		productDao.deleteProductById(id);
	}
	
	// Mock vendor endpoint - replace with actual vendor service later
	@GetMapping("/vendors")
	public List<String> getVendors() {
		return List.of("Marigold", "Nestle", "HUL", "ITC", "Parle");
	}

}
