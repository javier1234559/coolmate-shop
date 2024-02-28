import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import RootLayout from './pages/RootLayout';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="/explore/:category" element={<ExploreProduct />}></Route>
      <Route path="/product/:productId" element={<Product />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route> */}
      </Route>
    </Routes>
  );
}

export default App;
