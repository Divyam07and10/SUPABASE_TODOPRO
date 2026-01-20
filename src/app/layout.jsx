import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import StoreProvider from './StoreProvider';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TodoPro',
  description: 'A professional todo application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              {/* Add top padding to avoid overlap with fixed AppBar header */}
              <main style={{ flex: 1, padding: '24px', paddingTop: '96px' }}>{children}</main>
              <Footer />
            </div>
            <ToastContainer position="bottom-right" />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
