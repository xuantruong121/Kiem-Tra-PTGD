import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, InputGroup } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Sản phẩm 1', price: 100, category: 'Thời trang', stock: 10 },
        { id: 2, name: 'Sản phẩm 2', price: 200, category: 'Công nghệ', stock: 20 },
        { id: 3, name: 'Máy hút bụi', price: 500, category: 'Gia dụng', stock: 5 },
    ]);

    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

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

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    // Lọc theo tên và danh mục
    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
        return matchesName && matchesCategory;
    });

    const totalProducts = filteredProducts.length;
    const totalStock = filteredProducts.reduce((sum, p) => sum + parseInt(p.stock), 0);

    useEffect(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Danh sách sản phẩm</h2>

            {/* Tìm kiếm và lọc danh mục */}
            <Row className="mb-3">
                <Col md={6}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm sản phẩm theo tên"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={6}>
                    <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="Tất cả">Tất cả danh mục</option>
                        <option value="Thời trang">Thời trang</option>
                        <option value="Công nghệ">Công nghệ</option>
                        <option value="Gia dụng">Gia dụng</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Form thêm sản phẩm */}
            <Row className="mb-4">
                <Col md={3}>
                    <Form.Control
                        placeholder="Tên sản phẩm"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                </Col>
                <Col md={2}>
                    <Form.Control
                        type="number"
                        placeholder="Giá"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        placeholder="Danh mục"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    />
                </Col>
                <Col md={2}>
                    <Form.Control
                        type="number"
                        placeholder="Tồn kho"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    />
                </Col>
                <Col md={2}>
                    <Button variant="success" onClick={handleAddProduct}>Thêm sản phẩm</Button>
                </Col>
            </Row>

            {/* Danh sách sản phẩm */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Giá (VND)</th>
                        <th>Danh mục</th>
                        <th>Tồn kho</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                                    Xoá
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <p className="fw-bold">
                Tổng sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}
            </p>
        </Container>
    );
};

export default ProductList;
