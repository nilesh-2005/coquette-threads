export default function Footer() {
    return (
        <footer className="bg-primary text-secondary py-16">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                    <h4 className="text-xl font-serif mb-6">Coquette</h4>
                    <p className="text-sm text-gray-400 font-sans leading-relaxed">
                        Timeless elegance for the modern romantic. Handcrafted with European sensibilities.
                    </p>
                </div>

                <div>
                    <h5 className="text-sm uppercase tracking-widest mb-6 font-bold">Shop</h5>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Ball Gowns</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Bridal</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-sm uppercase tracking-widest mb-6 font-bold">Help</h5>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-sm uppercase tracking-widest mb-6 font-bold">Newsletter</h5>
                    <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive updates.</p>
                    <div className="flex border-b border-gray-600 pb-2">
                        <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-500" />
                        <button className="text-xs uppercase tracking-widest text-gray-400 hover:text-white">Join</button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
                &copy; {new Date().getFullYear()} Coquette Threads. All rights reserved.
            </div>
        </footer>
    );
}
