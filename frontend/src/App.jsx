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
import { CategoryList } from '~/admin/pages/categories/list';
import { OrderList } from '~/admin/pages/orders/list';
import { RefineContext } from './admin/RefineContext';
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from 'react-router-dom';
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
import { UserCreate } from './admin/pages/users/create';
import { UserEdit } from './admin/pages/users/edit';
import { OrderEdit } from './admin/pages/orders/edit';
import { OrderShow } from './admin/pages/orders/show';
import { CategoryCreate } from '~/admin/pages/categories/create';
import { CategoryEdit } from '~/admin/pages/categories/edit';
import { ColorEdit } from '~/admin/pages/colors/edit';
import { ColorCreate } from '~/admin/pages/colors/create';
import { ColorList } from '~/admin/pages/colors/list';
import { SizeList } from '~/admin/pages/sizes/list';
import { SizeCreate } from '~/admin/pages/sizes/create';
import { SizeEdit } from '~/admin/pages/sizes/edit';
import { CollectionList } from '~/admin/pages/collections/list';
import { CollectionCreate } from '~/admin/pages/collections/create';
import { CollectionEdit } from '~/admin/pages/collections/edit';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import Search from './pages/Search/Search';
import Collection from './pages/Collection/Collection';

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');

  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/product/:slug" element={<DetailProduct />} />
          <Route path="/search" element={<Search />} />
          <Route path="/collection/:slug" element={<Collection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/order" element={<Order />} />
          <Route path="/history/order/:id" element={<OrderHistory />} />
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
            <Route path="collections">
              <Route index element={<CollectionList />} />
              <Route path="create" element={<CollectionCreate />} />
              <Route path="edit/:id" element={<CollectionEdit />} />
            </Route>
            <Route path="users">
              <Route index element={<UserList />} />
              <Route path="create" element={<UserCreate />} />
              <Route path="edit/:id" element={<UserEdit />} />
            </Route>
            <Route path="categories">
              <Route index element={<CategoryList />} />
              <Route path="create" element={<CategoryCreate />} />
              <Route path="edit/:id" element={<CategoryEdit />} />
            </Route>
            <Route path="colors">
              <Route index element={<ColorList />} />
              <Route path="create" element={<ColorCreate />} />
              <Route path="edit/:id" element={<ColorEdit />} />
            </Route>
            <Route path="sizes">
              <Route index element={<SizeList />} />
              <Route path="create" element={<SizeCreate />} />
              <Route path="edit/:id" element={<SizeEdit />} />
            </Route>
            <Route path="orders">
              <Route index element={<OrderList />} />
              <Route path="edit/:id" element={<OrderEdit />} />
              <Route path="show/:id" element={<OrderShow />} />
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
