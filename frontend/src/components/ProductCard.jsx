import Link from 'next/link';
import Image from 'next/image';
import { resolveImageUrl } from '@/lib/utils';

export default function ProductCard({ product }) {
    const { title, slug, price, images, currency } = product;
    const mainImage = images.find(img => img.type === 'hero') || images[0];

    return (
        <div className="group cursor-pointer product-card opacity-0">
            <Link href={`/product/${slug}`}>
                <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: '3/4' }}>
                    {/* Use standard img tag for local images to avoid next/image domain config issues */}
                    <img
                        src={resolveImageUrl(mainImage?.url)}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />

                    {/* Quick Add Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-white/90 backdrop-blur text-black uppercase text-xs tracking-widest py-3 hover:bg-black hover:text-white transition-colors">
                            Quick View
                        </button>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <div className="h-7 flex flex-col justify-start">
                        <h3 className="text-lg font-serif line-clamp-2 leading-tight">{title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 font-sans">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency || 'INR' }).format(price)}
                    </p>
                </div>
            </Link>
        </div>
    );
}
