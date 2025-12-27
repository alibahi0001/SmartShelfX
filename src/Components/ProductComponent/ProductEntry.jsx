import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveNewProduct, fetchVendors } from '../../Services/ProductService';
import { getAllSKUs } from '../../Services/SKUService';

const ProductEntry = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    skuId: "",
    purchasePrice: 0,
    stock: 0,
    reorderLevel: 0,
    vendorId: "",
    status: true
  });

  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);
  const [skuList, setSkuList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  // Fetch SKU and Vendor lists on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const skus = await getAllSKUs();
        const vendors = await fetchVendors();
        setSkuList(skus);
        setVendorList(vendors);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle input changes
  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  // Validate form
  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!product.productName.trim()) {
      tempErrors.productName = "Product Name is required";
      isValid = false;
    }

    if (!product.skuId.trim()) {
      tempErrors.skuId = "SKU is required";
      isValid = false;
    }

    if (!String(product.purchasePrice).trim() || product.purchasePrice <= 0) {
      tempErrors.purchasePrice = "Purchase Price must be greater than 0";
      isValid = false;
    }

    if (!String(product.stock).trim() || product.stock <= 0) {
      tempErrors.stock = "Stock must be greater than 0";
      isValid = false;
    }

    if (!String(product.reorderLevel).trim() || product.reorderLevel <= 0) {
      tempErrors.reorderLevel = "Reorder Level must be greater than 0";
      isValid = false;
    }

    if (!product.vendorId.trim()) {
      tempErrors.vendorId = "Vendor Id is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      saveProduct(event);
    }
  };

  // Save product
  const saveProduct = async (event) => {
    event.preventDefault();

    let updatedProduct = { ...product };

    if (parseFloat(updatedProduct.stock) <= parseFloat(updatedProduct.reorderLevel)) {
      updatedProduct.status = false;
    } else {
      updatedProduct.status = true;
    }

    try {
      await saveNewProduct(updatedProduct);
      setFlag(true);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product: ' + error.message);
    }
  };

  // Clear all fields
  const clearAll = () => {
    setProduct({
      productName: "",
      skuId: "",
      purchasePrice: 0,
      stock: 0,
      reorderLevel: 0,
      vendorId: "",
      status: true
    });
    setErrors({});
    setFlag(false);
  };

  // Next entry
  const nextEntry = () => {
    clearAll();
    navigate("/product-entry");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px', color: '#333' }}>New Product Addition</h1>
        
        <form onSubmit={handleValidation}>
          {/* Product Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={onChangeHandler}
              placeholder="Enter product name"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
            {errors.productName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.productName}</span>}
          </div>

          {/* Select SKU */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Select SKU:</label>
            <select
              name="skuId"
              value={product.skuId}
              onChange={onChangeHandler}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            >
              <option value="">-- Select SKU --</option>
              {skuList.map((sku) => (
                <option key={sku.skuId} value={sku.skuId}>
                  {sku.skuId}
                </option>
              ))}
            </select>
            {errors.skuId && <span style={{ color: 'red', fontSize: '12px' }}>{errors.skuId}</span>}
          </div>

          {/* Purchase Price */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Purchase Price:</label>
            <input
              type="number"
              name="purchasePrice"
              value={product.purchasePrice}
              onChange={onChangeHandler}
              placeholder="Enter purchase price"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
            {errors.purchasePrice && <span style={{ color: 'red', fontSize: '12px' }}>{errors.purchasePrice}</span>}
          </div>

          {/* Stock */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Stock:</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={onChangeHandler}
              placeholder="Enter stock quantity"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
            {errors.stock && <span style={{ color: 'red', fontSize: '12px' }}>{errors.stock}</span>}
          </div>

          {/* Re Order Level */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Re Order Level:</label>
            <input
              type="number"
              name="reorderLevel"
              value={product.reorderLevel}
              onChange={onChangeHandler}
              placeholder="Enter reorder level"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
            {errors.reorderLevel && <span style={{ color: 'red', fontSize: '12px' }}>{errors.reorderLevel}</span>}
          </div>

          {/* Select Vendor Id */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Select Vendor Id:</label>
            <input
              type="text"
              name="vendorId"
              value={product.vendorId}
              onChange={onChangeHandler}
              list="vendorList"
              placeholder="Enter or select vendor ID"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
            />
            <datalist id="vendorList">
              {vendorList.map((vendor, index) => (
                <option key={index} value={vendor.vendorId || vendor} />
              ))}
            </datalist>
            {errors.vendorId && <span style={{ color: 'red', fontSize: '12px' }}>{errors.vendorId}</span>}
          </div>

          {/* Success Message */}
          {flag && (
            <div style={{ padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
              New Product Added...
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="submit"
              style={{ padding: '10px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={clearAll}
              style={{ padding: '10px 30px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              style={{ padding: '10px 30px', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
            >
              Return Back
            </button>
            {flag && (
              <button
                type="button"
                onClick={nextEntry}
                style={{ padding: '10px 30px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
              >
                Next Entry
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEntry;
