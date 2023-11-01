import './App.css';
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import WishList from './pages/WishList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Menu from './pages/Menu';
import Profile from './components/Profile/Profile';
import CheckOut from './components/CheckOut/CheckOut';
import Oders from './pages/Oders';
import OrderDetail from './components/ListOrders/OderDetail';
import ChangePassword from './components/Changepw/ChangePassword';
import Payment from './components/Payment/Payment';
import Discount from './components/Discount/Discount';

function App() {

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/wish-list" element={<WishList/>} />
          <Route path="/product-detail/:id_item" element={<ProductDetail/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/check-out" element={<CheckOut/>} />
          <Route path="/orders" element={<Oders/>} />
          <Route path="/orders/:id_order" element={<OrderDetail/>} />
          <Route path="/change-password" element={<ChangePassword/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/discount" element={<Discount/>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
