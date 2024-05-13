import { Outlet } from 'react-router-dom';
import Navbar from '~/components/Navbar/Navbar';
import Footer from '~/components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '~/components/ScrollToTop/ScrollToTop ';

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div style={{ width: '100%', minHeight: '80vh' }}>
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </>
  );
}

export default RootLayout;
