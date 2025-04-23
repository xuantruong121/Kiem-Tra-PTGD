import React from 'react';
import { Button } from 'react-bootstrap';

const ProductItem = ({ product, onDelete }) => {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
            <td>
                <Button variant="danger" onClick={() => onDelete(product.id)}>
                    Xoá
                </Button>
            </td>
        </tr>
    );
};

export default ProductItem;
