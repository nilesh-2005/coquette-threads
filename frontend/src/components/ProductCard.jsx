import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
    const { title, slug, price, images, currency } = product;
    const mainImage = images.find(img => img.type === 'hero') || images[0];

    return (
        <div className="group cursor-pointer">
            <Link href={`/product/${slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    {/* Use standard img tag for local images to avoid next/image domain config issues */}
                    <Image
                        src={mainImage?.url || "/assets/placeholder.jpg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                    />

                    {/* Quick Add Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-white/90 backdrop-blur text-black uppercase text-xs tracking-widest py-3 hover:bg-black hover:text-white transition-colors">
                            Quick View
                        </button>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-serif">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1 font-sans">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency || 'INR' }).format(price)}
                    </p>
                </div>
            </Link>
        </div>
    );
}
