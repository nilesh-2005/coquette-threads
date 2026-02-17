import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    const router = useRouter();
    const isAdmin = router.pathname.startsWith('/admin');

    if (isAdmin) {
        return <div className="min-h-screen">{children}</div>;
    }

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}
