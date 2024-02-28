import { Outlet } from 'react-router-dom';
import Navbar from '~/components/Navbar/Navbar';

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default RootLayout;
