import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { resolveImageUrl } from '@/lib/utils';
import { gsap } from '@/lib/gsap';
import { useGsap } from '@/hooks/useGsap';

export default function ProductForm({ existingProduct = null }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('vital');
    const [loading, setLoading] = useState(false);
    const tabContentRef = useRef(null);

    useGsap(() => {
        if (tabContentRef.current) {
            gsap.fromTo(tabContentRef.current,
                { opacity: 0, x: 10 },
                { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
            );
        }
    }, [activeTab]);

    const [formData, setFormData] = useState({
        // Vital Info
        title: '',
        sku: '',
        price: '',
        compareAtPrice: '',
        description: '',
        shortDescription: '',
        categories: [], // Array of IDs
        tags: '',

        // Images
        images: [{ url: '', type: 'hero', alt: '' }],

        // Attributes
        fabric: '',
        silhouette: '',
        neckline: '',
        sleeve: '',
        embellishments: '',
        careInstructions: '',

        // Variants
        variants: [], // { sku, size, color, inventoryQty }

        // Offer & Shipping
        productionLeadTime: '',
        shippingEstimate: '',
        returnPolicy: '',
        isMadeToOrder: false,
        isLimitedEdition: false,
        published: false
    });

    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/categories');
                setAllCategories(data);
            } catch (err) {
                console.error('Failed to fetch categories', err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (existingProduct) {
            setFormData(prev => ({
                ...prev,
                ...existingProduct,
                categories: existingProduct.categories?.map(c => typeof c === 'object' ? c._id : c) || [],
                tags: existingProduct.tags?.join(', ') || '',
                embellishments: existingProduct.embellishments?.join(', ') || '',
                // Ensure array fields exist
                images: existingProduct.images?.length ? existingProduct.images : [{ url: '', type: 'hero', alt: '' }],
                variants: existingProduct.variants || []
            }));
        }
    }, [existingProduct]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCategoryToggle = (categoryId) => {
        setFormData(prev => {
            const current = [...prev.categories];
            const index = current.indexOf(categoryId);
            if (index > -1) {
                current.splice(index, 1);
            } else {
                current.push(categoryId);
            }
            return { ...prev, categories: current };
        });
    };

    const handleImageChange = (index, field, value) => {
        const newImages = [...formData.images];
        newImages[index][field] = value;
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const addImage = () => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, { url: '', type: 'zoom', alt: '' }]
        }));
    };

    const removeImage = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...formData.variants];
        newVariants[index][field] = value;
        setFormData(prev => ({ ...prev, variants: newVariants }));
    };

    const addVariant = () => {
        setFormData(prev => ({
            ...prev,
            variants: [...prev.variants, { sku: `${formData.sku}-${prev.variants.length + 1}`, size: '', color: '', inventoryQty: 0 }]
        }));
    };

    const removeVariant = (index) => {
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, variants: newVariants }));
    };

    const handleFileUpload = async (index, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            const { data } = await api.post('/upload', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleImageChange(index, 'url', data.url);
        } catch (error) {
            console.error('Upload error:', error);
            alert('File upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Process data for backend
        const payload = {
            ...formData,
            price: Number(formData.price),
            compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
            categories: formData.categories,
            tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags,
            embellishments: typeof formData.embellishments === 'string' ? formData.embellishments.split(',').map(t => t.trim()).filter(Boolean) : formData.embellishments,
            images: formData.images.filter(img => img.url),
            variants: formData.variants.filter(v => v.sku),
            sizes: [...new Set(formData.variants.map(v => v.size).filter(Boolean))],
            colors: [...new Set(formData.variants.map(v => v.color).filter(Boolean))].map(c => ({ name: c }))
        };

        try {
            if (existingProduct) {
                await api.put(`/products/${existingProduct._id}`, payload);
            } else {
                await api.post('/products', payload);
            }
            router.push('/admin/products');
        } catch (error) {
            console.error('Save error details:', error.response?.data || error.message);
            const serverMsg = error.response?.data?.message || '';
            const details = error.response?.data?.errors ? Object.values(error.response.data.errors).map(e => e.message).join(', ') : '';
            alert(`Unable to save product. Server responded: ${serverMsg}. Details: ${details}`);
        } finally {
            setLoading(false);
        }
    };

    const TabButton = ({ id, label }) => (
        <button
            type="button"
            onClick={() => setActiveTab(id)}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 uppercase tracking-wider ${activeTab === id
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
        >
            {label}
        </button>
    );

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-sm min-h-[80vh] flex flex-col">
            <div className="border-b border-gray-200 px-8 flex overflow-x-auto">
                <TabButton id="vital" label="Vital Info" />
                <TabButton id="attributes" label="Attributes" />
                <TabButton id="images" label="Images" />
                <TabButton id="variants" label="Variations" />
                <TabButton id="shipping" label="Offer & Shipping" />
            </div>

            <div ref={tabContentRef} className="p-8 flex-grow overflow-y-auto">
                {/* VITAL INFO TAB */}
                {activeTab === 'vital' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Product Name *</label>
                            <input name="title" value={formData.title} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" required placeholder="e.g. Royal Gold Satin Ballroom Gown" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">SKU *</label>
                            <input name="sku" value={formData.sku} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" required placeholder="e.g. CT-2024-001" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Price (INR) *</label>
                                <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Compare At Price</label>
                                <input name="compareAtPrice" type="number" value={formData.compareAtPrice} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 p-4 h-40 focus:border-black focus:outline-none transition-colors" placeholder="Product description (HTML supported)" />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Short Description</label>
                            <input name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="Brief summary for listings" />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">Categories *</label>
                            <div className="flex flex-wrap gap-4 bg-gray-50 p-6 border border-gray-100">
                                {allCategories.map(cat => (
                                    <label key={cat._id} className="flex items-center space-x-2 cursor-pointer group">
                                        <div
                                            onClick={() => handleCategoryToggle(cat._id)}
                                            className={`w-5 h-5 border flex items-center justify-center transition-all ${formData.categories.includes(cat._id)
                                                ? 'bg-black border-black'
                                                : 'bg-white border-gray-300 group-hover:border-black'
                                                }`}
                                        >
                                            {formData.categories.includes(cat._id) && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-xs uppercase tracking-widest transition-colors ${formData.categories.includes(cat._id) ? 'text-black font-bold' : 'text-gray-500'
                                            }`}>
                                            {cat.name}
                                        </span>
                                    </label>
                                ))}
                                {allCategories.length === 0 && (
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">Loading categories...</p>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Tags (Comma Separated)</label>
                            <input name="tags" value={formData.tags} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="vintage, lace, gold, evening" />
                        </div>
                    </div>
                )}

                {/* ATTRIBUTES TAB */}
                {activeTab === 'attributes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Fabric Material</label>
                            <input name="fabric" value={formData.fabric} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="e.g. 100% Silk Satin" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Silhouette</label>
                            <select name="silhouette" value={formData.silhouette} onChange={handleChange} className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black focus:outline-none">
                                <option value="">Select Silhouette</option>
                                <option value="Ball Gown">Ball Gown</option>
                                <option value="A-Line">A-Line</option>
                                <option value="Mermaid">Mermaid / Trumpet</option>
                                <option value="Sheath">Sheath / Column</option>
                                <option value="Empire">Empire Waist</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Neckline</label>
                            <input name="neckline" value={formData.neckline} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="e.g. Sweetheart, V-Neck" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Sleeve Style</label>
                            <input name="sleeve" value={formData.sleeve} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="e.g. Cap Sleeve, Long Bell Sleeve" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Embellishments (Comma Separated)</label>
                            <input name="embellishments" value={formData.embellishments} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="e.g. Crystal Beading, Lace Applique, Pearls" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Care Instructions</label>
                            <textarea name="careInstructions" value={formData.careInstructions} onChange={handleChange} className="w-full border border-gray-300 p-4 h-24 focus:border-black focus:outline-none transition-colors" placeholder="e.g. Dry Clean Only" />
                        </div>
                    </div>
                )}

                {/* IMAGES TAB */}
                {activeTab === 'images' && (
                    <div className="space-y-6 max-w-5xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm uppercase tracking-widest font-bold">Product Images</h3>
                            <button type="button" onClick={addImage} className="text-xs uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                                + Add Image Row
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {formData.images.map((img, index) => (
                                <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 border border-gray-100">
                                    <div className="w-24 h-32 bg-gray-200 flex-shrink-0 overflow-hidden relative group border border-gray-200">
                                        {/* Preview logic */}
                                        {img.url ? (
                                            <img
                                                src={resolveImageUrl(img.url)}
                                                className="w-full h-full object-contain"
                                                alt="preview"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className="flex items-center justify-center h-full text-gray-400 text-[10px] text-center p-2 bg-gray-50 uppercase tracking-widest" style={{ display: img.url ? 'none' : 'flex' }}>
                                            No Image
                                        </div>
                                    </div>

                                    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-500 font-bold">Image URL or Local Upload</label>
                                            <div className="flex gap-2">
                                                <input
                                                    value={img.url}
                                                    onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                                                    className="flex-grow border-b border-gray-300 py-1 text-sm bg-transparent focus:border-black focus:outline-none"
                                                    placeholder="https://... or click upload"
                                                />
                                                <label className="cursor-pointer bg-gray-100 px-3 py-1 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border border-gray-200 flex items-center">
                                                    Upload
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload(index, e)}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest mb-1 text-gray-500">Type</label>
                                            <select
                                                value={img.type}
                                                onChange={(e) => handleImageChange(index, 'type', e.target.value)}
                                                className="w-full border-b border-gray-300 py-1 text-sm bg-transparent focus:border-black focus:outline-none"
                                            >
                                                <option value="zoom">Standard (Zoom)</option>
                                                <option value="hero">Hero (Main Listing)</option>
                                                <option value="thumbnail">Thumbnail</option>
                                                <option value="lifestyle">Lifestyle / Model</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-3 flex justify-between items-center">
                                            <input
                                                value={img.alt}
                                                onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                                                className="w-3/4 border-b border-gray-300 py-1 text-xs bg-transparent focus:border-black focus:outline-none"
                                                placeholder="Alt Text (for accessibility)"
                                            />
                                            <button type="button" onClick={() => removeImage(index)} className="text-red-500 text-xs uppercase tracking-widest hover:text-red-700">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* VARIANTS TAB */}
                {activeTab === 'variants' && (
                    <div className="space-y-6 max-w-6xl">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-sm uppercase tracking-widest font-bold">Variations</h3>
                                <p className="text-xs text-gray-500 mt-1">Manage sizes, colors, and stock for each combination.</p>
                            </div>
                            <button type="button" onClick={addVariant} className="text-xs uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                                + Add Variant
                            </button>
                        </div>

                        {formData.variants.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 text-gray-500 text-sm">
                                No variants added. Click &quot;Add Variant&quot; to create sizes/colors.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">SKU</th>
                                            <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Size</th>
                                            <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Color</th>
                                            <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Inventory Qty</th>
                                            <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {formData.variants.map((variant, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2">
                                                    <input
                                                        value={variant.sku}
                                                        onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                                                        className="w-full border-b border-gray-300 py-1 text-sm focus:border-black focus:outline-none"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        value={variant.size}
                                                        onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                                        className="w-20 border-b border-gray-300 py-1 text-sm focus:border-black focus:outline-none"
                                                        placeholder="e.g. S, M"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        value={variant.color}
                                                        onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                                                        className="w-32 border-b border-gray-300 py-1 text-sm focus:border-black focus:outline-none"
                                                        placeholder="e.g. Gold"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        value={variant.inventoryQty}
                                                        onChange={(e) => handleVariantChange(index, 'inventoryQty', e.target.value)}
                                                        className="w-20 border-b border-gray-300 py-1 text-sm focus:border-black focus:outline-none"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <button type="button" onClick={() => removeVariant(index)} className="text-red-500 hover:text-red-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* SHIPPING TAB */}
                {activeTab === 'shipping' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Production Lead Time</label>
                            <input name="productionLeadTime" value={formData.productionLeadTime} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="e.g. 4-6 Weeks" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Shipping Estimate</label>
                            <input name="shippingEstimate" value={formData.shippingEstimate} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors" placeholder="e.g. 3-5 Business Days" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Return Policy</label>
                            <textarea name="returnPolicy" value={formData.returnPolicy} onChange={handleChange} className="w-full border border-gray-300 p-4 h-24 focus:border-black focus:outline-none transition-colors" placeholder="Policy details..." />
                        </div>

                        <div className="col-span-2 space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center">
                                <input type="checkbox" id="isMadeToOrder" name="isMadeToOrder" checked={formData.isMadeToOrder} onChange={handleChange} className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black" />
                                <label htmlFor="isMadeToOrder" className="ml-2 block text-sm text-gray-900">Made to Order Item (Waitlist)</label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="isLimitedEdition" name="isLimitedEdition" checked={formData.isLimitedEdition} onChange={handleChange} className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black" />
                                <label htmlFor="isLimitedEdition" className="ml-2 block text-sm text-gray-900">Limited Edition / Rare Find</label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleChange} className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black" />
                                <label htmlFor="published" className="ml-2 block text-sm font-bold text-gray-900">Published / Visible on Site</label>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200 p-8 flex justify-end bg-gray-50 sticky bottom-0">
                <button type="submit" disabled={loading} className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gray-800 disabled:opacity-50 transition-all shadow-lg">
                    {loading ? 'Saving...' : (existingProduct ? 'Save Changes' : 'Create Product')}
                </button>
            </div>
        </form>
    );
}
