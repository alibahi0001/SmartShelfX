package com.infosys.inventoryApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Transaction {

	@Id
	private Long transactionId;
	private String transactionType;
	private String productId;
	private Double rate;
	private Double quantity;
	private Double transactionValue;
	private Double userId;
	private String transactionDate;
	public Transaction()
	{
		super();
		
	}
	public Transaction(Long transactionId, String transactionType, String productId, Double rate, Double quantity,
			Double transactionValue, Double userId, String transactionDate) {
		super();
		this.transactionId = transactionId;
		this.transactionType = transactionType;
		this.productId = productId;
		this.rate = rate;
		this.quantity = quantity;
		this.transactionValue = transactionValue;
		this.userId = userId;
		this.transactionDate = transactionDate;
	}
	
	
}
