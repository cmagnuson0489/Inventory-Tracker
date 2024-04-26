import React, { useEffect, useState } from 'react';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/inventory')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('We encountered an error while fetching products:', error));
    }, []);

    
    const updateInventory = (productId, newQuantity) => {
        fetch(`http://localhost:5000/inventory/${productId}`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: newQuantity })
        })
        .then(response => response.json())
        .then(data => {
            // Update the local state to reflect the inventory change
            const updatedProducts = products.map(product =>
                product.id === productId ? { ...product, quantity: data.quantity } : product
            );
            setProducts(updatedProducts);
        })
        .catch(error => console.error('Error updating inventory:', error));
    };

    return (
        <div>
            <h1>Product Inventory</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - Quantity: {product.quantity}
                        <button onClick={() => updateInventory(product.id, product.quantity - 1)}>
                            Sell One
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
