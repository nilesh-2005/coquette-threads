import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '@/lib/api';
import ProductForm from '@/components/Admin/ProductForm';

export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 px-6">
            <Head><title>Edit Product</title></Head>
            <div className="container mx-auto">
                <h1 className="text-3xl font-serif mb-8">Edit Product</h1>
                <ProductForm existingProduct={product} />
            </div>
        </div>
    );
}
