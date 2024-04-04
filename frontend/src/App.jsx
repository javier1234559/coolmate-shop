import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import RootLayout from './pages/RootLayout';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import { ProductList } from './refine/pages/products/list';
import { ProductCreate } from './refine/pages/products/create';
import { ProductEdit } from './refine/pages/products/edit';
import { ProductShow } from './refine/pages/products/show';
import { UserList } from '~/refine/pages/users/list';
import { CartList } from '~/refine/pages/carts/list';
import { CategoryList } from '~/refine/pages/categories/list';
import { OrderList } from '~/refine/pages/orders/list';
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
          }>
          <Route index element={<NavigateToResource />} />

          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="create" element={<ProductCreate />} />
            <Route path="edit/:id" element={<ProductEdit />} />
            <Route path="show/:id" element={<ProductShow />} />
          </Route>

          <Route path="users">
            <Route index element={<UserList />} />
          </Route>

          <Route path="categories">
            <Route index element={<CategoryList />} />
          </Route>

          <Route path="orders">
            <Route index element={<OrderList />} />
          </Route>

          <Route path="carts">
            <Route index element={<CartList />} />
          </Route>

          <Route path="*" element={<ErrorComponent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
