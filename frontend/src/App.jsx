import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import Profile from './pages/Profile/Profile';
import RootLayout from './pages/RootLayout';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import { ProductList } from './admin/pages/products/list';
import { ProductCreate } from './admin/pages/products/create';
import { ProductEdit } from './admin/pages/products/edit';
import { ProductShow } from './admin/pages/products/show';
import { UserList } from '~/admin/pages/users/list';
import { CartList } from '~/admin/pages/carts/list';
import { CategoryList } from '~/admin/pages/categories/list';
import { OrderList } from '~/admin/pages/orders/list';
import { RefineContext } from './admin/RefineContext';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { ErrorComponent, ThemedSiderV2, ThemedTitleV2 } from '@refinedev/antd';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';
import { Authenticated } from '@refinedev/core';
import { AuthPage } from '@refinedev/antd';
import { ThemedLayoutV2 } from '@refinedev/antd';
import { TShirt } from 'phosphor-react';
import { DashboardPage } from './admin/pages/dashboard';
import { mockUsers } from './admin/auth-provider';
import Header from './admin/components/Header';
import { useState } from 'react';
import Order from './pages/Order/Order';
import Thanks from './pages/Thanks/Thanks';

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');

  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/product/:slug" element={<DetailProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/order" element={<Order />} />
          <Route path="/thanks" element={<Thanks />} />
        </Route>

        {/* Refine routes */}
        <Route path="/refine" element={<RefineContext currentTheme={currentTheme} />}>
          {/* Admin Private Route */}
          <Route
            element={
              <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/refine/login" />}>
                <ThemedLayoutV2 Header={() => <Header theme={currentTheme} setTheme={setCurrentTheme} />} Title={({ collapsed }) => <ThemedTitleV2 collapsed={collapsed} icon={collapsed ? <TShirt size={22} /> : <TShirt size={22} />} text=" COOLMATE DASHBOARD" />} Sider={(props) => <ThemedSiderV2 {...props} fixed />}>
                  <Outlet />
                </ThemedLayoutV2>
              </Authenticated>
            }>
            <Route index element={<DashboardPage />} />
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
          </Route>

          {/* Public Auth routes */}
          <Route
            element={
              <Authenticated v3LegacyAuthProviderCompatible={true} key="someKey" fallback={<Outlet />}>
                <NavigateToResource />
              </Authenticated>
            }>
            <Route
              path="login"
              element={
                <AuthPage
                  type="login"
                  formProps={{
                    initialValues: { ...mockUsers[0] },
                  }}
                />
              }
            />
            <Route path="register" element={<AuthPage type="register" />} />
            <Route path="forgot-password" element={<AuthPage type="forgotPassword" />} />
          </Route>
          <Route path="*" element={<ErrorComponent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
