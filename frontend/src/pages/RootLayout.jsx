import { Outlet } from 'react-router-dom';
import Navbar from '~/components/Navbar/Navbar';
import Footer from '~/components/Footer/Footer';

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
