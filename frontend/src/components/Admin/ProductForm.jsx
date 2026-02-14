import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/router';

export default function ProductForm({ existingProduct = null }) {
    const router = useRouter();
    const [formData, setFormData] = useState(() => ({
        title: existingProduct?.title || '',
        price: existingProduct?.price || '',
        description: existingProduct?.description || '',
        sku: existingProduct?.sku || '',
        category: existingProduct?.categories?.[0]?.name || '',
        images: existingProduct?.images?.map(i => i.url).join(', ') || '',
    }));



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            // Simple processing for demo
            images: formData.images.split(',').map(url => ({ url: url.trim(), type: 'zoom' })),
            categories: [] // simplistic for now
        };

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            if (existingProduct) {
                await api.put(`/products/${existingProduct._id}`, payload, config);
            } else {
                await api.post('/products', payload, config);
            }
            router.push('/admin');
        } catch (error) {
            alert('Failed to save product');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 shadow-sm">
            <div>
                <label className="block text-sm font-bold mb-2">Title</label>
                <input name="title" value={formData.title} onChange={handleChange} className="w-full border p-2" required />
            </div>
            <div>
                <label className="block text-sm font-bold mb-2">Price (INR)</label>
                <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border p-2" required />
            </div>
            <div>
                <label className="block text-sm font-bold mb-2">SKU</label>
                <input name="sku" value={formData.sku} onChange={handleChange} className="w-full border p-2" required />
            </div>
            <div>
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 h-32" />
            </div>
            <div>
                <label className="block text-sm font-bold mb-2">Image URLs (comma separated)</label>
                <input name="images" value={formData.images} onChange={handleChange} className="w-full border p-2" />
            </div>
            <button type="submit" className="bg-black text-white px-6 py-3 uppercase tracking-widest text-xs">
                {existingProduct ? 'Update Product' : 'Create Product'}
            </button>
        </form>
    );
}
