import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";

// import Navbar from './components/Navbar';
import CartPage from './pages/CartPage'

import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';

import PrivateRouter from './components/PrivateRouter';
import Login from './pages/Login';
import Signup from './pages/Signup';

// function App() {
//   return (
//     <div>
//       <ProductList/>
//     </div>
//   );
// }

// export default App;


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </Router>
  );
}
export default App;