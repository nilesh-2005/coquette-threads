import '@/styles/globals.css';
import '@/styles/animations.css';
import Layout from '@/components/Layout';

import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import CartDrawer from '@/components/CartDrawer';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
          <CartDrawer />
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}
