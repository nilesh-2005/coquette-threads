import Head from 'next/head';
import ProductForm from '@/components/Admin/ProductForm';
import AdminRoute from '@/components/Admin/AdminRoute';

export default function NewProduct() {
    return (
        <AdminRoute>
            <div className="min-h-screen bg-gray-50 pt-24 px-6">
                <Head><title>New Product</title></Head>
                <div className="container mx-auto">
                    <h1 className="text-3xl font-serif mb-8">Create Product</h1>
                    <ProductForm />
                </div>
            </div>
        </AdminRoute>
    );
}
