// src/components/ProductList.jsx
import React from 'react';

const products = [
  { id: 1, name: 'Sản phẩm 1', price: 100, category: 'Thời trang', stock: 10 },
  { id: 2, name: 'Sản phẩm 2', price: 200, category: 'Công nghệ', stock: 20 },
  // Thêm sản phẩm mẫu ở đây
];

const ProductList = () => {
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span> - {product.price} VND - {product.category} - Tồn kho: {product.stock}
            <button>Xoá</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
