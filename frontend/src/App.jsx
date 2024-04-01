import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import RootLayout from './pages/RootLayout';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import { ProductList } from './refine/pages/products/list';
import { RefineContext } from './refine/RefineContext';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { ErrorComponent } from '@refinedev/antd';
import { NavigateToResource } from '@refinedev/react-router-v6';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/product/:slug" element={<DetailProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Refine routes */}
        <Route
          path="/refine"
          element={
            <RefineContext>
              <Outlet />
            </RefineContext>
          }
        >
          <Route index element={<NavigateToResource />} />
          <Route path="products" element={<ProductList />} />
          <Route path="*" element={<ErrorComponent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
