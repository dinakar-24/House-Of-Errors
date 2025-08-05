import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    price: ''
  });

  const currency = '₹'; // Indian Rupee symbol

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      } else {
        toast.error(response.data.message || 'Failed to load products');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Product deleted successfully');
        await fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const startEditing = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/update`,
        {
          id,
          name: editForm.name,
          category: editForm.category,
          price: Number(editForm.price)
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Product updated successfully');
        setEditingId(null);
        await fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product Inventory</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border text-left">Image</th>
              <th className="p-2 border text-left">Name</th>
              <th className="p-2 border text-left">Category</th>
              <th className="p-2 border text-left">Price</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border hover:bg-gray-50">
                <td className="p-2 border">
                  <img 
                    src={product.image?.[0] || 'https://via.placeholder.com/50'} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover"
                  />
                </td>
                
                <td className="p-2 border">
                  {editingId === product._id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                
                <td className="p-2 border">
                  {editingId === product._id ? (
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      className="w-full p-1 border rounded"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  ) : (
                    product.category
                  )}
                </td>
                
                <td className="p-2 border">
                  {editingId === product._id ? (
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    `${currency}${product.price.toLocaleString('en-IN')}`
                  )}
                </td>
                
                <td className="p-2 border text-center">
                  {editingId === product._id ? (
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => saveEdit(product._id)}
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => startEditing(product)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;