import React, { useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm 1', price: 100, category: 'Thời trang', stock: 10 },
    { id: 2, name: 'Sản phẩm 2', price: 200, category: 'Công nghệ', stock: 20 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        ...newProduct,
      },
    ]);
    setNewProduct({ name: '', price: '', category: '', stock: '' });
  };

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <div>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Giá"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Danh mục"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Tồn kho"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <button onClick={handleAddProduct}>Thêm sản phẩm</button>
      </div>
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
