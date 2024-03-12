import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import RootLayout from './pages/RootLayout';
import DetailProduct from './pages/DetailProduct/DetailProduct';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/product/:slug" element={<DetailProduct />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/explore/:category" element={<ExploreProduct />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route> */}
      </Route>
    </Routes>
  );
}

export default App;
